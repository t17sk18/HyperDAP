
tempLinks = [];

class Component {
    constructor( id, component_id, element, c_name, description, inputs = [], outputs = [], expansions = []) {
        this.id = id;
        this.component_id = component_id,
        this.element = element;
        this.c_name = c_name;
        this.description = description;
        this.inputs = inputs;
        this.outputs = outputs;
        this.expansions = expansions;
    }
}


class NodeInstance{
    // maybe I don't need to specify null values as default?
    constructor(pointer = null, container = null, connectedElement = null, leaderLine = null, connectedNode = null, input = null, parent = null, depth = 0)
    {
        this.pointer = pointer;
        this.container = container;
        this.connectedElement = connectedElement;
        this.leaderLine = leaderLine;
        this.connectedNode = connectedNode;
        this.input = input;
        this.parent = parent;
        this.depth = depth;
    }
}


const logicModule = (function() {
    let linkStack = [],
        connectedComponents = [],
        connectedNodes = [],
        validPath = [],
        validPaths = [];
    function updateStack(comp, outputID){
        for (i in linkStack)
        {
            linkStack[i].leaderLine.color = '#5cd65c';
        }
        connectedComponents = [];
        connectedNodes =[];
       // console.log("Depth:");
       // console.log(linkStack[j].connectedNode.depth);
        for (j in linkStack){
            connectedNodes.push({componentID:linkStack[j].parent.component_id, componentLocalID:linkStack[j].parent.id, outputDepth:linkStack[j].connectedNode.depth })
           // connectedComponents.push({localID:linkStack[j].parent.id,componentID:linkStack[j].parent.component_id, depth:linkStack[j].depth});
        }



        // add the final input component to the list of connections, set targetOutputDepth as null because Input components do not have inputs that can target outputs
        connectedNodes.push({componentID:comp.component_id, componentLocalID:comp.id, outputDepth: null });
        connectedNodes = connectedNodes.reverse();

        //validPath.push(connectedComponents);
        validPath.push(connectedNodes);
       // console.log("Valid Path for " + outputID );
        validPaths.push({outputLocalID: outputID, path:validPath});


        // clear stacks

        linkStack = [],
        connectedComponents = [],
        connectedNodes = [],
        validPath = [];




    }
    function traverseNodes(comp, outputID)
    {
        // This is a recursive function that checks every node working backwards from the output until it runs out of
        // nodes or hits an input. If it runs out of nodes the stack is cleared, if it hits an input the stack is
        // cleared and a valid path is created.
        if (comp.component_id == "0")
        {
            // the input node has been reached, linkStack contains the valid path from the output to the input
            //console.log(linkStack);

            updateStack(comp, outputID);


        }
        else{
            // store a boolean to toggle if all inputs are connected
            let allInputsConnected = true;
            for (let k = 0; k < comp.inputs.length; k++)
            {
                if (comp.inputs[k].connectedElement == null){
                    allInputsConnected = false;
                }
            }
            // only traverse the nodes if all the inputs are connected
            if (allInputsConnected == true)
            {
                for (j in comp.inputs) {

                    // Check the input connection(s), if connected add this node to the stack and traverse the connections
                    if (comp.inputs[j].connectedElement != null) {
                        //comp.inputs[j].leaderLine.color = '#5cd65c';
                        linkStack.push(comp.inputs[j]);
                        traverseNodes(comp.inputs[j].connectedElement, outputID);
                    }
                }
            }
            else
            {
                // if the boolean has not been toggled then clear the stack to prevent a memory leak
                linkStack = [];
            }

        }
    }

    // function combinePaths(validPaths){
    //     console.log("COMBO HERE");
    //     console.log(validPaths);
    //     let combinedValidPaths = {};
    //     let groupedPaths = [];
    //     //let preveousPath = validPaths[0]
    //     if (validPaths != [])
    //     {
    //     for(let i = 0; i < validPaths.length; i++) {
    //         for (let j = i + 1; j < validPaths.length; j++) {
    //             if (validPaths[i].outputLocalID == validPaths[j].outputLocalID) {
    //                 groupedPaths.validPaths[i].outputLocalID.push(validPaths[i]);
    //                 groupedPaths.validPaths[i].outputLocalID.push(validPaths[j]);
    //             }
    //
    //
    //         }
    //         console.log("Grouped");
    //         console.log(groupedPaths);
    //
    //
    //     }
    //         // if (preveousPath.outputLocalID === validPaths[i].outputLocalID){
    //         //
    //         // }
    //         // else{
    //         //
    //         // }
    //         // preveousPath = validPaths[i]
    //     }
    // }

    return { //exposed to public

        sendSignal: function()
        {

            linkStack = [];
            connectionModule.linksStartColor('rgb(100, 149, 237');

            for(z in managerModule.returnComponentsInWorkflow())
            {
                if (managerModule.returnComponentsInWorkflow()[z].component_id === "1")
                {
                    let outputComponent = managerModule.returnComponentsInWorkflow()[z];
                    traverseNodes(outputComponent, outputComponent.id);
                    //validPaths.push({outputID: managerModule.returnComponentsInWorkflow()[i].id, path: []});
                }

            }
            if (validPaths.length > 0 )
            {
                //console.log("New Send valid paths to server here. Format is different");

                //console.log(validPaths);
                //checkCompatibility(validPaths);
                //validPaths = combinePaths(validPaths);
                databaseConnectorWF.checkCompatibility(validPaths);
                // new server call here
            }

            validPaths = [];
        },
        getUpdate: function(update)
        {
            // console.log("Server Response");
            // console.log(update);
            let paths = update[0].path;
            // console.log("This is where the incompatibility issue is");
            // for(let i = 0; i < paths.length; i++) {
            //     if (!paths[i].isCompatible) {
            //         console.log(paths[i].isCompatible);
            //         let outputLocalID = paths[i].outputComponentLocalID;
            //         let inputLocalID = paths[i].inputComponentLocalID;
            //
            //         let comp = managerModule.getComponentInWorkflowFromLocalID(outputLocalID);
            //         for (let j = 0; j < comp.outputs.length; j++) {
            //             console.log("id = ");
            //             console.log(comp.outputs[j].connectedElement.id);
            //             if (comp.outputs[j].connectedElement.id == inputLocalID){
            //                 let line = comp.outputs[j].leaderLine;
            //                 line.setOptions({color: 'red'});
            //             }
            //         }
            //     }
            // }
        }




    }
}());

