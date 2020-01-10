// This module is responsible for generating the html for creating new components
// The publicly available methods are input, output, component and expanse

const domBuilderModule = (function() {
    function expandButtons(comp, style) { return `<a style=" z-index: 100;">
                                                    <i id ="plus${comp.id}" class="fa fa-plus-square plus-button ${style}"></i>
                                                 </a>
                                                    <a style=" z-index: 100;">
                                                    <i id ="minus${comp.id}" class="fa fa-minus-square minus-button ${style}"></i>
                                                 </a>`
                                                }
    function buildEndComponentHtml(comp, input)
    {
        let direction = "right",
            icon = "fa fa-line-chart",
            iconClass = "input-chart-button",
            connectorType = "output",
            endType = "input",
            eButtons = expandButtons(comp, "end-plus");

        if (input == false)
        {
                direction = "left";
                icon = "fa fa-database";
                iconClass = "output-chart-button";
                connectorType = "input";
                endType = "output";
                eButtons = "";

        }
        newComponentHtml = `<a style=" z-index: 100;">
                                <i id ="delete${comp.id}" class="fa fa-times-circle delete-button endcomp"></i>
                             </a>
                             <a style=" z-index: 100;">
                                <i id ="info${comp.id}" class="fa fa-info-circle info-button endcomp"></i>
                             </a>
                            <div class="input_comp_header ui-widget-content">
                                <p class="comp_header_text">${comp.c_name}</p>
                                ${eButtons}
                             </div>
                             <div class="comp_body ui-widget-content">
                                <p class="comp_${connectorType}_text">${connectorType}</p>
                                <div class="${direction}_node_pointer" id="${direction}_node_pointer${comp.id}"></div>
                                <div class="${direction}_node_container" id="${direction}_node_container${comp.id}">
                                    <a class="borderoutline${direction} ${direction} node" style=" z-index: 100;">
                                         <i class="fa fa-circle"></i>
                                    </a>
                                    <a class="${direction} node" style=" z-index: 100;">
                                         <i class="fa fa-circle"></i>
                                    </a>
                                </div>
                                 <a class="button-icon ${iconClass}" id="${endType}-button-icon-${comp.id}" style=" z-index: 100;">
                                    <i class="${icon}"></i>
                                 </a>
                             </div>
                            <div id="expander${comp.id}"></div>`
        return newComponentHtml;
    }
    function buildComponentHtml(comp)
    {
        eButtons = expandButtons(comp, "");
        newComponentHtml = `<a style=" z-index: 100;">
                                <i id ="delete${comp.id}" class="fa fa-times-circle delete-button"></i>
                             </a>
                             <a style=" z-index: 100;">
                                <i id ="info${comp.id}" class="fa fa-info-circle info-button"></i>
                             </a>
                             <div class="comp_header ui-widget-content">
                              <p class="comp_header_text">${comp.c_name}</p>
                                ${eButtons}
                             </div>
                             <div class="comp_body ui-widget-content">
                                 <p class="comp_input_text">input</p>
                                 <p class="comp_output_text">output</p>
                                 <div class="left_node_pointer" id="left_node_pointer${comp.id}"></div>
                                 <div class="right_node_pointer" id="right_node_pointer${comp.id}"></div>
                                 <div class="left_node_container" id="left_node_container${comp.id}">
                                     <a class="borderoutlineleft left node" style=" z-index: 100;">
                                        <i class="fa fa-circle"></i>
                                     </a>
                                     <a class="left node" style=" z-index: 100;">
                                        <i class="fa fa-circle"></i>
                                     </a>
                                 </div>
                                 <div class="right_node_container" id="right_node_container${comp.id}">
                                     <a class="borderoutlineright right node" style=" z-index: 100;">
                                        <i class="fa fa-circle"></i>
                                     </a>
                                     <a class="right node" style=" z-index: 100;">
                                        <i class="fa fa-circle"></i>
                                     </a>
                                 </div>
                             </div>
                             <div id="expander${comp.id}"></div>`
        return newComponentHtml;
    }
    function buildInputExpanseHtml (comp, count){
        newInputExpansetHtml = `<p class="comp_input_text">input</p>                         
        <div class="left_node_pointer" id="${comp.id}inputpointer${count}"></div>        
        <div class="left_node_container" id="${comp.id}inputcontainer${count}">
        
            <a class="borderoutlineleft left node" style=" z-index: 100;">
                <i class="fa fa-circle"></i>
            </a>
            <a class="left node" style=" z-index: 100;">
                <i class="fa fa-circle"></i>
            </a>
        </div>`;
        return newInputExpansetHtml;
    }
    function buildOutputExpanseHtml (comp, count){
        newExpansetHtml = `<p class="comp_output_text">output</p>                           
        <div class="right_node_pointer" id="${comp.id}outputpointer${count}"></div>
        <div class="right_node_container" id="${comp.id}outputcontainer${count}">
            <a class="borderoutlineright right node" style=" z-index: 100;">
                <i class="fa fa-circle"></i>
            </a>
            <a class="right node" style=" z-index: 100;">
                <i class="fa fa-circle"></i>
            </a>
        </div>`;
        return newExpansetHtml;
    }

    return { //exposed to public
        input: function(comp) {
            let newDiv = document.createElement("div"),
                html = buildEndComponentHtml(comp, true);
            newDiv.classList.add("new_component" );
            newDiv.id = `draggable${comp.id}`;
            newDiv.innerHTML = html;
            return newDiv;
        },
        output: function(comp) {
            let newDiv = document.createElement("div"),
                html = buildEndComponentHtml(comp, false);
            newDiv.classList.add("new_component" );
            newDiv.id = `draggable${comp.id}`;
            newDiv.innerHTML = html;
            return newDiv;
        },
        component: function(comp, inputCount) {
            // inputCount will be for providing additional inputs
            let newDiv = document.createElement("div"),
                html = buildComponentHtml(comp);
            newDiv.classList.add("new_component" );
            newDiv.id = `draggable${comp.id}`;
            newDiv.innerHTML = html;
            return newDiv;
        },
        outputExpanse: function(comp, outputExpanseCount) {
            let newDiv = document.createElement("div"),
                html = buildOutputExpanseHtml (comp, outputExpanseCount);
            newDiv.classList.add("comp_body","ui-widget-content");
            newDiv.id = `${comp.id}output${outputExpanseCount}`;
            newDiv.style.position = "relative";
            newDiv.innerHTML = html;
            //console.log(newDiv);
            return newDiv;
        },
        inputExpanse: function(comp, inputExpanseCount) {
            let newDiv = document.createElement("div"),
                html = buildInputExpanseHtml (comp, inputExpanseCount);
            newDiv.classList.add("comp_body","ui-widget-content");
            newDiv.id = `${comp.id}input${inputExpanseCount}`;
            newDiv.style.position = "relative";
            newDiv.innerHTML = html;
            //console.log(newDiv);
            return newDiv;
        }
    }
}());








