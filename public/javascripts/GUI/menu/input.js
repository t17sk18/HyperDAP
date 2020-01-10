// This module is responsible for the Input Component Modal's functionality

// The publicly available methods are:
// openModal            opens the Input Modal
// closeModal           closes the Input Modal

// Input Modal Buttons

// Note: open modal button is accessed via workflow so is routed through connector class in the mediator.
$('#modal-input-window-close').click(function() {
    inputModule.closeModal();
});

const inputModule = (function() {
    let modalInput = $('#modal-input').plainModal({});
    return { //exposed to public
        openModal: function(comp) {
            modalInput.plainModal('open');
            databaseConnectorGUI.getTraceList();
            let inputModalID = $('#modal-input');
            // console.log(inputModalID);
            // console.log(comp.id);
            inputModalID.attr("data-input-id",comp.id.toString());
        },
        closeModal: function(){
            let inputModalID = $('#modal-input');
            inputModalID.attr("data-input-id","");
            modalInput.plainModal('close');
        }
    }
}());
