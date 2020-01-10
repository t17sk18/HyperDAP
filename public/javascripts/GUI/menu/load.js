// This module is responsible for the GUI loading saved Workflows

// The publicly available methods are:
// openModal            opens the Load Modal
// closeModal           closes the Load Modal
// setStaged            Stores a selected workflow in memory ready to be loaded
// getStaged            Returns the current staged workflow from memory
// load                 Sends the staged workflow to the eventManager to populate the page with components
// dbLoadTest           A test for setting the staged data from the database
// readFile             Sets the staged data from a local file on the user's hard drive

// Load Modal Buttons
$('.open-file-button-modal').click(function() {
    loadModule.openModal();
});
$('#modal-open-window-close').click(function() {
    loadModule.closeModal();
});

$('#load-the-data-button').click( function(e) {
    e.preventDefault();
    loadModule.load();
});
$('#load-db-test-link').click( function(e) {
    e.preventDefault();
    loadModule.dbLoadTest();
});
$('#open-file-label').click( function(e) {
    loadModule.readFile();
    newModule.newWorkflow();
});

const loadModule = (function() {
    const loadInformation = document.getElementById("load-information"),
        descriptionBox = document.getElementById("load_workflow_description");
    let loadModal = $('#modal-open').plainModal({force: true}),
        stagedData = [],
        stagedDescription = "",
        stagedTitle = "",
        myjson = [],
        workflowName = "",
        xmlhttp,
        theUrl,
        response,
        data,
        file,
        reader;

    return { //exposed to public
        openModal: function(){
            loadModal.plainModal('open');
            //loadWorkflowListOpen();
            databaseConnectorMenu.loadWorkflowListOpen();
        },
        closeModal: function(){
            loadModal.plainModal('close');
            loadModule.setStaged(null, null);
        },
        setStaged: function(data, title) {
            stagedData = data;
            stagedTitle = title;
            //console.log(stagedTitle);
            loadInformation.innerHTML = `<p>${JSON.stringify(data)}</p>`;


        },
        setStagedDescription: function(description){
            descriptionBox.innerText = description;
            stagedDescription = description;
        },
        getStaged: function() {
            return stagedData;
        },
        load: function() {
            if (stagedData!= null && stagedData.length > 0)
            {


                // open a new window
                // console.log(stagedTitle);

                newModule.newWorkflow(stagedTitle + ".wf");

                // populate the new window with the data after page has loaded

                $(`#clientframe${eventManager.getFrameID()}`)[0].contentWindow.addEventListener("load", function(){

                    eventManager.populate(stagedData);


                    loadInformation.innerHTML ="";
                    stagedData = [];

                    // update the description data of the open tab to match the saved description
                    //workflowDescription = document.getElementById("workflow_description_area").value;
                    let activeTab = tabModule.getActiveTab();
                    activeTab.data("description", stagedDescription);

                    loadModule.closeModal();

                });



            }
            else
            {
                loadInformation.innerHTML = "";
                alert("You must select a workflow to load");
            }
        },
        dbLoadTest: function(){
            myjson = [];
            workflowName = "Workflow 2";
            myjson.push(workflowName);

            xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            theUrl = "/load_workflow";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myjson));

            // console.log("send!");

            xmlhttp.onload = function() {
                response = xmlhttp.responseText;
                // console.log(xmlhttp.responseText);
                data = JSON.parse(response);
                // console.log(data);
                stagedData = data;
                loadInformation.innerHTML = `<p>${JSON.stringify(stagedData)}</p>`;
            };

            // console.log("request loading!");
            return false;
        },
        readFile: function () {
        // method to read local file adapted from Github user liabru (accessed 02/06/2019) https://gist.github.com/liabru/11263124
        fileInput = document.getElementById("filein");
        fileInput.addEventListener('change', function () {
            // console.log("atempting to load");
            file = fileInput.files[0];

            if (file.name.match(/\.(wf)$/)) {
                // console.log("match");
                reader = new FileReader();
                reader.onload = function () {
                    stagedData = JSON.parse(reader.result);
                    loadModule.setStaged(stagedData, file.name);
                    // console.log(reader.result);
                    fileInput = null;
                    file = null;

                    loadModule.load();
                };

                reader.readAsText(file);
            } else {
                alert("File not supported, .txt or .json files only");
            }
        });
    }
    }
}());
