/*
Module for data analysis

Function list:
componentFunctionSelector(componentID): select the function in ComFunc based on the componentID
process(componentsOnWorkflow, input, frameID): entry point of the whole calculation
getResult(order,input,frameID): populate the result table
buildModel(componentsOnWorkflow): create model from the component list in workflow
buildOrder(model): create computational order from the model

 */

const DataReader = require('../modules/Data-Reader');
const CompFunc = require('../modules/CompFunc');
const Validtor = require('../modules/Validator');

var computation = module.exports = {
    componentFunctionSelector: function(componentID){
        switch(componentID){
            case 0:
                return CompFunc.inputComp;
                break;
            case 1:
                return CompFunc.outputComp;
                break;
            case 2:
                return CompFunc.compA;
                break;
            case 3:
                return CompFunc.compB;
                break;
            case 4:
                return CompFunc.compC;
                break;
            case 5:
                return CompFunc.compD;
                break;
            case 6:
                return CompFunc.outlierRemove;
                break;
            case 7:
                return CompFunc.noiseSeparate;
                break;
            case 8:
                return CompFunc.noiseSuppress;
                break;
        }
    },
    process: function(componentsOnWorkflow, input, frameID){
        let model = computation.buildModel(componentsOnWorkflow);
        let order = computation.buildOrder(model);
        //console.log(model);
        for(let i=0; i< model.list.length;i++){
            // console.log(model.list[i]);
        }

        let result = computation.getResult(order,input,frameID);
        return result;

    },
    getResult: function(order,input,frameID){
        // console.log("getting result");
        // add another parameter of input data later


        //let inputData = 1; // simplified case for testing

        //let inputData = [1,2,3,4,5,6,7]; // 2nd step moving to an array
        let inputData = input;
        // console.log(inputData);
        // let dataIn;
        // let dataOut;
        // let record;
        // let validInfo; //information for validation
        // let isValid;
        // let localID,

        let dataIn,dataOut,record,validInfo,isValid,localID,compID,inputs,outputs,layerID,func1;

        let resultTable = [];
        for(let i=0; i<order.length; i++){
            localID = order[i].localID;
            compID = order[i].compID;
            inputs = order[i].inputs;
            outputs = order[i].outputs;
            layerID = order[i].layerID;

            isValid = true;
            // func1; // the function for each component
            // check if input component
            if(compID == 0){
                let traceURL = null; // file path for the data file
                for(let i = 0; i<inputData.length; i++){
                    if(localID == inputData[i].inputID && frameID == inputData[i].frameID ){ // also check if if on the same frame
                        traceURL = inputData[i].traceURL;
                        break;
                    }// default trace
                }
                if (traceURL == null){
                    dataIn = [
                        [1,2,3,4,5,6,7,8,9,10,11,12],
                        [1,2,3,4,5,6,7,8,9,10,11,12]
                    ]
                }
                else{ // load input datafrom files
                    dataIn = DataReader.readInputData(traceURL);
                }
                validInfo = "Validation Information Input";
                func1 = computation.componentFunctionSelector(compID);
            }

            if(compID != 0 && compID != 1){
                // console.log("inside components");
                dataIn = [];
                // console.log(inputs[0]);
                let inputSource = [];

                for(let i=0; i<inputs.length; i++){
                    inputSource.push(Number(inputs[i].local_id));
                }
                for(let j=0; j<inputSource.length; j++){
                    for(let i=0; i<resultTable.length;i++){
                        if(inputSource[j] == resultTable[i].localID){ // only check the first input now
                            dataIn.push(resultTable[i].outputData); // [0] store validation // removed validation
                            // console.log("data source for the component");
                            // console.log(dataIn);
                        }
                    }    
                }
                
                validInfo = "Validation Information Comp";

                let testResult = Validtor.sameLength(dataIn);;
                if(testResult == false){
                    validInfo = "The inputs data do not have the same length!"
                    isValid = false;
                }

                func1 = computation.componentFunctionSelector(compID);
            }
            // check if output component
            if(compID == 1){
                // console.log("reach output");
                // let dataIn;
                let inputSource = Number(inputs[0].local_id);
                for(let i=0; i<resultTable.length;i++){
                    if(inputSource == resultTable[i].localID){
                        dataIn = resultTable[i].outputData; // one is the validation
                    }
                }

                validInfo = "Validation Information Output";
                // console.log("data in for output");
                // console.log(dataIn);
                func1 = computation.componentFunctionSelector(compID);
            }

            dataOut = func1(dataIn);

                record = {
                    localID: localID,
                    compID: compID,
                    outputData: dataOut,
                    validInfo: validInfo,
                    isValid: isValid,
                    layerID: layerID
                };
                resultTable.push(record);
            
        }
        // console.log(resultTable);
        return resultTable;
    },
    buildOrder: function(model){
        let orderList = [];
        for(let i=0; i<model.list.length;i++){
            for(let j=0; j<model.list[i].list.length;j++){
                orderList.push(model.list[i].list[j]);
            }
        }
        return orderList;
    },
    buildModel: function(componentsOnWorkflow){
        let markedList = [];

        for(let i=0; i<componentsOnWorkflow.length; i++ ){
            markedList.push(1);
        }

        var model = new LayerModel();
        let list;
        let layerID = 0;
        //this.createOutputLayer(componentsOnWorkflow,layerID);
        

        model.append(new Layer(layerID));


        layerID = layerID + 1;
        list = [];
        for(let i=0; i<componentsOnWorkflow.length; i++ ){
            if(componentsOnWorkflow[i].id == 0 && markedList[i] == 1){ // select all input components
                let localID = Number(componentsOnWorkflow[i].local_id);
                let compID = Number(componentsOnWorkflow[i].id);
                let inputs = componentsOnWorkflow[i].inputs;
                let outputs = componentsOnWorkflow[i].outputs;
                list.push(new CompInfo(localID,compID,inputs,outputs,layerID));
                markedList[i] = 0;
            }
        }
        //console.log(markedList);

        model.append(new Layer(layerID,list));

        // add layer for components
        list = [];
        while(1){

            let compList = []
            
            layerID = layerID + 1;
            
            for(let i=0; i<componentsOnWorkflow.length; i++ ){
                if(componentsOnWorkflow[i].id != 0 && componentsOnWorkflow[i].id != 1 && markedList[i] == 1){ // select all input components
                    let localID = Number(componentsOnWorkflow[i].local_id);
                    let compID = Number(componentsOnWorkflow[i].id);
                    let inputs = componentsOnWorkflow[i].inputs;
                    let outputs = componentsOnWorkflow[i].outputs;

                    let flag = 0;
                    for(let j=0; j<inputs.length; j++){
                        if(inputs[j].local_id == null)break; // check if local_id is null
                        let inputLocalID = Number(inputs[j].local_id); 
                        // console.log(typeof(inputLocalID));
                        for(let k=0; k<componentsOnWorkflow.length; k++ ){
                            // console.log(typeof(componentsOnWorkflow[k].local_id));
                            // console.log(componentsOnWorkflow[k].local_id);
                            // console.log(inputLocalID);
                            if(Number(componentsOnWorkflow[k].local_id) == inputLocalID){
                                // console.log('find match local ID');
                                if(markedList[k] == 0){ //dependency on the previous layer
                                    flag += 1;
                                    break;
                                }
                            }
                        }
                    }
                    // console.log('flag:+++')
                    // console.log(flag);
                    if(flag == inputs.length){ // smaller means not all dependent input on the previous layers
                        list.push(new CompInfo(localID,compID,inputs,outputs,layerID));
                        //markedList[i] = 0; // change at the nd not here
                        compList.push(i); // record the id
                        // console.log("add layer Comp");
                        // console.log(list.length);
                        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
                    }

                    
                }
                
            }
            // console.log('list length is');
            // console.log(list.length);
            if(list.length == 0){
                layerID = layerID - 1;
                list = [];
                break;
            }
            else{
                // console.log('add component layer!!!!');
                model.append(new Layer(layerID,list));
                for(let i=0; i<compList.length; i++){
                    markedList[compList[i]] = 0;
                }
                list = [];
            }
            
        }

        // console.log(markedList);
        
        layerID = layerID + 1;

        list = [];

        for(let i=0; i<componentsOnWorkflow.length; i++ ){
            if(componentsOnWorkflow[i].id == 1 && markedList[i] == 1){ // select all output components
                let localID = Number(componentsOnWorkflow[i].local_id);
                let compID = Number(componentsOnWorkflow[i].id);
                let inputs = componentsOnWorkflow[i].inputs;
                let outputs = componentsOnWorkflow[i].outputs;

                //check if dependencies not satisfied // check inputs
                // console.log(inputs);
                list.push(new CompInfo(localID,compID,inputs,outputs,layerID));
                markedList[i] = 0;

                
            }
        }

        // console.log(markedList);
        model.append(new Layer(layerID,list));
        return model;  
        
    }
}

// class for layered model
class CompInfo{
    constructor(localID,compID,inputs,outputs,layerID){
        this.localID = localID;
        this.compID = compID;
        this.inputs = inputs;
        this.outputs = outputs;
        this.layerID = layerID;
    }
    display(){
        console.log(this);
    }
}

class Layer{
    constructor(id,list=[]){
        this.id = id;
        this.list = list;
    }
    append(item){
        this.list.push(item);
    }
    display(){
        console.log(this);
    }
}

class LayerModel{
    constructor(){
        this.list = [];
    }
    append(item){
        this.list.push(item);
    }
    display(){
        console.log(this);
    }
}