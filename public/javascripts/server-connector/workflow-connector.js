/* This module is responsible for connection between workflow area and server

checkCompatibilityOne: function (compID1, compID2)
checkCompatibility: function (validPaths)
computation: function ()

*/

const databaseConnectorWF = (function () {
    // let traceDiv = document.getElementById("preview-trace");

    class component {
        constructor(localId = -1, componentId = -1, transform = "", inputComponents = "", outputComponents = "") { // -1 means connect to nothing string of nothing default transform
            this.localId = localId;
            this.componentId = componentId;
            this.transform = transform;
            this.inputComponents = inputComponents;
            this.outputComponents = outputComponents;
        }
        showInfo() {
            console.log(this.componentId);
            console.log(this.transform);
            console.log(this.inputComponents);
            console.log(this.outputComponents);
        }
        printJSON() {
            console.log(JSON.stringify(this));
        }
        setInputComponents(inputComponents) {
            this.inputComponents = inputComponents;
        }
        setOutputComponents(outputComponents) {
            this.outputComponents = outputComponents;
        }
        setTransform(transform) {
            this.transform = transform;
        }
    }


    class componentsOnWorkflow {
        constructor(workflowName = "", array = []) { // workflow id -1 when not specify workflow  //change to workflow_name
            this.workflowName = workflowName;
            this.array = array;
        }
        printJSON() {
            console.log(JSON.stringify(this));
        }
        addComponent(component) {
            this.array.push(component);
        }
        removeComponent(index) { // remove the component from the index
            this.array.splice(index, 1);
        }

    }
    function deleteFlow(workflowId) {
        let myJSON = [];
        myJSON.push(workflowId);

        let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        let theUrl = "/delete_workflow";

        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(myJSON));

        // console.log("send!");

        xmlhttp.onload = function () {
            let response = xmlhttp.responseText;
            //console.log(xmlhttp.responseText);
            //let data = JSON.parse(response);
            // console.log(response);
            //loadModule.setStaged(data);
        }
    }
    return { //exposed to public
        checkCompatibilityOne: function (compID1, compID2) {
            //console.log("........................................$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            //console.log(validPaths);

            // if(validPaths!=null)validPathsVal = validPaths;
            // validPathsVal = validPaths;

            // console.log(validPathsVal);
            //console.log("........................................$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

            // console.log("sending back for checking!")
            let myJSON = [compID1, compID2];

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/check_compatibility_one";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                // console.log(response);
                //console.log(xmlhttp.responseText);
                // let data = JSON.parse(response);
                // console.log(data);
            }
        },
        checkCompatibility: function (validPaths) {
            //console.log("........................................$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            //console.log(validPaths);

            // if(validPaths!=null)validPathsVal = validPaths;
            // validPathsVal = validPaths;

            // console.log(validPathsVal);
            //console.log("........................................$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

            // console.log("sending back for checking!")
            let myJSON = validPaths;

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/check_compatibility";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                //console.log(xmlhttp.responseText);
                let data = JSON.parse(response);
                // console.log(data);
                iframe.sendUpdate(data);
            }
        },
        computation: function () { // shorter version of computation may replace the old one
            // console.log("sending back for computation!")
            //let myJSON = validPaths;

            // let validPaths = validPathsVal;
            //let outputID = document.getElementById("request_result").getAttribute('data-output-id');
            //console.log(outputID);
            //let myJSON = [eventManager.getSaveState(),eventManager.getFrameID()];
            let myJSON = [parent.gui.getSaveState(), parent.gui.getFrameID()];
            //let myJSON = [11,eventManager.getSaveState()];

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/computation";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                //console.log(response);
                //console.log(xmlhttp.responseText);
                let data = JSON.parse(response);
                // console.log(data);
                // console.log("computation complete!!!");

            }
        },
    }
}());

