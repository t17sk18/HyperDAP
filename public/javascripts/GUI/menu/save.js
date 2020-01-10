// This module is responsible for the saving Workflow

// The publicly available methods are:
// openModal            opens the Save Modal
// closeModal           closes the Save Modal
// saveToDatabase       saves the current workflow to the database
// download             downloads the current modal to the user's hard drive.

// Save Modal Buttons
$('#save-to-database-button').click(function(){
    saveModule.saveToDatabase();
});
$('.save-file-button-modal').click(function() {
    saveModule.openModal();
});
$('#modal-save-window-close').click(function() {
    saveModule.closeModal();
});
$('#dwn-btn').click(function() {
    saveModule.download();
});



const saveModule = (function() {
    let modalSave = $('#modal-save').plainModal({force: true}), 
        // saveDisplay = document.getElementById("save-display"),
        saveState,
        saveText;
        modalSave.on('plainmodalbeforeclose', function(event) {
            let workflowDescription = document.getElementById("workflow_description_area").value;
            let activeTab = tabModule.getActiveTab();
            activeTab.data("description", workflowDescription);
        });

    //method to save local file
    function startDownload(filename, text) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    function saveFlow(workflowName,workflowDescription){

        let saveState = eventManager.getSaveState();
        // console.log(saveState);
        tabModule.updateTabTitle(eventManager.getFrameID(), workflowName);
        // console.log(workflowName);
        //saveFlow(workflowName,saveState);
        databaseConnectorMenu.saveFlow(workflowName,saveState,workflowDescription);
        modalSave.plainModal('close');
        alert("Workflow saved");
    }

    return { //exposed to public

        openModal: function() {
            saveState = eventManager.getSaveState();
            saveText = (JSON.stringify(saveState));
            // saveDisplay.innerHTML = `<p>${saveText}</p>`;

            let activeTab = tabModule.getActiveTab();
            let description = activeTab.data("description");
            document.getElementById("workflow_description_area").value = description;


            //loadWorkflowListSave();
            databaseConnectorMenu.loadWorkflowListSave();

            modalSave.plainModal('open');
        },
        closeModal: function(){
            modalSave.plainModal('close');
        },
        saveToDatabase:  async function() {
            let workflowName = document.getElementById("save_workflow_name").value;
            // let workflowDescription = document.getElementById("workflow_description_area").firstChild.innerText;
            let workflowDescription = document.getElementById("workflow_description_area").value;

            // console.log("sjsojwowjowjwowjowj");
            // console.log(workflowDescription);

            let exist = await databaseConnectorGUI.checkWorkflowNameExist(workflowName);
            // console.log("check if exists");
            // console.log(exist);

            if (exist == false){
                saveFlow(workflowName,workflowDescription);
            }
            else
            {
                let conf = confirm("Are you sure you want to overwrite the existing file " + workflowName + ".wf?");
                if (conf == true){
                    saveFlow(workflowName,workflowDescription);
                }

            }
        },
        download: function(){
            let filename = document.getElementById("save_workflow_name").value + ".wf";
            startDownload(filename, saveText);
        }
    }
}());



