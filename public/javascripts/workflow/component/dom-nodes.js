// This module is responsible for the connectable nodes
// Nodes are invisible target divs that are movable and positioned above the node handle holes. They can be coloured in css by
// uncommenting their background colour.

// The publicly available methods are:

// load                 uses saved data to populate the workflow


const nodesWF = (function() {
    let nodeLine,
        selectedNode,
        oldSelectedNode,
        selectedComponent,
        selectedInput,
        swap = [];
     const scrollArea = document.getElementById("wf-window");
    function checkSwap()
    {
        // if there is a swap in memory
        if (swap[0]!= null)
        {
            // if the input of the first component and the output of the second are free then connect them
            if (swap[0] == true && swap[1].input == null && swap[2].output == null)
            {
                connect_in(swap[1], swap[2]);

            }
            // if the output of the first component and the input of the second are free then connect them
            else if (swap[0] == false && swap[1].output == null && swap[2].input == null)
            {
                connect(swap[1], swap[2]);        }

        }

        //clear swap array
        swap = [];
    }
    function tooFar(transformString)
    {
        // WebKitCssMatrix code based on explanation from Stack Overflow user Blender, (11/05/11) accessed (31/05/19)
        // https://stackoverflow.com/questions/5968227/get-the-value-of-webkit-transform-of-an-element-with-jquery


        var matrix = new WebKitCSSMatrix(transformString);
        x_distance = matrix.m41;
        y_distance = matrix.m42;
        max = 35;
        // if the distance the connector has been dragged away is greater than the maximum allowed then return true as it is too far
        if(x_distance < -max || x_distance > max || y_distance < -max || y_distance > max)
        {
            return true
        }
        return false

    }


// Provide visual feedback to the user that an action is not permitted,
// Pre-made solutions exist for this but they didn't look right so we made our own
    function shake(element)
    {

        initial = element.style.transform;
        var matrix = new WebKitCSSMatrix(initial);

        for (var i = 0; i < 8; i++) {
            setTimeout(function() {
                x = matrix.m41;
                y = matrix.m42;
                randx = Math.floor(Math.random() * 10);
                randy = Math.floor(Math.random() * 10);
                x += (randx - 5);

                temp_translate = `translate(${x}px, ${y}px)`;
                element.style.transform = temp_translate;
                connectionModule.updateLinks();
            }, 40 * i);
        }

    }

    return { //exposed to public
        getSelectedNode: function (){
            return selectedNode
        },
        setSelectedNode: function (node){
            selectedNode = node;
        },
        addNode: function (nodePointer, dashedNodeOrigin, input, comp, node){

            let nodeLine = null;
            nodedrag = new PlainDraggable(nodePointer, {
                // trap the movement to within the workflow window
                containment : workflow_stage,
                autoScroll: scrollArea,

                onDragStart : function(){
                    // when a drag begins, save the details of the selected node and component in memory
                    selectedNode = node;
                    //console.log(node.pointer.id);
                    selectedComponent = comp;

                    // feedback_container.innerHTML = comp.c_name + " selected";
                    //output = true;
                    nodePointer.style.pointerEvents ="none";
                    // record if the selected node is an input node or an output node
                    if(node.input === true)
                    {
                        selectedInput = true;
                    }
                    else
                    {
                        selectedInput = false;
                    }
                    // if this node's output is not already connected to another node
                    if (node.connectedElement === null)
                    {
                        nodeLine = connectionModule.createDashedLine(dashedNodeOrigin, nodePointer, input);
                    }

                    //updating the position method is required if components have been moved or window resized etc.
                    this.position();

                },
                onDragEnd : function(){
                    // when the drag is over destroy the dashed line
                    if (nodeLine != null)
                    {
                        nodeLine.remove();
                        nodeLine = null;
                        // return the invisible target div to its start location so that new leader-lines spawn from the same place
                        nodePointer.style.transform = "translate(0,0)";
                        nodePointer.style.pointerEvents ="auto";
                        connectionModule.updateLinks();
                    }

                    if (node.connectedElement != null)
                    {
                        if (tooFar(nodePointer.style.transform))
                        {
                            connectionModule.disconnect(node);
                            checkSwap();
                        }
                    }
                    // if components are linked and the nodes are moved away from the components and not returned then the connections
                    // should be destroyed, lines removed and class instance references removed also.
                    if (comp.input!= null)
                    {
                        // check the distance the connected node was dragged to see if a disconnect has occurred
                        if (tooFar(nodePointer.style.transform))
                        {

                            connectionModule.disconnect(node);
                            checkSwap();
                        }
                    }



                    // return the invisible target div to its start location so that new leader-lines spawn from the same place
                    nodePointer.style.transform = "translate(0,0)";
                    nodePointer.style.pointerEvents ="auto";
                    connectionModule.updateLinks();


                },
                onMove: function() {
                    // update the position of the line whenever the invisible target div is moved.
                    if (nodeLine != null)
                    {
                        nodeLine.position();
                    }
                    connectionModule.updateLinks();

                },
                // this prevents selected draggable elements from rendering in front of everything
                zIndex: false
            });
        },
        addMouseUpListener: function (node, comp, input, count) {

        // Add a mouse listener to check if nodes are being dropped in the drop zones
        node.addEventListener('mouseup', e => {
            //console.log("mouse up");
            if(input == true){
                endNode = comp.inputs[count];
            }
            else{
                endNode = comp.outputs[count];
            }

            // if the selected node is already connected then it is a swap, therefore the actual selected node is the
            // node connected to that one
            if (selectedNode.connectedNode != null)
            {
                oldSelectedNode = selectedNode;

                selectedNode = selectedNode.connectedNode;
                connectionModule.disconnect(oldSelectedNode);

                // console.log("Swap!");
            }

            // if the connection is valid, make the connection
            if (connectionModule.connectionValid(selectedNode, endNode, input) === true) {

                // connect the nodes to link the components
                connectionModule.connect(selectedNode, endNode, input);


            }
            else
            {
                shake(comp.element);
            }
        });
    }
    }
}());

