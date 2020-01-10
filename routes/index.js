// start server with: SET DEBUG=hyperdap:* & npm run devstart

const express = require('express');
const router = express.Router();

//load customized modules
const DBConnector = require('../modules/DB-Connector');
const Compatibility = require('../modules/Compatibility');
const Computation = require('../modules/Computation');
const DataReader = require('../modules/Data-Reader');
const Authenticator = require('../modules/UserAuthentication');

var validPaths;
var inputData = []; // store the ID of input data

var result = []; // storing result on the server // multi-tab support


// class definition

class resultRecord{
    constructor(frameID, result){
        this.frameID = frameID;
        this.result = result;
    }
}

//routes
router.get('/workflow-frame',function(req,res, next){
    if(req.session.userID == null){res.redirect('/login');}
    res.render('workflow', { title: 'Error', locnum: "error" });
});

router.post('/check_workflowname_save', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');}
    // check if workflow_name exist in the database when saving the workflow
    // console.log(req.body[0]); // console log the  message
    let workflowName = req.body[0];

    let nameExist = await DBConnector.checkUsernameSave(workflowName);

    res.send(nameExist);
    
});

// get all outputs result in the frame
router.post('/get_output_result_data', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');}
    //let result = DataReader.readLocalData('const.ddf');
    // let result = DataReader.readInputData('G8-DTS/G8_DTS-01Jan2018-003415.las'); //
    //console.log(result);
    if(result == []){ // result table still empty
        res.send("result not existed!!!!!");
    }
    // let localID = req.body[0];
    let frameID = req.body[0]; // only have frameID

    let userID = req.session.userID;
    await Authenticator.insertLog(userID,`request all output result data, frame ID:${frameID}.`);
    // console.log("component local ID is");
    // console.log(localID);
    // console.log("frame ID is");
    // console.log(frameID);
    let frameResultExist = false;
    let frameIndex = null
    for(let i=0; i<result.length; i++){
        if(result[i].frameID == frameID){
            frameResultExist = true;
            frameIndex = i;
            break;
        }
    }
    if(frameResultExist == false){
        res.send("result not existed!!!!!");
    }
    else{
        let resultRecord = result[frameIndex].result;
        // let resultIndex = null;
        let resultIndex = [];
        for(let i = 0; i<resultRecord.length; i++){
            // console.log();
            if(resultRecord[i].compID == 1){ // if result is 
                resultIndex.push(i);
                // debug

                // break;
            }
        }
        // console.log("response index is:");
        // console.log(resultIndex);
        let response;
        if(resultIndex == []){
            response = "result not existed!!!!!"
        }
        else{
            // add multiple chain supportor
            let colourSet = ["blue","red","green","gold","Magenta","Black","LightSlateGray"];

            //xArray from the first output
            let xArray = resultRecord[resultIndex[0]].outputData[0];
            let yArray;
            let returnVal = [];
            // visit all output components
            for(let j=0;j<resultIndex.length; j++){
                yArray = resultRecord[resultIndex[j]].outputData[1]; // only the first output channel

                // console.log(resultIndex[j]);

                let colourSetIndex;
                // i not define here, show loop over the result index
                if(j>(colourSet.length-1)){
                    colourSetIndex = j%(colourSet.length); 
                }
                else{
                    colourSetIndex = j;
                }

                let lineObject = {
                    x:xArray,
                    y:yArray,
                    line: {
                        color: colourSet[colourSetIndex],
                        width: 1
                        }
                };
                returnVal.unshift(lineObject);

            } 
            let xLabel = "";
            let yLabel = "";
            response = {data: returnVal, title:"Data Title", xLabel: xLabel, yLabel: yLabel  };
        }
        res.send(response);
    }
});


