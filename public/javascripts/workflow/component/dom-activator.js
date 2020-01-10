const domActivatorModule = (function() {
    const workflowStage = document.getElementById("workflow_stage"),
        scrollArea = document.getElementById("wf-window");

    // This sets up the drag function of the components.
    function make_draggable(element, spawn_position)
    {
        // When the component is first created, make it appear in the position where the user has dragged the menu item.
        transform_string = `translate(${spawn_position.left}px,${spawn_position.top}px)`;
        element.style.transform = transform_string;


        new_component = new PlainDraggable(element,
            {
                autoScroll: scrollArea,
                target: workflowStage,
                onMove: function () {
                    connectionModule.updateLinks();
                },
                zIndex: false
            });

        if(parent.gui.snap() == true)
        {
            new_component.snap = {step: 40};
        }



    }


    return { //exposed to public
        activateClass: function(comp, spawn_position, element) {

            element.addEventListener('mousedown', e => {

                parent.gui.displayFeedback(comp.c_name, comp.description);
            });
            comp.element = element;
            make_draggable(element, spawn_position);
            // add the component to an array of all components on screen
            managerModule.addComponentToWorkflow(comp);
            return comp;
        },
        activateNode: function(comp, input) {

            if(input == true)
            {
                // get the html elements associated with the new component instance
                left_node = document.getElementById(`left_node_pointer${comp.id}`);
                left_node_container = document.getElementById(`left_node_container${comp.id}`);
                left_node_pointer = document.getElementById(`left_node_pointer${comp.id}`);

                /////////////4refactor////////////////////////////
                // assign the html elements to the class instance
                comp.left_node = left_node;
                comp.left_node_container = left_node_container;
                /////////////4refactor////////////////////////////

                inputNode = new NodeInstance(left_node, left_node_container, null, null, null, true, comp);
                //console.log("Input node depth:");
                //console.log(inputNode.depth);
                comp.inputs.push(inputNode);


                inputCount = comp.inputs.length -1;


                // make the component and the associated nodes draggable and interactive with leader-lines
                nodesWF.addNode(left_node, left_node_container, true, comp, inputNode);
                nodesWF.addMouseUpListener(left_node, comp, true, inputCount);
            }
            else
            {
                // get the html elements associated with the new component instance
                right_node = document.getElementById(`right_node_pointer${comp.id}`);
                right_node_container = document.getElementById(`right_node_container${comp.id}`);
                right_node_pointer = document.getElementById(`right_node_pointer${comp.id}`);
                // assign the html elements to the class instance
                comp.right_node = right_node;
                comp.right_node_container = right_node_container;

                outputNode = new NodeInstance(right_node, right_node_container, null, null, null, false, comp);
                comp.outputs.push(outputNode);


                outputCount = comp.outputs.length -1;
                // make the component and the associated nodes interactive
                nodesWF.addNode(right_node, right_node_container, false, comp, outputNode);
                nodesWF.addMouseUpListener(right_node, comp, false, outputCount);

            }
        },
        activateExpandedOutputNode: function(comp, depth)
        {

            // find the nodes and the node container
            outputNode = document.getElementById(`${comp.id}outputpointer${depth}`);
            outputNodeContainer = document.getElementById(`${comp.id}outputcontainer${depth}`);
            outputNodePointer = document.getElementById(`${comp.id}outputpointer${depth}`);
            //console.log("expanded depth");
            //console.log(depth);
            // create a new class instance of type Node and add the node to the component
            nodeInstance = new NodeInstance(outputNode, outputNodeContainer, null, null, null, false, comp, (depth+1));
            comp.outputs.push(nodeInstance);

            // activate the node for interaction

            outputCount = comp.outputs.length -1;
            nodesWF.addNode(outputNode, outputNodeContainer, false, comp, nodeInstance);
            nodesWF.addMouseUpListener(outputNode, comp, false, outputCount);
        },
        activateExpandedInputNode: function(comp, depth)
        {
            // find the nodes and the node container
            inputNode = document.getElementById(`${comp.id}inputpointer${depth}`);
            inputNodeContainer = document.getElementById(`${comp.id}inputcontainer${depth}`);
            inputNodePointer = document.getElementById(`${comp.id}inputpointer${depth}`);
            //console.log("expanded depth");
            //console.log(depth);
            // create a new class instance of type Node and add the node to the component
            nodeInstance = new NodeInstance(inputNode, inputNodeContainer, null, null, null, true, comp, (depth+1));
            comp.inputs.push(nodeInstance);

            // activate the node for interaction
            inputCount = comp.inputs.length -1;

            nodesWF.addNode(inputNode, inputNodeContainer, true, comp, nodeInstance);
            nodesWF.addMouseUpListener(inputNode, comp, true, inputCount);
        },
         componentUpdater: function (setting, true_behaviour, false_behaviour)
        {
            console.log(managerModule.returnComponentsInWorkflow().length)
            for (i = 0; i < managerModule.returnComponentsInWorkflow().length; i++) {
                new_component = new PlainDraggable(managerModule.returnComponentsInWorkflow()[i].element,
                    {
                        autoScroll: true,
                        target: workflowStage,
                        onMove: function () {
                            let links = connectionModule.getLinks();
                            for (x in links) {
                                links[x].position();
                            }
                        },
                        zIndex: false
                    });
                if(parent.gui.snap() == true)
                {
                    new_component.snap = {step: 40};
                }
            }
        }

    }
}());

