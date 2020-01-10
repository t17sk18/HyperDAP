class Mediator{
    snap(){
        return settingsModule.snap();
    }
    displayFeedback(title, content){
        menuModule.displayFeedback(title, content);
    }
    openComponentInfoModal(comp){
        componentInfoModule.openModal(comp);
    }
    openInputModal(comp){
        inputModule.openModal(comp);
    }
    openOutputModal(comp){
        outputModule.openModal(comp);
    }
    loading(){
        if (loadModule.getStaged() == null || loadModule.getStaged().length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    getFrameID(){
        return eventManager.getFrameID();
    }
    getSaveState(){
        return eventManager.getSaveState();
    }
}

gui = new Mediator();