router.post('/get_result_data', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');}
    //let result = DataReader.readLocalData('const.ddf');
    // let result = DataReader.readInputData('G8-DTS/G8_DTS-01Jan2018-003415.las'); //
    //console.log(result);
    if(result == []){ // result table still empty
        res.send("result not existed!!!!!");
    }
    let localID = req.body[0];
    let frameID = req.body[1];

    let userID = req.session.userID;
    await Authenticator.insertLog(userID,`request result data, component local ID:${localID}, frame ID:${frameID}.`);
    // console.log("component local ID is");
    // console.log(localID);
    // console.log("frame ID is");
    // console.log(frameID);
    let frameResultExist = false;
    let frameIndex = null
    for(let i=0; i<result.length; i++){
        if(result[i].frameID == frameID){
            frameResultExist = true;
            frameIndex = i;
            break;
        }
    }
    if(frameResultExist == false){
        res.send("result not existed!!!!!");
    }
    else{
        let resultRecord = result[frameIndex].result;
        let resultIndex = null;
        for(let i = 0; i<resultRecord.length; i++){
            if(resultRecord[i].localID == localID){
                resultIndex = i;
                break;
            }
        }
        // console.log("response index is:");
        // console.log(resultIndex);
        let response;
        if(resultIndex == null){
            response = "result not existed!!!!!"
        }
        else{
            // add multiple chain supportor
            let colourSet = ["blue","red","green","gold","Magenta","Black","LightSlateGray"];

            if(resultRecord[resultIndex].compID == 1){ // if there is a output component;
                colourSet = ["blue","white","white","white","white"]; // only show the first channel
            }
            let outputChannel = resultRecord[resultIndex].outputData.length - 1;
            // console.log("Number of Channel!!!");
            // console.log(outputChannel);
            let xArray = resultRecord[resultIndex].outputData[0];
            let returnVal = [];
            for(let i=0;i<outputChannel;i++){
                let yArray = resultRecord[resultIndex].outputData[i+1]; 
                let colourSetIndex;
                if(i>(colourSet.length-1)){
                    colourSetIndex = i%(colourSet.length); 
                }
                else{
                    colourSetIndex = i;
                }
                let lineObject = {
                    x:xArray,
                    y:yArray,
                    line: {
                        color: colourSet[colourSetIndex],
                        width: 1
                        }
                    };
                returnVal.unshift(lineObject);
            }
            let xLabel = "";
            let yLabel = "";
            response = {data: returnVal, title:"Data Title", xLabel: xLabel, yLabel: yLabel  };
        }
        res.send(response);
    }
});

// router.post('/adminlogin', async function(req, res, next) {
//     let userID = req.body.username;
//     let password = req.body.password;

//     if(userID != "HDtest"){
//         console.log("User is not an Administrator");
//         res.redirect('/adminlogin');
//     }
//     else{
//         let isValid = await Authenticator.checkPassword(userID,password);
//         console.log(isValid);
//         if(isValid){
//             // insert new log
//             await Authenticator.insertLog(userID,"login succesfully!!");
//             req.session.userID = userID;
//             req.session.admin = true;

//             res.redirect('/admin');
//         }
//         else{
//             res.redirect('/adminlogin');
//         }
//     }  
// });

// router.get('/adminlogin', async function(req, res, next) {
//     res.render("adminlogin");   
// });

// router.post('/adminlogout', async function(req, res, next) {
//     // console.log("log out!!!!!! cleaning session!!!");
//     let userID = req.session.userID;
//     await Authenticator.insertLog(userID,"admin logout succesfully!!");
//     req.session.destroy();

//     res.redirect('/login');   
// });

router.get('/admin', async function(req, res, next) {
    if(req.session.admin != null && req.session.admin == true){
        // short circuit validation, check if admin exist first
        let logResult = await DBConnector.fetchUserLog(1,20); // default all user last 20 records
        // console.log(logResult);

        // get all userID
        let userIDList = await DBConnector.getUserIDList();

        // res.render("admin", {
        //     logResult: logResult,
        //     userIDList: userIDList
        // });

        let isAdmin;
        if(req.session.admin != null && req.session.admin == true){
            isAdmin = true;
        }
        else{
            isAdmin = false;
        }

        res.render('admin', {
            title: 'Administrator Control Panel',
            logResult: logResult,
            userIDList: userIDList,
            userID: req.session.userID,
            isAdmin: isAdmin
        });
    } 
    else{
        res.render("login",{message: "Please login as administrator!"}); 
    }
});

router.post('/admin_filter', async function(req, res, next) {
    if(req.session.userID == null || req.session.admin == null || req.session.admin == false){res.redirect('/login');return;}
    // filter logs
    // console.log(req.body[0]);
    // console.log(req.body[1]);
    // console.log(req.body[2]);
    // console.log(req.body[3]);

    let userID = req.body[0];
    let logNum = req.body[1];
    let orderBy = req.body[2];
    let desc = req.body[3];

    if(logNum == "")logNum = 0;
    if(userID == null)userID = 1; // integer 1 means selecting all user

    let logResult = await DBConnector.fetchUserLog(userID,logNum,orderBy,desc);

    res.send(logResult);  
});


