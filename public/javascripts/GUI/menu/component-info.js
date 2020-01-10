// This module is responsible for the Component Info Modals functionality

// The publicly available methods are:
// openModal            opens the Component Info Modal
// closeModal           closes the Component Info Modal

// Component Info Modal Buttons

// Note: open modal button is accessed via workflow so is routed through connector class in the mediator.
$('#modal-component-info-close').click(function() {
    componentInfoModule.closeModal();
});

const componentInfoModule = (function() {
    let componentInfoModal = $('#modal-component-info').plainModal({}),
        componentInfoDescription = document.getElementById("component-info-description"),
        componentInfoTitle = document.getElementById("component-info-title"),
        componentInfoStatus = document.getElementById("component-info-status"),
        componentInputTable = "",
        componentOutputTable = "",
        traceTitle = document.getElementById("trace-title"),
        debugtable ="";

    // This happens after the modal window has opened
    componentInfoModal.on('plainmodalopen', function(event) {

        // if debug seetings are on then show the connections
        let settings = settingsModule.getSettings();
        if(settings.debug == true)
        {
            componentInfoStatus.innerHTML = "";
            componentInfoStatus.innerHTML = debugtable;
        }
        else // show the graph representation of the trace file
        {
            // generate a spinning load icon
            componentInfoStatus.innerHTML = chartModule.generateSpinner();
            // databaseConnector.readLocalDataTest();

            // let fileURL = document.getElementById("component-info-status").getAttribute('data-trace-url');;

            //let fileURL = 'G8-DTS/G8_DTS-01Jan2018-003415.las';
//<<<<<<< HEAD - check with Yugie

        //databaseConnector.readLocalData(fileURL, componentInfoStatus, traceTitle);
//=======
            // databaseConnector.readLocalData(fileURL, componentInfoStatus, componentInfoTitle);

            // console.log("component local ID is:  ");
            let compInfoModal = $('#modal-component-info');
            // console.log(compInfoModal.attr('data-local-id'));
            let localID = compInfoModal.attr('data-local-id');

            databaseConnectorGUI.getResultData(localID, componentInfoStatus, componentInfoTitle);
        }
    });
    componentInfoModal.on('plainmodalclose', function(event) {
        traceTitle.innerText = "";

    });

        function componentInputsTable(comp){
            inputTable = "";
            for (let i = 0; i < comp.inputs.length; i++) {
                if (comp.inputs[i].connectedElement != null) {
                    inputTable += `<tr>
                        <td>${i}</td>
                        <td>${comp.inputs[i].connectedElement.c_name}</td>
                        <td>${comp.inputs[i].connectedElement.id}</td>
                    </tr>`
                }
            }
        }

    function componentOutputsTable(comp){
        outputTable = "";
        for (let i = 0; i < comp.outputs.length; i++) {
            if (comp.outputs[i].connectedElement != null) {
                outputTable += `<tr>
                            <td>${i}</td>
                            <td>${comp.outputs[i].connectedElement.c_name}</td>
                            <td>${comp.outputs[i].connectedElement.id}</td>
                        </tr>`
            }
        }
    }

    function buildComponentTable(comp){
        let componentTable =   `<div class="row">
                            <div class = "col">
                                <table class ="table">
                                    <tr>
                                        <th>ID in workflow</th>
                                        <th>Component ID</th>
                                        <th>Component name</th>
                                    </tr>
                                    <tr>
                                        <td>${comp.id}</td>
                                        <td>${comp.component_id}</td>
                                        <td>${comp.c_name}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class = "row">
                            <div class = "col">
                                <p style = "text-align: center"><b>Inputs</b></p>
                                <table class ="table">
                                <tr>
                                    <th></th>
                                    <th>Component Name</th>
                                    <th>Local ID</th>
                                ${inputTable}
                                </table>
                            </div>
                            <div class = "col">
                                <p style = "text-align: center"><b>Outputs</b></p>
                                <table class ="table">
                                    <tr>
                                        <th></th>
                                        <th>Component Name</th>
                                        <th>Local ID</th>
                                    </tr>
                                   ${outputTable}
                                </table>
                            </div>
                    </div>`
        return componentTable;

    }

    return { //exposed to public

        openModal: function(comp) {
            let compInfoModal = $('#modal-component-info');
            compInfoModal.attr("data-local-id",comp.id.toString());

            componentInfoTitle.innerText = comp.c_name;
            componentInfoDescription.innerHTML = `<p> A decription of ${comp.c_name}'s functionalities etc...</p>`;

            componentInfoStatus.innerHTML = "";
            componentInputsTable(comp);
            componentOutputsTable(comp);
            debugtable = buildComponentTable(comp);

            componentInfoModal.plainModal('open');

        },
        closeModal: function(){
            componentInfoModal.plainModal('close');
        }
    }
}());

