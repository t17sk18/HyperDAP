// This module is responsible for managing the events

// The publicly available methods are:
// start        Starts the application

const eventManager = (function() {
    let frameID = 0,
        iframeOffset,
        iframe,
        top,
        left;
    function activateComponentMenu(){
        // Activates the component menu
        $(document).ready(function() {
            $('.dragbox').mousedown(function(){
                $(this).css('cursor', 'grabbing');
                menuModule.displayFeedback(this.innerText, this.getAttribute("data-description"));
                menuModule.setComponent(this.innerText, this.getAttribute("data-component-id"),this.getAttribute("data-description"), this.getAttribute("data-inputCount") );
            });
            $('.dragbox').mouseup(function(){ $(this).css('cursor', 'grab');});
            $('.dragbox').mouseover(function(){ $(this).css('cursor', 'grab');});
        });
    }

    return { //exposed to public
        start: function() {
            let title = $('#new_workflow_name')[0].value + ".wf";
            newModule.newWorkflow(title);
            activateComponentMenu();
        },
        setFrameID: function (id) {
            frameID = id;
        },
        getFrameID: function () {
            return frameID;
        },
        populate: function (data) {
            if (data !== []) {
                $(`#clientframe${frameID}`)[0].contentWindow.iframe.load(data);

                // resets the staged data to null
                loadModule.setStaged([]);

                loadModule.closeModal();
            } else {
                alert("You must select a workflow to load");
            }
        },
        offsetSpawnPosition: function(spawnPosition){

            // Update the spawn position based on the offset of the scrollbar
            iFrame = $(`#clientframe${frameID}`);
            wfWindow = iFrame.contents()[0].getElementById("wf-window");
            //console.log("window = ");
            //console.log(wfWindow);
            top = wfWindow.scrollTop;
            left = wfWindow.scrollLeft;
            //console.log(top);

            spawnPosition.top += top;
            spawnPosition.left += left;

            // update the spawn position based on the position of the iframe element
            iframeOffset = iFrame.offset();
            spawnPosition.top -=  iframeOffset.top;
            spawnPosition.left -= iframeOffset.left;

            // Add additional offset to center spawn of component under center of draggable menu item
            spawnPosition.top += 120;
            spawnPosition.left += 0;

            // console.log(spawnPosition);
            return spawnPosition;
        },
        getSaveState: function()
        {
            saveState = $(`#clientframe${eventManager.getFrameID()}`)[0].contentWindow.return_save_state();
            return saveState;
        }
    }
}());



eventManager.start();