router.post('/login', async function(req, res, next) {

    // clean old session when login
    // req.session.destroy();

    let userID = req.body.username;
    let password = req.body.password;

    let isValid = await Authenticator.checkPassword(userID,password);
    // console.log(isValid);
    if(isValid){
        // insert new log
        await Authenticator.insertLog(userID,"login succesfully!!");

        req.session.userID = userID;

        // check if admin
        let isAdmin = await Authenticator.isAdmin(userID);

        // console.log("check if login user ADMIN?");
        // console.log(isAdmin);

        if(isAdmin){

            await Authenticator.insertLog(userID,"Admin login!!!");
            req.session.admin = true;
        }
        else{
            req.session.admin = false;
        }

        res.redirect('/');
    }
    else{
        //res.redirect('/login');
        res.render("login",{message: "User name or password is invalid!!! Please try again!"}); 
    }
      
});

router.get('/login', async function(req, res, next) {
    res.render("login");   
});

router.post('/logout', async function(req, res, next) {
    // console.log("log out!!!!!! cleaning session!!!");

    let userID = req.session.userID;

    await Authenticator.insertLog(userID,"logout succesfully!!");
    // clear session
    req.session.destroy();

    res.redirect('/login');   
});

router.post('/add_log', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');return;}
    let userID = req.body[0];
    let action = req.body[1];
    let response = await Authenticator.insertLog(userID,action);
    res.send(response);
});

router.post('/check_login_user', async function(req, res, next) {
    
    if(req.session.userID != null){
        // store login information in the session
        res.send(req.session.userID);
    } 
    else{
        res.send("user not logged in!!!");
    }
});

router.post('/set_password', async function(req, res, next) {
    if(req.session.userID == null || req.session.admin == null || req.session.admin == false){res.redirect('/login');return;}
    let userID = req.body[0];
    let password = req.body[1];
    
    let result = await Authenticator.setPassword(userID,password);
    res.send(result);    
});

router.post('/check_password', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');return;}
    let userID = req.body[0];
    let password = req.body[1];

    // save userID in session
    req.session.userID = userID;

    let result = await Authenticator.checkPassword(userID,password);
    res.send(result);
});


router.post('/read_local_data', function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');return;}
    //let result = DataReader.readLocalData('const.ddf');
    let fileURL = req.body[0];
    let result = DataReader.readLocalData(fileURL); //
    //console.log(result);
    res.send(result);
});

router.get('/get_valid_path',function(req,res, next){
    if(req.session.userID == null){res.redirect('/login');return;}
    res.send(validPaths);
});

router.get('/mocha',function(req,res, next){
    res.render('mocha', { title: 'mocha'});
});

router.post('/read_settings',async function(req,res, next){
    if(req.session.userID == null){res.redirect('/login');return;}
    // console.log(req.body);
    // let userID = req.body[0];

    if(req.session.userID == null){
        res.send("");
        // empty response
    }
    else{
        let userID = req.session.userID;

        await Authenticator.insertLog(userID,"read settings!");

        let result = await DBConnector.readUserSettings(userID);
        res.send(result);
    }
    

    // DBConnector.readUserSettings(userID).then(result=>{
    //     res.send(result);
    // });
    //res.send("a response");
});

router.post('/write_settings',async function(req,res, next){
    if(req.session.userID == null){res.redirect('/login');return;}
    // console.log(req.body);
    if(req.session.userID == null){
        res.send("");
        // empty response
    }
    else{
        // let userID = req.body[0];
        // let settings = req.body[1];
        let settings = req.body[0];
        let userID = req.session.userID;
        await Authenticator.insertLog(userID,"write settings!");

        let result = await DBConnector.writeUserSettings(userID,settings);
        res.send(result);
    }
    

    // DBConnector.writeUserSettings(userID,settings).then(result=>{
    //     res.send(result);
    // });
    //res.send("a response");
});

