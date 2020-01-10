// Script for switching tabs was adapted from the jQuery UI examples, accessed (02/06/19) https://jqueryui.com/tabs/#manipulation

const tabModule = (function() {

    let tabCounter = 0,
        tabs = $( "#tabs" ).tabs(),
        savetext = document.getElementById("save_workflow_name"),
        activeTab;


    return { //exposed to public
//        setID: function(li, tabCounter) {
//            li.on( "click", function( event ) {
//                //eventManager.setFrameID(tabCounter);
//                //console.log();
//               savetext.value= this.innerText.replace('.wf','');
//            });
//        },
        getTabCount: function () {
            return tabCounter;
        },
        getActiveTab: function(){
            return activeTab;
        },
        updateTabTitle: function (tabID, newTitle) {
            lis = tabs.find("li");
            for(let i =0; i< lis.length; i++)
            {
                // console.log(lis[i]);
                if (lis[i].id == "tabid" + tabID)
                {
                   let a =  lis[i].children;
                //    console.log(a);
                   a[0].innerText = newTitle + ".wf";
                }
            }
        },
        initialise: function(li, id){

            lis= tabs.find("li").length;

            tabs.find( ".ui-tabs-nav" ).append( li );
            tabs.append( `<div style="height:100%;" id="${id}"><iframe id="clientframe${tabCounter}" class="iframe" src = "/workflow-frame" width = "100%" height = "95%" scrolling = "no"></iframe></div>` );
            tabs.tabs( "refresh" );
            // console.log(tabs.tabs());
            // when tab is loaded update frame id
            tabs.tabs({
                activate: function( event, ui ) {
                    activeTab = ui.newTab;
                    //console.log("my id = " + ui.newTab.data("count"));
                    eventManager.setFrameID(ui.newTab.data("count"));

                    //console.log(ui.newTab);
                    savetext.value= ui.newTab[0].innerText.replace('.wf','');
                },
                create: function( event, ui ) {
                    //console.log("my id = " + ui.newTab.data("count"));
                    eventManager.setFrameID(ui.newTab.data("count"));
                    //console.log(ui.newTab);
                    savetext.value= ui.newTab[0].innerText.replace('.wf','');
                }

            });


            //console.log("there are " + (tabCounter) + " tabs");
            eventManager.setFrameID( tabCounter);


            //console.log("iFrame selected = " + eventManager.getFrameID());

            $( tabs ).tabs({
                active: ( lis),
                beforeActivate: function( event, ui ) {

                   // eventManager.setFrameID( li.data("count"));
                //eventManager.setFrameID(parseInt(ui.newTab[0].id.replace(/\D/g,'')) );


                }

            });
            tabCounter ++;

            deleteButton = $(`#delete-${id}`);
            deleteButton.click(function() {
                conf = confirm("Do you want to save first?");
                if (conf == true){
                    saveModule.openModal();
                }
                else {
                    // BUGGY CODE HERE
                    // console.log("Bug herre");
                    var panelId = li.remove().attr("aria-controls");
                    $("#" + panelId).remove();
                    tabs.tabs("refresh");
                }
            });

            // // Close icon: removing the tab on click
            // tabs.on( "click", "i.delete-tab", function() {
            //
            //         var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
            //         $( "#" + panelId ).remove();
            //         tabs.tabs( "refresh" );
            //
            //
            // });
            // tabs.on( "keyup", function( event ) {
            //     if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
            //         var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
            //         $( "#" + panelId ).remove();
            //         tabs.tabs( "refresh" );
            //
            //
            //     }
            // });

        }
    }
}());



