// This module is responsible for the Output Component Modal's functionality

// The publicly available methods are:
// openModal            opens the Output Modal
// closeModal           closes the Output Modal

// Component Info Modal

// Note: open modal button is accessed via workflow so is routed through connector class in the mediator.
$('#modal-output-window-close').click(function() {
    outputModule.closeModal();
});

const outputModule = (function() {
    let modalOutput = $('#modal-output').plainModal({}),

    outputsChart = document.getElementById("outputs-chart");
    // This happens after the modal window has opened
    modalOutput.on('plainmodalopen', function(event) {

        // if debug seetings are on then show the connections
        let settings = settingsModule.getSettings();
        if(settings.debug == true)
        {
            //componentInfoStatus.innerHTML = "";
            //componentInfoStatus.innerHTML = debugtable;
        }
        else // show the graph representation of the trace file
        {

            outputsChart.innerHTML = chartModule.generateSpinner();


            databaseConnectorGUI.getResultDataOutput(outputsChart, "Outputs");
        }
    });

    
    
    return { //exposed to public
        openModal: function(comp) {
            let outputModalID = $('#modal-output');
            // console.log(outputModalID);
            // console.log(comp.id);
            outputModalID.attr("data-output-id",comp.id.toString());
            let resultArea = document.getElementById("result_area");
            resultArea.innerHTML = "";
            modalOutput.plainModal('open');
        },
        closeModal: function(){
            let outputModalID = $('#modal-output');
            // console.log(outputModalID);
            outputModalID.attr("data-output-id","");
            modalOutput.plainModal('close');
        }
    }
}());



