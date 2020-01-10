/* This module is responsible for connection between GUI and server

getResultData: function (localID, divElement, titleElement)
readLocalDataTest: function ()
readLocalData: function (fileURL, divElement, titleElement)
readUserSettings: function (userID)
writeUserSettings: function (userID, settings)
sendInput: function (traceURL)
selectTrace: function (traceURL, title)
getTraceList: function ()
computationOutput: function ()
loadFlow: function (workflowId, title)
loadWorkflowListOpen: function ()
confirmDelete: function (name, id)
loadWorkflowListSave: function ()
selectWorkflowSave: function (workflowName)
loadWorkflowListNew: function ()
selectWorkflowNew: function (workflowName)
saveFlow: function (workflowName, componentsArray)

(further refactoring move workflow related

*/

const databaseConnectorGUI = (function () {
    let traceDiv = document.getElementById("preview-trace");

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
        checkWorkflowNameExist: async function (workflowName) {
            let myJSON = [workflowName];
            // console.log(myJSON);

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            // let theUrl = "/get_result_data";
            let theUrl = "/check_workflowname_save";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            let returnVal = new Promise(function(resolve, reject) {
                // Do async job
                xmlhttp.onload = function () {
                    let response = xmlhttp.responseText;
                    //console.log(xmlhttp.responseText);
                    //let data = JSON.parse(response);
                    // console.log(response);
                    if(response == 'true'){
                        resolve(true);
                    }
                    else{
                        resolve(false);
                    }

                }

            });
            return await returnVal;


        },
        getResultDataOutput: function (divElement, titleElement) {
            // let myJSON = [localID];
            let frameID = parent.gui.getFrameID();

            let myJSON = [frameID];
            // console.log(myJSON);

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            // let theUrl = "/get_result_data";
            let theUrl = "/get_output_result_data";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                //console.log(xmlhttp.responseText);
                //let data = JSON.parse(response);
                // console.log(response);
                if (response == "result not existed!!!!!") {
                    // console.log(response);
                }
                else {
                    let data = JSON.parse(response);
                    // console.log(data);
                    chartModule.generateChart(data, divElement, titleElement);
                }

            }
        },
        getResultData: function (localID, divElement, titleElement) {
            // let myJSON = [localID];
            let frameID = parent.gui.getFrameID();

            let myJSON = [localID, frameID];
            // console.log(myJSON);

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            // let theUrl = "/get_result_data";
            let theUrl = "/get_result_data";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                //console.log(xmlhttp.responseText);
                //let data = JSON.parse(response);
                // console.log(response);
                if (response == "result not existed!!!!!") {
                    // console.log(response);
                }
                else {
                    let data = JSON.parse(response);
                    // console.log(data);
                    chartModule.generateChart(data, divElement, titleElement);
                }

            }
        },
        readLocalData: function (fileURL, divElement, titleElement) {
            //console.log("........................................$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            let myJSON = [fileURL];

            // console.log(myJSON);

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/read_local_data";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                //console.log(xmlhttp.responseText);
                //let data = JSON.parse(response);
                // console.log(response);
                let data = JSON.parse(response);
                // console.log(data);
                chartModule.generateChart(data, divElement, titleElement);
            }
        },
        sendInput: function (traceURL) {
            //console.log("........................................$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            let inputModal = document.getElementById("modal-input");

            let inputID = inputModal.getAttribute('data-input-id');

            let frameID = parent.gui.getFrameID();

            //let traceURL = previewArea.getAttribute('data-trace-url');

            // if(validPaths!=null)validPathsVal = validPaths;
            // console.log(previewArea.innerText);
            // console.log(inputID);
            // console.log(traceURL)
            let myJSON = [inputID, traceURL, frameID];

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/read_input";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));

            console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                //console.log(xmlhttp.responseText);
                //let data = JSON.parse(response);
                // console.log(response);
                //inputModule.closeModal();
            }
        },
        selectTrace: function (traceURL, title) {
            // console.log("click on trace list item");
            traceDiv.innerHTML = chartModule.generateSpinner();
            this.sendInput(traceURL);
            this.readLocalData(traceURL, traceDiv, title);
            this.computation(); // needed to be added to mediatro
            // parent.gui.updateResult();

        },
        getTraceList: function () {
            // console.log("request trace list");

            let myJSON = ["request trace list"];

            let xmlhttp2 = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = '/trace_list';
            xmlhttp2.open("POST", theUrl);
            xmlhttp2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp2.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp2.onload = function () {
                let response = xmlhttp2.responseText;

                let data = JSON.parse(response);

                // console.log(data);

                let traceListArea = document.getElementById("trace-list");

                let traceListAreaHtml = "";

                for (let i = 0; i < data.length; i++) {
                    traceListAreaHtml += `
                        <p></p>
                        <a href="#" onclick="databaseConnectorGUI.selectTrace('${data[i].trace_path}', this.innerText)" trace-id="${data[i].trace_id}" trace-data="${data[i].trace}">${data[i].trace_description}</a>
                    `;
                }

                traceListArea.innerHTML = traceListAreaHtml;

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
        computationOutput: function () {
            // console.log("sending back for computation!")
            //let myJSON = validPaths;

            // let validPaths = validPathsVal;
            let outputID = document.getElementById("modal-output").getAttribute('data-output-id');
            // console.log(outputID);
            let frameID = parent.gui.getFrameID();
            let myJSON = [outputID, eventManager.getSaveState(), frameID];
            //let myJSON = [11,eventManager.getSaveState()];

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/computation_output";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));

            console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                // console.log(response);
                //console.log(xmlhttp.responseText);
                let data = JSON.parse(response);
                // console.log(data);

                let outputID = data[0];
                let validPaths = data[2];
                let resultData = [];
                // console.log("valid paths response!!!!!!!");
                // get the output local ID
                let pathResult = [];
                for (let i = 0; i < validPaths.length; i++) {
                    let pathLength = validPaths[i].path[0].length;
                    //console.log(pathLength);
                    //console.log(validPaths[i].path[0][pathLength-1]);
                    //let outputLocalID = validPaths[i].path[0][pathLength-1].componentLocalID;
                    let outputLocalID = validPaths[i].outputLocalID;
                    // console.log("output local ID!!!!!!!!!!!!!!1");
                    // console.log(outputLocalID);
                    if (outputLocalID == outputID) { // get the targetted path
                        for (let j = 0; j < data[1].length; j++) {
                            let currentLocalID = data[1][j].localID;
                            let isInPath = false;
                            let isInResult = false;
                            for (let k = 0; k < pathLength; k++) {
                                if (validPaths[i].path[0][k].componentLocalID == currentLocalID) {
                                    // console.log("sjsojwojwowjwojwwwoow");
                                    // console.log(validPaths[i].path[0][k].componentLocalID);
                                    // console.log(currentLocalID);
                                    isInPath = true;
                                    for (let m = 0; m < pathResult.length; m++) {
                                        if (pathResult[m].localID == currentLocalID) {
                                            isInResult = true;
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                            if (isInPath == true && isInResult == false) {
                                pathResult.push(data[1][j]);
                            }
                        }

                    }
                }



                //array.unshift() add from beginning .push() add from the end
                // console.log("result path is!!!!!!!!!!!!!!!1");
                // console.log(pathResult);

                pathResult = sortHashTableByKey(pathResult, "layerID"); // sort table by layer ID

                // console.log("valid paths are!!!!!!!!!!!!!!!!!!!11");
                // console.log(validPaths);
                // console.log("result path is!!!!!!!!!!!!!!!1");
                // console.log(pathResult);



                let resultArea = document.getElementById("result_area");
                let compName = [];
                for (let i = 0; i < pathResult.length; i++) {
                    let compID = pathResult[i].compID;
                    let elementID = "draggable" + compID.toString();
                    // console.log(elementID);
                    let compNameElement = document.getElementById(elementID);
                    compName.push(compNameElement.innerText);
                }
                // console.log(compName);
                //let compName1 = document.getElementById("draggable1");
                //console.log(compName1.innerText);

                // data too long, only show 10 record
                let resultAreaHtml = `
                    <table>
                        <tr>
                            <th>Layer ID</th>
                            <th>Local ID</th>
                            <th>Component ID</th>
                            <th>Component Name</th>
                            <th>Output Data (X)</th>
                            <th>Output Data (Y)</th>
                            <th>Output ID</th>
                            <th>Is valid?</th>   
                            <th>Validation Information</th>  
                        </tr>
                    `;

                for (let i = 0; i < pathResult.length; i++) {
                    resultAreaHtml += `
                    <tr>
                        <td>${pathResult[i].layerID}</td>
                        <td>${pathResult[i].localID}</td>
                        <td>${pathResult[i].compID}</td> 
                        <td id="result_compID_${pathResult[i].compID}">${compName[i]}</td>
                        <td>${pathResult[i].outputData[0].slice(0, 9)}</td>
                        <td>${pathResult[i].outputData[1].slice(0, 9)}</td>
                        <td>${outputID}</td>
                        <td>${pathResult[i].isValid}</td>
                        <td>${pathResult[i].validInfo}</td>                    
                    </tr> 
                    
                    `
                }

                resultAreaHtml += `</table>`

                resultArea.innerHTML = resultAreaHtml;


            }
        },
    }
}());

// sort the hash table by key value
// adapted from https://stackoverflow.com/a/8166393
function sortHashTableByKey(hash, key_order, remove_key) {
    var tmp = [],
        end = [],
        f_order = null;
    remove_key = remove_key || false;
    for (var key in hash) {
        if (hash.hasOwnProperty(key)) {
            tmp.push(hash[key][key_order]);
        }
    }
    if (hash && hash[0] && typeof (hash[0][key_order]) === 'number') // if number{compare the value} // default alphabetically
    {
        f_order = function (a, b) { return a - b; };
    }
    tmp.sort(f_order);
    function getHash(hash, value) {
        for (k in hash) {
            if (hash[k] && hash[k][key_order] === value) {
                return { key: k, hash: hash[k] };
            }
        }
    }
    for (var i = 0, l = tmp.length; i < l; i++) {
        tmp[i] = getHash(hash, tmp[i]);
        if (remove_key) {
            delete tmp[i].hash[key_order];
        }
        if (!hash.length) {
            end[tmp[i].key] = tmp[i].hash;
        }
        else {
            end.push(tmp[i].hash);
        }
    }
    return end;
}

