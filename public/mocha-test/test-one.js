describe('Mocha Testing', function(){
    describe('Check admin-connector.js', function(){
        it('Display Information', function(){
            console.log(adminConnector);
        });
        it('Check if filterLogResult() exist', function(){
            expect(adminConnector.filterLogResult).exist;
        });
        it('Check if resetPassword() exist', function(){
            expect(adminConnector.resetPassword).exist;
        });
    });

    describe('Check user-connector.js', function(){
        it('Display Information', function(){
            console.log(userConnector);
        });
        it('Check if writeUserSettings() exist', function(){
            expect(userConnector.writeUserSettings).exist;
        });
        it('Check if readUserSettings() exist', function(){
            expect(userConnector.readUserSettings).exist;
        });
        it('Check if addLog() exist', function(){
            expect(userConnector.addLog).exist;
        });
        it('Check if checkLoginUser() exist', function(){
            expect(userConnector.checkLoginUser).exist;
        });
    });

    describe('Check GUI-connector.js', function(){
        it('Display Information', function(){
            console.log(databaseConnectorGUI);
        });
        it('Check if getResultData() exist', function(){
            expect(databaseConnectorGUI.getResultData).exist;
        });
        it('Check if readLocalData() exist', function(){
            expect(databaseConnectorGUI.readLocalData).exist;
        });
        it('Check if sendInput() exist', function(){
            expect(databaseConnectorGUI.sendInput).exist;
        });
        it('Check if selectTrace() exist', function(){
            expect(databaseConnectorGUI.selectTrace).exist;
        });
        it('Check if getTraceList() exist', function(){
            expect(databaseConnectorGUI.getTraceList).exist;
        });
        it('Check if computation() exist', function(){
            expect(databaseConnectorGUI.computation).exist;
        });
        it('Check if computationOutput() exist', function(){
            expect(databaseConnectorGUI.computationOutput).exist;
        });
    });

    describe('Check menu-connector.js', function(){
        it('Display Information', function(){
            console.log(databaseConnectorMenu);
        });
        it('Check if loadFlow() exist', function(){
            expect(databaseConnectorMenu.loadFlow).exist;
        });
        it('Check if loadWorkflowListOpen() exist', function(){
            expect(databaseConnectorMenu.loadWorkflowListOpen).exist;
        });
        it('Check if confirmDelete() exist', function(){
            expect(databaseConnectorMenu.confirmDelete).exist;
        });
        it('Check if loadWorkflowListSave() exist', function(){
            expect(databaseConnectorMenu.loadWorkflowListSave).exist;
        });
        it('Check if selectWorkflowSave() exist', function(){
            expect(databaseConnectorMenu.selectWorkflowSave).exist;
        });
        it('Check if loadWorkflowListNew() exist', function(){
            expect(databaseConnectorMenu.loadWorkflowListNew).exist;
        });
        it('Check if selectWorkflowNew() exist', function(){
            expect(databaseConnectorMenu.selectWorkflowNew).exist;
        });
        it('Check if saveFlow() exist', function(){
            expect(databaseConnectorMenu.saveFlow).exist;
        });
    });

    describe('Check workflow-connector.js', function(){
        it('Display Information', function(){
            console.log(databaseConnectorWF);
        });
        it('Check if checkCompatibilityOne() exist', function(){
            expect(databaseConnectorWF.checkCompatibilityOne).exist;
        });
        it('Check if checkCompatibility() exist', function(){
            expect(databaseConnectorWF.checkCompatibility).exist;
        });
        it('Check if computation() exist', function(){
            expect(databaseConnectorWF.computation).exist;
        });
    });

    describe('Check event-Manager.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(eventManager);
        });
        it('Check if start() exist', function(){
            expect(eventManager.start).exist;
        });
        it('Check if setFrameID() exist', function(){
            expect(eventManager.setFrameID).exist;
        });
        it('Check if getFrameID() exist', function(){
            expect(eventManager.getFrameID).exist;
        });
        it('Check if populate() exist', function(){
            expect(eventManager.populate).exist;
        });
        it('Check if offsetSpawnPosition() exist', function(){
            expect(eventManager.offsetSpawnPosition).exist;
        });
        it('Check if getSaveState() exist', function(){
            expect(eventManager.getSaveState).exist;
        });
    });

    describe('Check tab-manager.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(tabModule);
        });
        it('Check if getTabCount() exist', function(){
            expect(tabModule.getTabCount).exist;
        });
        it('Check if getActiveTab() exist', function(){
            expect(tabModule.getActiveTab).exist;
        });
        it('Check if updateTabTitle() exist', function(){
            expect(tabModule.updateTabTitle).exist;
        });
        it('Check if initialise() exist', function(){
            expect(tabModule.initialise).exist;
        });
        
    });

    describe('Check menu/component-info.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(componentInfoModule);
        });
        it('Check if openModal() exist', function(){
            expect(componentInfoModule.openModal).exist;
        });
        it('Check if closeModal() exist', function(){
            expect(componentInfoModule.closeModal).exist;
        });
        
    });

    describe('Check menu/input.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(inputModule);
        });
        it('Check if openModal() exist', function(){
            expect(inputModule.openModal).exist;
        });
        it('Check if closeModal() exist', function(){
            expect(inputModule.closeModal).exist;
        });
        
    });

    describe('Check menu/load.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(loadModule);
        });
        it('Check if openModal() exist', function(){
            expect(loadModule.openModal).exist;
        });
        it('Check if closeModal() exist', function(){
            expect(loadModule.closeModal).exist;
        });
        it('Check if setStaged() exist', function(){
            expect(loadModule.setStaged).exist;
        });
        it('Check if getStaged() exist', function(){
            expect(loadModule.getStaged).exist;
        });
        it('Check if load() exist', function(){
            expect(loadModule.load).exist;
        });
        it('Check if dbLoadTest() exist', function(){
            expect(loadModule.dbLoadTest).exist;
        });
        it('Check if readFile() exist', function(){
            expect(loadModule.readFile).exist;
        });
        
    });

    describe('Check menu/menu.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(menuModule);
        });
        it('Check if setUpFrames() exist', function(){
            expect(menuModule.setUpFrames).exist;
        });
        it('Check if setComponent() exist', function(){
            expect(menuModule.setComponent).exist;
        });
        it('Check if displayFeedback() exist', function(){
            expect(menuModule.displayFeedback).exist;
        });
        
    });

    describe('Check menu/new.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(newModule);
        });
        it('Check if openModal() exist', function(){
            expect(newModule.openModal).exist;
        });
        it('Check if closeModal() exist', function(){
            expect(newModule.closeModal).exist;
        });
        it('Check if newWorkflow() exist', function(){
            expect(newModule.newWorkflow).exist;
        });
        
    });

    describe('Check menu/output.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(outputModule);
        });
        it('Check if openModal() exist', function(){
            expect(outputModule.openModal).exist;
        });
        it('Check if closeModal() exist', function(){
            expect(outputModule.closeModal).exist;
        });
        
    });

    describe('Check menu/settings.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(settingsModule);
        });
        it('Check if openModal() exist', function(){
            expect(settingsModule.openModal).exist;
        });
        it('Check if closeModal() exist', function(){
            expect(settingsModule.closeModal).exist;
        });
        it('Check if postSettings() exist', function(){
            expect(settingsModule.postSettings).exist;
        });
        it('Check if postSettingsl() exist', function(){
            expect(settingsModule.postSettings).exist;
        });
        
    });

    describe('Check workflow/logic.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(logicModule);
        });
        it('Check if sendSignal() exist', function(){
            expect(logicModule.sendSignal).exist;
        });
        it('Check if getUpdate() exist', function(){
            expect(logicModule.getUpdate).exist;
        });
        
    });

    describe('Check workflow/manager.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(managerModule);
        });
        it('Check if addInputComponent() exist', function(){
            expect(managerModule.addInputComponent).exist;
        });
        it('Check if addOutputComponent() exist', function(){
            expect(managerModule.addOutputComponent).exist;
        });
        it('Check if addComponent() exist', function(){
            expect(managerModule.addComponent).exist;
        });
        it('Check if test() exist', function(){
            expect(managerModule.test).exist;
        });
        
    });

    describe('Check workflow/component/button-activator-delete-me.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(buttonActivatorModule);
        });
        it('Check if delete() exist', function(){
            expect(buttonActivatorModule.delete).exist;
        });
        
    });

    describe('Check workflow/component/dom-activator.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(domActivatorModule);
        });
        it('Check if activateClass() exist', function(){
            expect(domActivatorModule.activateClass).exist;
        });
        it('Check if activateNode() exist', function(){
            expect(domActivatorModule.activateNode).exist;
        });
    });

    describe('Check workflow/component/dom-builder.js', function(){
        it('Display Information', function(){
            //expect(databaseConnector.loadFlow()).exist;
            //let DBCon = JSON.stringify(databaseConnector);
            console.log(domBuilderModule);
        });
        it('Check if input() exist', function(){
            expect(domBuilderModule.input).exist;
        });
        it('Check if output() exist', function(){
            expect(domBuilderModule.output).exist;
        });
        it('Check if component() exist', function(){
            expect(domBuilderModule.component).exist;
        });
    });

});