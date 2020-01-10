// This module is responsible for the creating new Workflows

// The publicly available methods are:
// openModal            opens the New Modal
// closeModal           closes the New Modal
// newWorkflow        Creates a new empty workflow

// New Workflow Modal Buttons

$('.new-file-button-modal').click(function() {
    newModule.openModal();
});
$('#modal-new-window-close').click(function() {
    newModule.closeModal();
});
$('#create-new-workflow').click( function(e) {
    // make sure that staged load data is empty if creating a new empty workflow
    // else it will not auto generate an input and output component
    loadModule.setStaged([]);

    // Get the title from the input box
    let title = $('#new_workflow_name')[0].value + ".wf";
    newModule.newWorkflow(title);


});

const newModule = (function() {
    let modalNew = $('#modal-new').plainModal({force: true}),
        saveText = document.getElementById("save_workflow_name");
    return { //exposed to public
        openModal: function(){
            modalNew.plainModal('open');
            $('#new_workflow_name')[0].value = "Workflow " + (tabModule.getTabCount() + 1);
            //loadWorkflowListNew();
            databaseConnectorMenu.loadWorkflowListNew();
        },
        closeModal: function(){
            modalNew.plainModal('close');
        },
        newWorkflow: function(title) {
            let tabTitle = $( "#tab_title" ),
                tabContent = $( "#tab_content" ),
                count = tabModule.getTabCount(),
                tabTemplate = `<li id="tabid${count}"><a href="#{href}">#{label}</a> <i id = 'delete-tabs-${count}' class='fa fa-times-circle delete-tab' role='presentation'></i></li>`;




            saveText.value = title.replace('.wf','');
            eventManager.setFrameID(count);
            //console.log(saveText.value);
            let id = "tabs-" + count,
                label =  title || id,
                li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
                tabContentHtml = tabContent.val() || "Tab " + count + " content.";
                li.data("count", count);
                li.data("description", "Optional");



            tabModule.initialise(li, id);
            //console.log("Activating " + eventManager.getFrameID() );
            menuModule.setUpFrames(eventManager.getFrameID());
            modalNew.plainModal('close');
            settingsModule.postSettingsOnStart();
            return true;
        }
    }
}());

