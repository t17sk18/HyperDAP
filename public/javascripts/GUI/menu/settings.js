// This module is responsible for the Settings Menu functionality

// The publicly available methods are:
// openModal            opens the Settings Modal
// closeModal           closes the Settings Modal
// postSettings         Posts the current settings to all open workflow iFrames
// snap                 returns the current snap to grid setting

// Settings Modal Buttons
$('.settings-button-modal').click(function() {
    settingsModule.openModal();
});
$('#modal-settings-window-close').click(function() {
    settingsModule.closeModal();
});
$('#save-settings-button').click(function() {
    // console.log("SAVE SETTINGS");
    // console.log(settingsModule.getSettings());
    settingsString = JSON.stringify(settingsModule.getSettings());
    userConnector.writeUserSettings(settingsString);
});


const settingsModule = (function() {
    let modalSettings = $('#modal-settings').plainModal({force: true}),
        settings = {grid:true, snap:false, debug:false};

    $(document).ready(function() {
        userConnector.readUserSettings();



        $("#grid-toggle").change(function() {
            if(this.checked) {
                settings.grid = true;
            } else {
                settings.grid = false;
            }
            settingsModule.postSettings();
        });

        $("#snap-toggle").change(function() {
            if(this.checked) {
                settings.snap = true;
            } else {
                settings.snap = false;
            }
            settingsModule.postSettings();
        });
        $("#debug-toggle").change(function() {
            if(this.checked) {
                settings.debug = true;
            } else {
                settings.debug = false;
            }
            settingsModule.postSettings();
        });
    });
    return {
        dbSettings: function(dbs){

            // console.log("wut");
                settings = dbs;
            // console.log("settings");
                // console.log(settings);
                // console.log($("#grid"));
            $("#grid-toggle")[0].checked = settings.grid;
            $("#snap-toggle")[0].checked = settings.snap;
            $("#debug-toggle")[0].checked = settings.debug;
            this.postSettingsOnStart();



        },
        //exposed to public
        openModal: function(){
            modalSettings.plainModal('open');
        },
        closeModal: function(){
            modalSettings.plainModal('close');
        },
        getSettings: function(){
            return settings;
        },
        postSettingsOnStart: function() {
            iframes = $('.iframe');

            for (let i = 0; i < iframes.length; i++)    {
                // Only post settings to the workflow if the iframe has fully loaded
                iframes[i].addEventListener("load", function(){
                    iframes[i].contentWindow.update_settings(settings);
                });

            }
        },
        postSettings: function() {
            iframes = $('.iframe');
            // console.log("there are " + iframes.length);
            for (let i = 0; i < iframes.length; i++)    {

                // console.log(iframes[i].id);
                iframes[i].contentWindow.update_settings(settings);
                // console.log(settings);
            }
        },
        snap: function()
        {
            return settings.snap;
        }
    }
}());

