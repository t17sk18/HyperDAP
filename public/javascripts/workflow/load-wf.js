// This module is responsible for loading saved Workflows

// The publicly available methods are:

// load                 uses saved data to populate the workflow


const loadWF = (function() {
    let spawnPosition = {top: 0, left: 0},
        inputDepth = 0;

    return { //exposed to public
        load: function(data){
            managerModule.removeAllComponents();
            // console.log("yubug?!");
            // console.log(managerModule.returnComponentsInWorkflow());

            // sort data into ascending order by local id
            data = data.sort(function(obj1, obj2) {
                return obj1.local_id - obj2.local_id;
            });

            for (let d = 0; d< data.length; d++) {
                //spawnPosition is for drag and drop, initialise with 0 and use saved transform;
                spawnPosition = {top: 0, left: 0};
                if (data[d].id == 0) {
                    element = managerModule.addInputComponent(spawnPosition, data[d].local_id)
                } else if (data[d].id == 1) {
                    element = managerModule.addOutputComponent(spawnPosition, data[d].local_id)
                } else {
                    //console.log(data[d].c_name);
                    //console.log("the local id is " +  data[d].local_id);
                    //console.log("the component id is " +  data[d].id);
                    element = managerModule.addComponent(data[d].c_name, "loaded component", data[d].id, spawnPosition, data[d].local_id);
                }
                element.style.transform = data[d].transform;

            }




            // Build expansions
            for (let d = 0; d< data.length; d++) {
                comp = managerModule.returnComponentsInWorkflow()[d];
                // build inputs
                for (j in data[d].inputs) {
                    if (j > 0) {
                        managerModule.expandInput(comp);
                    }
                }
                // build outpuits
                for (j in data[d].outputs) {
                    if (j > 0) {
                        managerModule.expandOutput(comp);
                    }
                }
            }
            // Once all components are on screen, connect them!

            for (let d = 0; d < data.length; d++) {
                comp = managerModule.returnComponentsInWorkflow()[d];
                for (let j = 0; j < data[d].inputs.length; j++) {
                    // worry about this later
                }
                //console.log(d);
                //console.log(data[i].outputs);
                for (let j = 0; j < data[d].outputs.length; j++) {
                    let output = data[d].outputs[j];
                    let input = data[d].inputs[j];

                    //console.log(data[d].inputs);
                    //console.log(data[d]);

                    let targetComponent = managerModule.getComponentInWorkflowFromLocalID(output.local_id);


                    if(comp!= null && output.local_id != null && targetComponent != null)
                    {

                        //console.log(output);
                        //console.log(components_in_workflow);



                        //console.log("connect " + comp.c_name + " output " + output.myDepth + " to " + targetComponent.c_name + " input " + output.targetDepth);
                        let startNode = comp.outputs[output.myDepth];
                        let endNode = targetComponent.inputs[output.targetDepth];
                        connectionModule.connect(startNode, endNode);
                        inputDepth = 0;
                    }
                }
            }
            //links = connectionModule.getLinks();
            //console.log("Links = " + links.length);
        }
    }
}());