function update_debug() {
    debugString = ""
    for (x in managerModule.returnComponentsInWorkflow()) {
        id = managerModule.returnComponentsInWorkflow()[x].id.toString();
        c_name = managerModule.returnComponentsInWorkflow()[x].c_name;
        transform = managerModule.returnComponentsInWorkflow()[x].element.style.transform;
        input = "null";
        output = "null";
        if (managerModule.returnComponentsInWorkflow()[x].input)
        {input = managerModule.returnComponentsInWorkflow()[x].input.id.toString()}
        if (managerModule.returnComponentsInWorkflow()[x].output)
        {output = managerModule.returnComponentsInWorkflow()[x].output.id.toString()}


        debugString += `<p>(${id}) ${c_name}</p>
                        <p> ${transform}</p>
                        <p> input = ${input} output = ${output}</p>`
    }
    //parent.update_debug(debugString);

}

function return_comp_from_id(id)
{
   // console.log("finding component with id = " + id);
    for (x in managerModule.returnComponentsInWorkflow())
    {
        if(managerModule.returnComponentsInWorkflow()[x].id == id)
        {
          //  console.log("found component with id = " + managerModule.returnComponentsInWorkflow()[x].id);
            return managerModule.returnComponentsInWorkflow()[x];
        }
    }
}


function return_save_state()
{   save_data = [];

    for (i in managerModule.returnComponentsInWorkflow())
    {
       c_name = managerModule.returnComponentsInWorkflow()[i].c_name;
       id = managerModule.returnComponentsInWorkflow()[i].component_id;
       localID = managerModule.returnComponentsInWorkflow()[i].id;
       transform = managerModule.returnComponentsInWorkflow()[i].element.style.transform;
       inputs = [];
       outputs = [];

       for(j in managerModule.returnComponentsInWorkflow()[i].inputs)
       {
           input = managerModule.returnComponentsInWorkflow()[i].inputs[j];
           if (input.connectedElement == null)
           {
               inputs.push({local_id:null, myDepth:j,  targetDepth: null});
           }else {
               inputs.push({local_id:input.connectedElement.id, myDepth:j, targetDepth: input.connectedNode.depth});
           }
       }
        for(j in managerModule.returnComponentsInWorkflow()[i].outputs)
        {
            output = managerModule.returnComponentsInWorkflow()[i].outputs[j];
            if (output.connectedElement == null)
            {
                outputs.push({local_id:null, myDepth:j,  targetDepth: null});
            }else {
                outputs.push({local_id:output.connectedElement.id, myDepth:j, targetDepth: output.connectedNode.depth});
            }
        }
        save_data.push({c_name:c_name, id:id, local_id:localID, transform:transform, inputs:inputs, outputs:outputs});

    }
    // console.log(save_data);
    return save_data;
}









function update_settings(settings)
{

    // console.log("ding");
    css_updater(settings.grid, "plain-grid");
    domActivatorModule.componentUpdater(settings.snap,  {step: 40},  {step: false});
}


function css_updater(setting, cssclass)
{
    let stage = $('#workflow_stage')[0];
    // console.log("!!!!!!!");
    // console.log(stage);

    if (setting == true && !stage.classList.contains(cssclass))
    {
        stage.classList.add(cssclass);
    }
    else if(setting == false && stage.classList.contains(cssclass))
    {
        stage.classList.remove(cssclass);
    }
}


