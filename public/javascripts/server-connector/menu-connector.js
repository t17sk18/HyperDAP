/* This module is responsible for connection between GUI(the menu area relating to saving and loading workflow etc.) and server


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

const databaseConnectorMenu = (function () {
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
        constructor(workflowName = "", workflowDescription = "", array = []) { // workflow id -1 when not specify workflow  //change to workflow_name
            this.workflowName = workflowName;
            this.workflowDescription = workflowDescription;
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
        loadFlow: function (workflowId, title) {
            let myJSON = [];
            myJSON.push(workflowId);

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/load_workflow";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                //console.log(xmlhttp.responseText);
                let responseData = JSON.parse(response);
                let data = responseData[0];
                let description = responseData[1];
                // console.log(title);
                loadModule.setStaged(data, title);
                loadModule.setStagedDescription(description);
            }
        },
        loadWorkflowListOpen: function () {
            let myJSON = ["request workflows"];
            let xmlhttp2 = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = '/workflow_list';
            xmlhttp2.open("POST", theUrl);
            xmlhttp2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp2.send(JSON.stringify(myJSON));
            xmlhttp2.onload = function () {
                let response = xmlhttp2.responseText;
                // console.log(response);
                let workflowList = JSON.parse(response);

                let workflowListText = document.getElementById("workflow_list_open");

                // create links into "workflow area"
                let listTextHtml = `<div class="table-responsive"> 
                                        <table class="table table-striped table-borderless table-sm">
                                            <thead>
                                                <tr>
                                                    <th style="width:80%;">Workflow</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>`;

                for (let i = 0; i < workflowList.length; i++) {
                    listTextHtml += `<tr>
                                        <td>
                                            <a href="#" class="workflow-item" id="workflow_item_${workflowList[i].workflowId}" onclick="databaseConnectorMenu.loadFlow(${workflowList[i].workflowId}, '${workflowList[i].workflowName}')">
                                                ${workflowList[i].workflowName}
                                            </a>
                                        </td>
                                        <td>
                                            <a href="#" style="color:red;"
                                            onclick="databaseConnectorMenu.confirmDelete('${workflowList[i].workflowName}', ${workflowList[i].workflowId})"><i class="fa fa-times-circle"></i></a>
                                        </td>
                                    </tr>`;
                }
                listTextHtml += `            </tbody>
                                       </table>
                                    </div>`;


                workflowListText.innerHTML = listTextHtml;
            }
        },
        confirmDelete: function (name, id) {
            let deleteResult = confirm(`Are you sure you want to delete ${name}?`);
            if (deleteResult) {
                deleteFlow(id);
                this.loadWorkflowListOpen();
                setTimeout(function () { alert(`${name} was successfully deleted`); }, 250);
            }
        },
        loadWorkflowListSave: function () {
            // console.log("request loading!");

            let myJSON = ["request workflows"];

            let xmlhttp2 = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = '/workflow_list';
            xmlhttp2.open("POST", theUrl);
            xmlhttp2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp2.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp2.onload = function () {
                let response = xmlhttp2.responseText;

                let workflowList = JSON.parse(response);

                let workflowListText = document.getElementById("workflow_list_save");

                // create links into "workflow area"
                let listTextHtml = "";

                for (let i = 0; i < workflowList.length; i++) {
                    listTextHtml += `<a href="#" class="workflow-item" id="workflow_item_${workflowList[i].workflowId}"` +
                        `onclick="databaseConnectorMenu.selectWorkflowSave(\'${workflowList[i].workflowName}\')" >`
                        + `${workflowList[i].workflowName}</a><br>`;
                }


                workflowListText.innerHTML = listTextHtml;

            }

        },
        selectWorkflowSave: function (workflowName) {
            // console.log("click button on save windows");
            let inputBox = document.getElementById("save_workflow_name");
            // console.log(inputBox);
            inputBox.value = workflowName;
        },
        loadWorkflowListNew: function () {
            // console.log("request loading!");
            let myJSON = ["request workflows"];
            let xmlhttp2 = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = '/workflow_list';
            xmlhttp2.open("POST", theUrl);
            xmlhttp2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp2.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp2.onload = function () {
                let response = xmlhttp2.responseText;
                //console.log(response);

                let workflowList = JSON.parse(response);

                let workflowListText = document.getElementById("workflow_list_new");

                // create links into "workflow area"
                let listTextHtml = "";

                for (let i = 0; i < workflowList.length; i++) {
                    listTextHtml += `<a href="#" class="workflow-item" id="workflow_item_${workflowList[i].workflowId}"` +
                        `onclick="databaseConnectorMenu.selectWorkflowNew(\'${workflowList[i].workflowName}\')" >`
                        + `${workflowList[i].workflowName}</a><br>`;
                }


                workflowListText.innerHTML = listTextHtml;

            }

        },
        selectWorkflowNew: function (workflowName) {
            // console.log("click button on new windows");
            let inputBox = document.getElementById("new_workflow_name");
            // console.log(inputBox);
            inputBox.value = workflowName;

        },
        saveFlow: function (workflowName, componentsArray,workflowDescription) {
            // console.log(workflowName);
            // console.log(componentsArray);


            let myJSON = new componentsOnWorkflow(workflowName,workflowDescription);
            // console.log(myJSON);

            for (let i = 0; i < componentsArray.length; i++) {
                let componentName = componentsArray[i].c_name,
                    // nameIndex = componentList.indexOf(componentName),
                    componentId = componentsArray[i].id,
                    componentLocalId = componentsArray[i].local_id,
                    componentTransform = componentsArray[i].transform,
                    componentInput = componentsArray[i].inputs,
                    componentOutput = componentsArray[i].outputs;

                let newComponent = new component(componentLocalId, componentId, componentTransform, componentInput, componentOutput);
                myJSON.addComponent(newComponent);
            }

            // console.log(myJSON);

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/save_workflow";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));
            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                // console.log(xmlhttp.responseText);
                if (response == "NOT EXIST!") {
                    alert("The workflow ID is not existed!");
                }
            }

        },
    }
}());