router.post('/read_input',async function(req,res, next){
    if(req.session.userID == null){res.redirect('/login');return;}
    let inputID = req.body[0];
    let traceURL = req.body[1];
    let frameID = req.body[2];

    // console.log("inputID!!!!!!!!!!!!!!!!!!");
    // console.log(inputID);
    // console.log("traceURL!!!!!!!!!!!!!!!!!!");
    // console.log(traceURL);

    let inputDataOne = {
        inputID: inputID,
        traceURL: traceURL,
        frameID: frameID
    }
    // check if inputID already on the list
    let isSet = false;
    let inputIndex;
    for(let i=0; i<inputData.length; i++){
        if(inputData[i].inputID == inputDataOne.inputID && inputData[i].frameID == inputDataOne.frameID){
            isSet = true;
            inputIndex = i;
            break;
        }
    }

    if(isSet == true){
        // overwrite existing inputdata
        inputData[inputIndex].traceURL = inputDataOne.traceURL;
    }
    else{
        inputData.push(inputDataOne);
    }

    let userID = req.session.userID;
    Authenticator.insertLog(userID,`select the input, inputID:${inputID}, frameID:${frameID}, traceURL:${traceURL}.`);

    // console.log(typeof(inputData));
    // console.log(inputData);
    //inputDaat = req.body[0];
    res.send("server get the trace path of the input data");
    //res.send("a response");
});

router.post('/trace_list', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');return;}
    // let text1 = req.body[0];
    // console.log(text1);

    let result = await DBConnector.readTraceAll();
    res.send(result);

    // DBConnector.readTraceAll().then(result => {
    //     // console.log(result);
    //     res.send(result);
    // });
});

router.post('/computation', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');return;}
    // console.log("show inputData ++++++++++++++++++++++++++");
    // console.log("current frame ID!!!!!!!!!!!!11");
    // console.log(req.body[1]);

    // console log the session
    // console.log("showing session");
    // console.log(req.session.userID);

    let componentsOnWorkflow = req.body[0];
    let frameID = req.body[1];
    let response = Computation.process(componentsOnWorkflow, inputData, frameID);

    let userID = req.session.userID;
    await Authenticator.insertLog(userID,`request computation for frame ${frameID}.`);

    // store result in an server var

    // check the result array first
    let hasFrameResult = false;
    if(result != []){
        for(let i=0; i<result.length;i++){
            if(result[i].frameID == frameID){
                // record existed
                result[i].result = response; // update record
                hasFrameResult = true;
                break;
            }
        }
    }

    if(hasFrameResult == false){
        let resultItem = new resultRecord(frameID,response);
        result.push(resultItem); // add upate existing record later
    }

    // console.log("result table!!!!!!!");
    // console.log(result);
    // result = response;
    // console.log(response);

    res.send(response);

});

router.post('/computation_output', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');return;}
    // console.log("show inputData ++++++++++++++++++++++++++");
    let componentsOnWorkflow = req.body[1];
    let frameID = req.body[2];
    let outputID = req.body[0];
    let response = Computation.process(componentsOnWorkflow, inputData, frameID);

    // store result in an server var
    // result = response;
    // console.log(response);
    let hasFrameResult = false;
    if(result != []){
        for(let i=0; i<result.length;i++){
            if(result[i].frameID == frameID){
                // record existed
                result[i].result = response; // update record
                hasFrameResult = true;
                break;
            }
        }
    }

    if(hasFrameResult == false){
        let resultItem = new resultRecord(frameID,response);
        result.push(resultItem); // add upate existing record later
    }

    let userID = req.session.userID;
    await Authenticator.insertLog(userID,"request computation result for output table!");

    res.send([outputID,response,validPaths]);
});
router.post('/check_compatibility', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');return;}
    // console.log(req.body);
    validPaths = req.body;

    let response = await Compatibility.checkCompatiblity(req.body);
    res.send(response);

    // Compatibility.checkCompatiblity(req.body).then(response => {
    //     res.send(response);
    // });

});

router.post('/workflow_list', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');return;}
    // let text1 = req.body[0];
    // console.log(text1);
    let result = await DBConnector.requestWorkflowList();
    res.send(result);
    // DBConnector.requestWorkflowList().then(result => {
    //     // console.log(result);
    //     res.send(result);
    // });
});


router.post('/delete_workflow', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');return;}
    // console.log("Start loading"); // send back an variable to the client
    // console.log(req.body);
    let workflowID = req.body[0];

    let userID = req.session.userID;
    
    await Authenticator.insertLog(userID,`delete a workflow, workflow ID:${workflowID}. `);

    let result = await DBConnector.deleteWorkflow(workflowID);

    res.send(result);

    // DBConnector.deleteWorkflow(workflowId).then(result => {
    //     //console.log(result);
    //     res.send(result);
    // });
});

