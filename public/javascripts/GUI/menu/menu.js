// This module is responsible for the component menu functionality

// The publicly available methods are:
// setUpFrames        Activates the draggable items and allows the iFrames to be droppable targets.
// setComponent       Updates the currently selected component.
// displayFeedback    Updates the feedback window under the component menu.



const menuModule = (function() {

    let componentName = "name here",
        componentID = "0",
        componentDescription = "description goes here",
        componentInputCount = 1,
        dragboxes = document.getElementsByClassName("dragbox"),
        feedback = document.getElementById("feedback");

        function inputMenuElement() { return $(`<div class="new_component id="dragme" style=" z-index: 100;">
                                        <div class="input_comp_header ui-widget-content;">
                                        <p class="comp_header_text">Input</p>
                                     </div>
                                     <div class="comp_body ui-widget-content">
                                        <p class="comp_output_text">output</p>
                                        <div class="right_node_pointer" id="right_node_pointer_menu"></div>
                                        <div class="right_node_container" id="right_node_container_menu">
                                            <a class="borderoutlineright right node" style=" z-index: 100;">
                                                 <i class="fa fa-circle"></i>
                                            </a>
                                            <a class="right node" style=" z-index: 100;">
                                                 <i class="fa fa-circle"></i>
                                            </a>
                                        </div>
                                         <a class="button-icon input-chart-button" id="menu-button-icon" style=" z-index: 100;">
                                            <i class="fa fa-line-chart"></i>
                                         </a>
                                     </div>
                            </div>`);}
        function outputMenuElement() {  return $(`<div class="new_component id="dragme" style=" z-index: 100;">
                                        <div class="input_comp_header ui-widget-content;">
                                        <p class="comp_header_text">Output</p>
                                     </div>
                                     <div class="comp_body ui-widget-content">
                                        <p class="comp_input_text">input</p>
                                        <div class="left_node_pointer" id="left_node_pointer_menu"></div>
                                        <div class="left_node_container" id="left_node_container_menu">
                                            <a class="borderoutlineleft left node" style=" z-index: 100;">
                                                 <i class="fa fa-circle"></i>
                                            </a>
                                            <a class="left node" style=" z-index: 100;">
                                                 <i class="fa fa-circle"></i>
                                            </a>
                                        </div>
                                         <a class="button-icon output-chart-button" id="menu-button-icon" style=" z-index: 100;">
                                            <i class="fa fa-database"></i>
                                         </a>
                                     </div>
                            </div>`);}
        function menuElement() { return $(`<div class="new_component id="dragme" style=" z-index: 100;">
                                <a style=" z-index: 100;">
                                    <i id ="delete_icon" class="fa fa-times-circle delete-button"></i>
                                </a>
                                <a style=" z-index: 100;">
                                    <i id ="info_icon" class="fa fa-info-circle info-button"></i>
                                </a>
                               
                                <div class="comp_header ui-widget-content">
                                    <p class="comp_header_text">` + componentName + `</p>
                                </div>
                                <div class="comp_body ui-widget-content">
                                 <div class="left_node_container" id="left_node_container_icon">
                                    <a class="borderoutlineleft left node" style=" z-index: 100;">
                                        <i class="fa fa-circle"></i>
                                    </a>
                                    <a class="left node" style=" z-index: 100;">
                                        <i class="fa fa-circle"></i>
                                    </a>
                                </div>
                                <div class="right_node_container" id="right_node_container_icon">
                                    <a class="borderoutlineright right node" style=" z-index: 100;">
                                        <i class="fa fa-circle"></i>
                                    </a>
                                    <a class="right node" style=" z-index: 100;">
                                        <i class="fa fa-circle"></i>
                                    </a>
                                </div>
                                    <p class="comp_input_text">input</p>
                                    <p class="comp_output_text">output</p>
                                </div>
                            </div>`);}

        function activateDroppableZone() {
            // Do once the iframe is completely loaded
            $(`#clientframe${eventManager.getFrameID()}`).attr('src', '/workflow-frame').on('load', function () {
                let frame = $(this).contents().find('#workflow_stage');
                frame.droppable({
                    drop: function (event, ui) {


                        spawnPosition = eventManager.offsetSpawnPosition(ui.position);
                        contactiFrame(componentName, componentDescription, componentID, spawnPosition, componentInputCount);
                    }
                });
            });
        }

        function activateDraggableMenuItems() {
            //Activate draggable zones
            for (let i = 0; i < dragboxes.length; i++) {
                if (dragboxes[i].innerText == 'Input') {
                    $(`#draggable${i}`).draggable({
                        iframeFix: true,    //Core jquery ui params needs for fix iframe bug
                        iframeScroll: false,  //This param needs for activate iframeScroll
                        scroll: false,
                        helper: function () {
                            return inputMenuElement();
                        }
                    });

                } else if (dragboxes[i].innerText == 'Output') {
                    $(`#draggable${i}`).draggable({
                        iframeFix: true,    //Core jquery ui params needs for fix iframe bug
                        iframeScroll: false,  //This param needs for activate iframeScroll
                        scroll: false,
                        helper: function () {
                            return outputMenuElement();
                        }
                    });

                } else {

                    $(`#draggable${i}`).draggable({
                        iframeFix: true,    //Core jquery ui params needs for fix iframe bug
                        iframeScroll: false,  //This param needs for activate iframeScroll
                        scroll: false,
                        helper: function () {
                            return menuElement();
                        }
                    });
                }
            }
        }

    function contactiFrame(componentName, componentDescription, componentID, spawnPosition, inputCount)
    {
        $(`#clientframe${eventManager.getFrameID()}`)[0].contentWindow.iframe.addComponent(componentName, componentDescription, componentID, spawnPosition, null, inputCount);

    }


    return { //exposed to public
        setUpFrames: function (frameID) {
            activateDroppableZone();
            activateDraggableMenuItems();
        },
        setComponent: function(name, id, description, inputCount){
            componentName = name;
            componentID = id;
            componentDescription = description;
            componentInputCount = inputCount;
        },
        displayFeedback: function(title, content){
            feedback.innerHTML = `<h5>${title}</h5><p>${content}</p>`
        }

    }
}());





















var staged_data = null;





//function get_scroll_pos()
//{
//    console.log("wut");
//    var top = $(`#clientframe${eventManager.getFrameID()}`).contents().scrollTop();
//    var left = $(`#clientframe${eventManager.getFrameID()}`).contents().scrollLeft();
//    console.log(top);
//    console.log(left);
//}

//function offset_scrollbar(spawn_position)
//{
//return eventManager.offsetSpawnPosition(spawn_position)
//
//}








