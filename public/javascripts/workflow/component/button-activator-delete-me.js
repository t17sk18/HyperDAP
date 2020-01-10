const buttonActivatorModule = (function() {

    return { //exposed to public

        delete: function (button, comp) {
            $(button).click( function(e) {
                e.preventDefault();
                remove_component(comp);
            } );
        },


    }
}());


function initialize_delete_button(delete_button, comp)
{


}

function remove_component(comp)
{
    // find and remove any existing connections
    if (comp.input != null)
    {
        disconnect_inputs(comp)
    }
    if (comp.output != null)
    {
        disconnect_outputs(comp)
    }
    // remove from the list of onscreen elements
    var index = components_in_workflow.indexOf(comp);
    if (index !== -1) components_in_workflow.splice(index, 1);
    // delete the html
    comp.element.parentNode.removeChild(comp.element);
    // delete the class instance
    comp = null;
    return false;
}

function initialize_info_button(info_button, comp)
{
    $(info_button).click( function(e) {
        // console.log("check");
        e.preventDefault();
        parent.open_component_info_modal(comp);
    });
}

function initialize_plus_button(plus_button, comp)
{
    $(plus_button).click( function(e) {
        e.preventDefault();
        expand(comp);
        // console.log("expand");
    });
}
function initialize_minus_button(minus_button, comp)
{
    $(minus_button).click( function(e) {
        e.preventDefault();
        // console.log("reduce");
        reduce(comp);
    });
}