router.post('/load_workflow', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');return;}
    // console.log("Start loading"); // send back an variable to the client
    // console.log(req.body);
    let workflowID = req.body[0];

    let userID = req.session.userID;
    await Authenticator.insertLog(userID,`load the workflow, workflow ID:${workflowID}.`);

    let result = await DBConnector.loadWorkflow(workflowID);
    let description = await DBConnector.loadWorkflowDescription(workflowID);
    res.send([result,description]);

    // DBConnector.loadWorkflow(workflowId).then(result => {
    //     //console.log(result);
    //     res.send(result);
    // });
});
router.post('/save_workflow', async function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');return;}
    let workflowName = req.body.workflowName;
    let workflowDescription = req.body.workflowDescription;
    let userID = req.session.userID;
    var workflowComponents = req.body.array;
    // console.log(workflowComponents);
    // console.log("getting description");
    // console.log(workflowDescription);

    let workflowID = await DBConnector.getWorkflowID(workflowName);
    let message;
    if(workflowID == "New Workflow"){
        let lastWorkflow = await DBConnector.getLastWorkflow();
        let newWorkflowID = await DBConnector.createWorkflow(workflowName,lastWorkflow,workflowDescription);
        let lastRecord = await DBConnector.getLastWorkflowComponent();
        message = await DBConnector.saveWorkflow(newWorkflowID,workflowComponents,lastRecord);
    }
    else{
        // workflow already existed
        await DBConnector.cleanBeforeSaveWorkflow(workflowID);
        await DBConnector.updateWorkflowDescription(workflowID,workflowDescription);
        let lastRecord = await DBConnector.getLastWorkflowComponent();
        message = await DBConnector.saveWorkflow(workflowID,workflowComponents,lastRecord);
    }

    Authenticator.insertLog(userID,`save the workflow, workflow name:${workflowName}.`);
    res.send(message);


    // DBConnector.getWorkflowId(workflowName).then(workflowId => {
    //     if(workflowId == "New Workflow"){ // there is the new workflow
    //         DBConnector.getLastWorkflow().then(lastWorkflow =>{
    //             console.log(lastWorkflow);
    //             DBConnector.createWorkflow(workflowName,lastWorkflow).then(newWorkflowId => {
    //                 console.log(newWorkflowId);
    //                 DBConnector.getLastWorkflowComponent().then(lastRecord => {
    //                     console.log(lastRecord);
    //                     DBConnector.saveWorkflow(newWorkflowId,workflowComponents,lastRecord).then(message=>{
    //                         res.send(message);
    //                     });

    //                 });
    //             });
    //         });

    //     }
    //     else{ // workflow already existed
    //         DBConnector.cleanBeforeSaveWorkflow(workflowId).then(result => {
    //             DBConnector.getLastWorkflowComponent().then(lastRecord => {
    //                 DBConnector.saveWorkflow(workflowId,workflowComponents,lastRecord).then(message=>{
    //                     res.send(message);
    //                 });
    //             });
    //         });
    //     }
    // });
});
router.get('/', function(req, res, next) {
    DBConnector.loadComponents().then(result=>{
        if(req.session.userID == null){
            // store login information in the session
            res.redirect('/login');
        }
        else{
            let isAdmin;
            if(req.session.admin != null && req.session.admin == true){
                isAdmin = true;
            }
            else{
                isAdmin = false;
            }

            let componentList = []
            for(let i=0; i < result.length; i++){
                let compID = result[i].component_id;
                let compName = result[i].component_name;
                let compDescription = result[i].component_description;
                let compInputCount = result[i].input_count;
                let compItem = {
                    id: compID,
                    name: compName,
                    description: compDescription,
                    inputCount: compInputCount
                }
                componentList.push(compItem);
            }
            res.render('hyperdap', {
                title: 'HyperDAP',
                componentList: componentList,
                userID: req.session.userID,
                isAdmin: isAdmin
            });
        } 
    });
});

router.get('/help', function(req, res, next) {
    if(req.session.userID == null){res.redirect('/login');return;}

    let isAdmin;
    if(req.session.admin != null && req.session.admin == true){
        isAdmin = true;
    }
    else{
        isAdmin = false;
    }

    res.render('help', {
        title: 'User Manual',
        userID: req.session.userID,
        isAdmin: isAdmin
    });

    // res.render('help', {
    //     title: 'Help'
    // });

});

module.exports = router;

