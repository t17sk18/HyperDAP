// The connector exposes only those methods which may be accessed by the content window
class Connector{
    addComponent(name, description, id, spawnPosition, localID = null, inputCount)
    {
        //console.log("CONNECTOR");
        //console.log(name);
        //console.log("This component has " + inputCount + " inputs");
        //console.log(description);
        if (id == "0"){
            managerModule.addInputComponent(spawnPosition, localID, description);

        }else if (id == "1") {
            managerModule.addOutputComponent(spawnPosition, localID, description);
        } else {
            managerModule.addComponent(name, description, id, spawnPosition, localID, inputCount);
        }
    }
    load(data)
    {
        loadWF.load(data);
    }
    sendUpdate(update)
    {
        logicModule.getUpdate(update);
    }

}

iframe = new Connector();






const managerModule = (function() {
    let componentsInWorkflow = [],
        // ids 0 and 1 are reserved for the Input and Output components
        idCount = 0;
    function addButton(button, action, component) {
        $(button).click( function(e) {
            e.preventDefault();
            action(component);
        } );
    }
    function reduce(comp){
        // removes the last expanded connection
        if (comp.expansions.length > 0){
            node = comp.outputs[comp.outputs.length-1];
            connectionModule.disconnect(node);
            ex = comp.expansions[comp.expansions.length -1];
            comp.outputs.pop();
            comp.expansions.pop();

            ex.remove();
        }
    }


    return { //exposed to public
        addInputComponent: function(spawnPosition, localID, description) {
            //Use localID from load data if it exists
            if (localID != null)
            {
                idCount = parseInt(localID);
            }
            // assign unique id for visual component and initiate a new class instance of type Component
            id = idCount.toString();
            let comp = new Component(id, "0", null, "Input", "This component receives the input data from existing system" );

            newComponentDomElement = domBuilderModule.input(comp);
            $(workflow_stage).append(newComponentDomElement);
            domActivatorModule.activateClass(comp, spawnPosition, newComponentDomElement);

            // The input component only has an output node
            domActivatorModule.activateNode(comp,false);

            // get button elements
            deleteButton = document.getElementById(`delete${id}`);
            infoButton = document.getElementById(`info${id}`);
            minusButton = document.getElementById(`minus${id}`);
            plusButton = document.getElementById(`plus${id}`);

            // set button elements
            addButton(deleteButton, managerModule.removeComponentFromWorkflow, comp);
            addButton(infoButton, parent.gui.openComponentInfoModal, comp);
            addButton(minusButton, reduce, comp);
            addButton(plusButton,  managerModule.expandOutput, comp);

            // activate the modal for clicking the button
            $(`#input-button-icon-${comp.id}`).click(function () {
                // console.log("open input modal");
                parent.gui.openInputModal(comp);
            });
            idCount += 1;
            return comp.element;
        },
        addOutputComponent: function(spawnPosition, localID, description){
            //Use localID from load data if it exists
            if (localID != null)
            {
                idCount = parseInt(localID);
            }
            // assign unique id for visual component and initiate a new class instance of type Component
            id = idCount.toString();
            let comp = new Component(id, "1", null, "Output", "This component sends the output data to a existing system" );

            newComponentDomElement = domBuilderModule.output(comp);
            $(workflow_stage).append(newComponentDomElement);
            domActivatorModule.activateClass(comp, spawnPosition, newComponentDomElement);

            // The input component only has an input node
            domActivatorModule.activateNode(comp,true);

            // get button elements
            deleteButton = document.getElementById(`delete${id}`);
            infoButton = document.getElementById(`info${id}`);

            // set button elements
            addButton(deleteButton, managerModule.removeComponentFromWorkflow, comp);
            addButton(infoButton, parent.gui.openComponentInfoModal, comp);

            // activate the modal for clicking the button
            $(`#output-button-icon-${comp.id}`).click(function () {
                parent.gui.openOutputModal(comp);
            });
            idCount += 1;
            return comp.element;
        },
        addComponent: function(name, description, componentID, spawnPosition, localID, inputCount){

            //console.log(name);
            //console.log("the local id is " +  localID);
            //console.log("the component id is " +  componentID);

            //Use localID from load data if it exists
            if (localID != null)
            {
                idCount = parseInt(localID);
            }

            // assign unique id for visual component and initiate a new class instance of type Component
            id = idCount.toString();

            comp = new Component(id, componentID, null, name, description );

            newComponentDomElement = domBuilderModule.component(comp, id);
            $(workflow_stage).append(newComponentDomElement);


            domActivatorModule.activateClass(comp, spawnPosition, newComponentDomElement);

            // components start with an input and output node
            domActivatorModule.activateNode(comp,true);
            domActivatorModule.activateNode(comp,false);

            // get button elements
            deleteButton = document.getElementById(`delete${id}`);
            infoButton = document.getElementById(`info${id}`);
            minusButton = document.getElementById(`minus${id}`);
            plusButton = document.getElementById(`plus${id}`);

            // set button elements
            addButton(deleteButton, managerModule.removeComponentFromWorkflow, comp);
            addButton(infoButton, parent.gui.openComponentInfoModal, comp);
            addButton(minusButton, reduce, comp);
            addButton(plusButton,  managerModule.expandOutput, comp);

            for (let i = 1; i < inputCount; i++){
                managerModule.expandInput(comp);
            }
            idCount += 1;
            return comp.element;
        },
        expandOutput: function (comp){
            // builds a duplicate output for a component

            // check how many output components there are and then create a new element
            outputcount = comp.outputs.length -1;
            domElement = domBuilderModule.outputExpanse(comp, outputcount);

            //append the new element to the component
            ex = $(`#expander${comp.id}`).append(domElement);

            comp.expansions.push(domElement);

            domActivatorModule.activateExpandedOutputNode(comp, outputcount);
        },
        expandInput: function (comp){
            // builds a second input for a componet

            // check how many input components there are and then create a new element
            inputcount = comp.inputs.length -1;
            domElement = domBuilderModule.inputExpanse(comp, inputcount);

            //append the new element to the component
            ex = $(`#expander${comp.id}`).append(domElement);

            // Input expansions do not count as expansions from a user perspective as they are component dependant
            //comp.expansions.push(domElement);

            domActivatorModule.activateExpandedInputNode(comp, inputcount);
        },
        removeAllComponents: function(){
            while (componentsInWorkflow.length > 0)
            {
                let comp = componentsInWorkflow[componentsInWorkflow.length - 1];
                managerModule.removeComponentFromWorkflow(comp);
            }
            connectionModule.updateLinks([]);
        },
        addComponentToWorkflow: function(comp){
            componentsInWorkflow.push(comp)
        },
        removeComponentFromWorkflow: function(comp){
            // remove connections
            for (i in comp.outputs)
            {
                connectionModule.disconnect(comp.outputs[i]);
            }
            for (i in comp.inputs)
            {
                connectionModule.disconnect(comp.inputs[i]);
            }
            // remove from the list of onscreen elements
            let index = componentsInWorkflow.indexOf(comp);
            if (index !== -1) componentsInWorkflow.splice(index, 1);
            // delete the html
            comp.element.parentNode.removeChild(comp.element);
            // delete the class instance
            comp = null;
            return false;
        },
        returnComponentsInWorkflow: function(){
            return componentsInWorkflow;
        },
        getComponentInWorkflowFromLocalID: function(localID){
            //console.log("looking for " + localID);

            for (let i = 0; i < componentsInWorkflow.length; i++){
                //console.log(componentsInWorkflow[i].id);
                if (componentsInWorkflow[i].id == localID)
                {
                    //console.log("Found");
                    return componentsInWorkflow[i];
                }
            }
        },
        test: function(){
            // console.log("party on bill and ted");
        }

    }
}());






// When the page has loaded an input and out component are added to the workflow
window.addEventListener("load", function(){
    //console.log("shift!");
    if(!parent.gui.loading()) {
        managerModule.addInputComponent({top: 60, left: 200});
        managerModule.addOutputComponent({top: 400, left: 800});
    }
    $("#wf-window").scroll(function () {
        connectionModule.updateLinks();
    });
});


//managerModule.test();