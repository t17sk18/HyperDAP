/*
Module for all database connections

Function list:

checkUsernameSave: async function(workflowName)
checkIfAdmin: async function(userID)
getUserIDList: async function()
fetchUserLog: async function(userID, logNum, orderBy, desc = "DESC")
getLastLogID: async function()
insertLog: async function(logID, userID, action, logDateTime)
setUserPassword: async function(userID,password)
getPasswordHash: async function(userID)
readUserSettings: async function(userID)
writeUserSettings: async function(userID,settings)
readTraceAll: async function()
getCompatibility: async function(inputComponent, outputComponent)
requestWorkflowList: async function ()
loadComponents: async function ()
cleanBeforeSaveWorkflow: async function (workflowID)
saveWorkflow: async function (workflowID, workflowComponents,lastRecord)
getWorkflowID: async function(workflowName)
deleteWorkflow: async function(workflowID)
loadWorkflowDescription: async function(workflowID)
loadWorkflow: async function(workflowID)
getLastWorkflowComponent: async function()
getLastWorkflow: async function()
updateWorkflowDescription: async function(workflowID, workflowDescription)
createWorkflow: async function(newWorkflow,lastRecord,workflowDescription = "test")


Exception needed
*/

const pg = require('pg');

// /* // local DB settings

const pool = new pg.Pool({
    user: 'TeamAlpha',
    host: 'localhost',
    database: 'hyperdap',
    password: 'teamalpha',
    port: '5432'
});

// */ // local DB settings end

// add setting for heroku db

/* // heroku DB settings

const pool = new pg.Pool({
    user: 'foxgexmqdafqnk',
    host: 'ec2-54-83-9-36.compute-1.amazonaws.com',
    database: 'd6q1681rcp04fs',
    password: '057f6b8fd673df27825a9c844d537d6e899b5fd235a231af9f89017d8c681bcc',
    port: '5432',
    ssl: true
});

*/ // heroku DB settings end

// DB setting end

var connector = module.exports = {
    checkUsernameSave: async function(workflowName){
        let checkUsernameSaveQuery = `SELECT * FROM workflow WHERE workflow_name = '${workflowName}'`;
        // console.log(checkUsernameSaveQuery);

        let returnVal = new Promise(function(resolve, reject) {
            // Do async job
            pool.query(checkUsernameSaveQuery, (err, result) => {
                if (err)
                {
                    resolve(false);
                }
                else
                {
                    if(result.rows.length == 0){ // empty result
                        resolve(false);
                    }
                    else{
                        resolve(true);
                    }
                    
                }
            });
        });
        return await returnVal;

    },
    checkIfAdmin: async function(userID){
        let checkIfAdminQuery = `SELECT privilege FROM user_table WHERE user_id = '${userID}';`;
        // console.log(checkIfAdminQuery);

        let returnVal = new Promise(function(resolve, reject) {
            // Do async job
            pool.query(checkIfAdminQuery, (err, result) => {
                if (err)
                {
                    resolve(err);
                }
                else
                {
                    if(result.rows.length == 0){ // empty result
                        resolve(false);
                    }
                    else{
                        resolve(result.rows[0].privilege);
                    }
                    

                }
            });
        });
        return await returnVal;

    },
    getUserIDList: async function(){
        // return the whole list of user ID
        let getUserIDListQuery = `SELECT user_id FROM user_table;`;
       
        let returnVal = new Promise(function(resolve, reject) {
            // Do async job
            pool.query(getUserIDListQuery, (err, result) => {
                if (err)
                {
                    resolve(err);
                }
                else
                {
                    resolve(result.rows);

                }
            });
        });
        return await returnVal;
    },
    fetchUserLog: async function(userID, logNum, orderBy, desc = "DESC"){
        if(orderBy == null){
            orderBy = "log_datetime";
        }
        let fetchUserLogQuery;
        if(userID == 1){
            fetchUserLogQuery = `SELECT * FROM log_table ORDER BY log_datetime DESC limit ${logNum};`;
        }
        else{
            // add support to case-insensitive search
            let userIDLowCase = userID.toLowerCase();
            fetchUserLogQuery = `SELECT * FROM log_table WHERE LOWER(user_id) LIKE '%${userIDLowCase}%' ORDER BY ${orderBy} ${desc} limit ${logNum};`;
        }
        let returnVal = new Promise(function(resolve, reject) {
            // Do async job
            pool.query(fetchUserLogQuery, (err, result) => {
                if (err)
                {
                    resolve(err);
                }
                else
                {
                    resolve(result.rows);

                }
            });
        });
        return await returnVal;
    },
    getLastLogID: async function(){
        let getLastLogIDQuery = "SELECT * FROM log_table ORDER BY log_id DESC limit 1;"
        let returnVal = new Promise(function(resolve, reject) {
            // Do async job
            pool.query(getLastLogIDQuery, (err, result) => {
                if (err)
                {
                    resolve(err);
                }
                else
                {
                    let lastRecord;
                    if(result.rows[0]!= null){
                        lastRecord = result.rows[0].log_id;
                    }
                    else{
                        lastRecord = null; // not log
                    }
                    resolve(lastRecord);

                }
            });
        });
        return await returnVal;
    },
    insertLog: async function(logID, userID, action, logDateTime){
        let insertLogQuery = `INSERT INTO log_table (log_id, user_id, action, log_datetime) VALUES 
            ( ${logID}, '${userID}', '${action}', '${logDateTime}' )
            ;`;

        let returnVal =  new Promise(function(resolve,reject){
            pool.query(insertLogQuery, (err, result) => {
                if (err)
                {
                    // console.log("error!")
                    resolve(err);
                    //resolve("New Workflow");
                }
                else
                {
                    resolve("add a record in log!!!!!!");
                }
            });
        });
        return await returnVal;
    },
    setUserPassword: async function(userID,password){
        // console.log(password);
        // let checkUserPasswordQuery = `SELECT * FROM user_table WHERE user_id = '${userID}' AND password = '${password}' ;`;
        let setUserPasswordQuery = `UPDATE user_table SET password = '${password}' WHERE user_id = '${userID}';`;

        // console.log(setUserPasswordQuery);

        let returnVal =  new Promise(function(resolve,reject){
            pool.query(setUserPasswordQuery, (err, result) => {
                if (err)
                {
                    // console.log("error!")
                    resolve(err);
                    //resolve("New Workflow");
                }
                else
                {
                    resolve("update the password!");
                }
            });
        });
        return await returnVal;
    },
    getPasswordHash: async function(userID){
        let getPasswordHashQuery = `SELECT password FROM user_table WHERE user_id = '${userID}' ;`;

        let returnVal =  new Promise(function(resolve,reject){
            pool.query(getPasswordHashQuery, (err, result) => {
                if (err)
                {
                    // console.log("error!")
                    resolve(err);
                    //resolve("New Workflow");
                }
                else
                {
                    if(result.rows.length == 0){
                        // empty result
                        resolve("no result!");
                    }
                    else{
                        resolve(result.rows[0].password);
                    }
                

                }
            });
        });
        return await returnVal;
    },
    readUserSettings: async function(userID){
        
        let readUserSettingsQuery = `SELECT preference FROM user_table WHERE user_id = '${userID}';`;

        let returnVal =  new Promise(function(resolve,reject){
            pool.query(readUserSettingsQuery, (err, result) => {

                if (err)
                {
                    // console.log("error!")
                    resolve(err);

                }
                else
                {
                    // console.log(result.rows[0]);
                    // console.log(result.rows)
                    resolve(result.rows[0].preference);
                }
            });
        });

        return await returnVal;
    },
    writeUserSettings: async function(userID,settings){
        
        let writeUserSettingsQuery = `UPDATE user_table SET preference = '${settings}' where user_id = '${userID}';`;
        // resume
        // console.log(getWorkflowIdQuery);

        let returnVal =  new Promise(function(resolve,reject){
            pool.query(writeUserSettingsQuery, (err, result) => {
                if (err)
                {
                    // console.log("error!")
                    resolve(err);
                    //resolve("New Workflow");
                }
                else
                {
                    // console.log(result.rows[0]);
                    // console.log("Found the workflow ID")

                    resolve("save settings!!!");


                }
            });
        });

        return await returnVal;
    },
    readTraceAll: async function(){
        
        let readTraceQuery = `SELECT * FROM traces;`;
        // resume
        // console.log(getWorkflowIdQuery);

        let returnVal =  new Promise(function(resolve,reject){
            pool.query(readTraceQuery, (err, result) => {
                if (err)
                {
                    // console.log("error!")
                    resolve(err);
                    //resolve("New Workflow");
                }
                else
                {
                    // console.log(result.rows[0]);
                    // console.log("Found the workflow ID")

                    resolve(result.rows);


                }
            });
        });

        return await returnVal;
    },
    getCompatibility: async function(inputComponent, outputComponent){
        

        // type check of the arguments
        // let typeArgument;
        // if(typeof(inputComponent)!="number"){
        //     return "Component ID should be an integer";
        // }
        try{
            if(typeof(inputComponent)!="number"){
                throw "Component ID should be an integer";
            }
            else if(Number.isInteger(inputComponent)==false){
                throw "Component ID should be an integer";
            }
            else if(inputComponent < 0){
                throw "Component ID should not be smaller than 0";
            }
            else if(typeof(outputComponent)!="number"){
                throw "Component ID should be an integer";
            }
            else if(Number.isInteger(outputComponent)==false){
                throw "Component ID should be an integer";
            }
            else if(outputComponent < 0){
                throw "Component ID should not be smaller than 0";
            }
        }
        catch(error){
            console.log(error);
            return error;
        }
        let queryCompatibility = `SELECT * FROM compatibility WHERE input_component = ${inputComponent} AND 
        output_component = ${outputComponent};`;
        // console.log(queryCompatibility);
        let returnVal =  new Promise(function(resolve,reject){
            pool.query(queryCompatibility, (err, result) => {
                if (err) {
                    // console.log("error!")
                    resolve(err);
                } 
                else {

                    let isCompatible;
                    // console.log(result.rows.length);
                    if(result.rows.length == 0){
                        isCompatible = false;
                    }
                    else{
                        isCompatible = true;
                    }
                    resolve(isCompatible);

                }
            });

        });
        return await returnVal;

    },
    requestWorkflowList: async function (){

        let queryAllWorkflows = `SELECT * FROM workflow;`;

        let workflowList = [];

        let returnVal = new Promise(function(resolve,reject){
            pool.query(queryAllWorkflows, (err, result) => {
                if (err) {
                    // console.log("error!")
                    resolve(err);
                } 
                else {

                    // console.log("Getting workflows from databases!")

                    for(let i=0; i < result.rows.length; i++){
                        let newWorkflow = {
                            workflowId: result.rows[i].workflow_id,
                            workflowName: result.rows[i].workflow_name,
                            workflowDescription: result.rows[i].workflow_description
                        }
                        workflowList.push(newWorkflow);
                    }

                    // console.log(workflowList);
                    resolve(workflowList);

                }
            });

        });

        return await returnVal;
    },
    loadComponents: async function (){

        let queryAllComponents = `SELECT * FROM component;`;

        let returnVal = new Promise(function(resolve,reject){
            pool.query(queryAllComponents, (err, result) => {
                if (err) {
                    // console.log("error!")
                    resolve(err);
                } 
                else {
                    let componentList = result.rows;
                    resolve(componentList);
                }
            });

        });

        return await returnVal;
    },
    cleanBeforeSaveWorkflow: async function (workflowID){
        // check the workflowID argument
        try{
            if(typeof(workflowID)!="number"){
                throw "Workflow ID should be an integer";
            }
            else if(Number.isInteger(workflowID)==false){
                throw "Workflow ID should be an integer";
            }
            else if(workflowID < 0){
                throw "Workflow ID should not be smaller than 0";
            }
        }
        catch(error){
            console.log(error);
            return error;
        }

        let returnVal = new Promise(function(resolve,reject){

            let cleanQuery = `DELETE FROM workflow_component WHERE workflow_id = ${workflowID};`;

            // let cleanQuery = "DELETE FROM workflow_component WHERE workflow_id = " + "\'" + workflowId + "\'" + ";";
            // console.log(cleanQuery);

            pool.query(cleanQuery, (err, result) => {
                if (err) {
                    // console.log("error!")
                    resolve(err);
                } else {

                    // console.log("Empty old records in database!")
                    resolve("Empty old records in database!");

                }
            });

        });

        return await returnVal;
    },
    saveWorkflow: async function (workflowID, workflowComponents,lastRecord){

        try{
            //check lastRecord
            if(lastRecord == null){
                //null is an acceptable input
            }
            else if(typeof(lastRecord)!="number"){
                throw "Last record should be an integer";
            }
            else if(Number.isInteger(lastRecord)==false){
                throw "Last record should be an integer";
            }
            else if(lastRecord < 0){
                throw "Last record should not be smaller than 0";
            }

            //check workflowID
            if(typeof(workflowID)!="number"){
                throw "Workflow ID should be an integer";
            }
            else if(Number.isInteger(workflowID)==false){
                throw "Workflow ID should be an integer";
            }
            else if(workflowID < 0){
                throw "Workflow ID should not be smaller than 0";
            }

            //check workflowComponents
            if(typeof(workflowComponents)!="object"){
                throw "Workflow components should be an object";
                
            }
            else if(workflowComponents[0] != null){
                let keysList = Object.keys(workflowComponents[0]);
                if(keysList[0] != 'localId'){
                    throw "The 1st key in the component array should be localID";
                }
                if(keysList[1] != 'componentId'){
                    throw "The 2nd key in the component array should be componentId";
                }
                if(keysList[2] != 'transform'){
                    throw "The 3rd key in the component array should be transform";
                }
                if(keysList[3] != 'inputComponents'){
                    throw "The 4th key in the component array should be inputComponents";
                }
                if(keysList[4] != 'outputComponents'){
                    throw "The 5th key in the component array should be outputComponents";
                }
            }
            
        }
        catch(error){
            console.log(error);
            return error;
        }

        let returnVal = new Promise(function(resolve,reject){

            let ID;
            if(lastRecord != null){
                ID = lastRecord + 1;
            }
            else{
                ID = 0;
            }
            let saveQuery = `INSERT INTO workflow_component (id , local_id, workflow_id, component_id, transform, input_components, output_components) VALUES `;

            // console.log(saveQuery);

            let first = 0; // flag for the first results

            for (i in workflowComponents) {
                if (workflowComponents[i].componentId != null) {

                    if (first != 0) {
                        saveQuery += " , ";
                    } else {
                        first = 1;
                    }
                    saveQuery += `( ${ID}, ${workflowComponents[i].localId}, ${workflowID}, ${workflowComponents[i].componentId}, '${workflowComponents[i].transform}', 
                        '${JSON.stringify(workflowComponents[i].inputComponents)}', '${JSON.stringify(workflowComponents[i].outputComponents)}' )`;

                    // saveQuery += " ( " + ID + " , " +  workflowComponents[i].localId +  " , " + workflowId +  " , "  +  workflowComponents[i].componentId +  " , " + "\'" + workflowComponents[i].transform + "\'" + " , "
                    //     + "\'" + JSON.stringify(workflowComponents[i].inputComponents)  + "\'" + " , "  + "\'" + JSON.stringify(workflowComponents[i].outputComponents)  + "\'" + " ) ";

                    ID++;
                }
            }
            saveQuery += ` ; `;

            // console.log(saveQuery);

            // var save_query = "INSERT INTO workflow_component (workflow_id, component_position, component_id) VALUES "
            // + "('WF001', 1, 'comp1'),(d'WF001', 2, 'comp2'),('WF001', 3, 'comp6'),('WF001', 4, 'comp11') ;";

            pool.query(saveQuery, (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve("Save to the database!")
                }
            });

        });

        return await returnVal;
    },
    getWorkflowID: async function(workflowName){
        // check argument workflowName
        try{
            if(typeof(workflowName)!="string"){
                throw "Workflow Name should be an string";
            }
        }
        catch(error){
            console.log(error);
            return error;
        }

        let getWorkflowIDQuery = `SELECT workflow_id FROM workflow WHERE workflow_name = '${workflowName}';`;

        // let getWorkflowIDQuery = "SELECT workflow_id FROM workflow WHERE workflow_name = " + "\'" + workflowName + "\'" + ";";
        let workflowID;
        // console.log(getWorkflowIdQuery);

        let returnVal = new Promise(function(resolve,reject){
            pool.query(getWorkflowIDQuery, (err, result) => {
                if (err)
                {
                    // console.log("error!")
                    //reject(err);
                    resolve("New Workflow");
                }
                else
                {
                    // console.log(result.rows[0]);
                    // console.log("Found the workflow ID")

                    if(result.rows[0] == null){
                        resolve("New Workflow");
                    }
                    else{
                        workflowID = result.rows[0].workflow_id;
                        // console.log(workflowId);
                        resolve(workflowID);
                    }


                }
            });
        });
        return await returnVal;
    },
    deleteWorkflow: async function(workflowID){
        // check the workflowID argument
        try{
            if(typeof(workflowID)!="number"){
                throw "Workflow ID should be an integer";
            }
            else if(Number.isInteger(workflowID)==false){
                throw "Workflow ID should be an integer";
            }
            else if(workflowID < 0){
                throw "Workflow ID should not be smaller than 0";
            }
        }
        catch(error){
            console.log(error);
            return error;
        }

        let deleteQuery = `DELETE FROM workflow_component WHERE workflow_id = ${workflowID}; DELETE FROM workflow WHERE workflow_id = ${workflowID}; `;
        // console.log(loadQuery);

        let returnVal = new Promise(function(resolve,reject){
            pool.query(deleteQuery, (err, result) => {
                if (err)
                {
                    // console.log("error!")
                    resolve(err);
                }
                else
                {
                    //console.log(result.rows)
                    let message = "Deleted workflow!!!"
                    resolve(message);

                }
            });
        });

        return await returnVal;
    },
    loadWorkflowDescription: async function(workflowID){
        // return the whole list of user ID
        let loadWorkflowDescriptionQuery = `SELECT workflow_description FROM workflow WHERE workflow_id = '${workflowID}';`;
        // console.log(loadWorkflowDescriptionQuery);

        let returnVal = new Promise(function(resolve, reject) {
            // Do async job
            pool.query(loadWorkflowDescriptionQuery, (err, result) => {
                if (err)
                {
                    resolve(err);
                }
                else
                {
                    resolve(result.rows[0].workflow_description);

                }
            });
        });
        return await returnVal;
    },
    loadWorkflow: async function(workflowID){
            // check the workflowID argument
            try{
                if(typeof(workflowID)!="number"){
                    throw "Workflow ID should be an integer";
                }
                else if(Number.isInteger(workflowID)==false){
                    throw "Workflow ID should be an integer";
                }
                else if(workflowID < 0){
                    throw "Workflow ID should not be smaller than 0";
                }
            }
            catch(error){
                console.log(error);
                return error;
            }

            let loadQuery =  `SELECT * FROM workflow_component, component WHERE workflow_id = ${workflowID}
                AND workflow_component.component_id = component.component_id;`;

            // let loadQuery = "SELECT * FROM workflow_component, component WHERE workflow_id = " + "\'" + workflowId + "\'"
            //     +  "AND workflow_component.component_id = component.component_id;";
            // console.log(loadQuery);

            let componentList = []; // empty array ready for storing components

            let returnVal = new Promise(function(resolve,reject){
                pool.query(loadQuery, (err, result) => {
                    if (err)
                    {
                        // console.log("error!")
                        resolve(err);
                    }
                    else
                    {
                        //console.log(result.rows);
                        for(let i = 0; i<result.rows.length; i++){
                            let newComponent = {
                                c_name: result.rows[i].component_name,
                                id: result.rows[i].component_id,
                                local_id: result.rows[i].local_id,
                                transform: result.rows[i].transform,
                                inputs: JSON.parse(result.rows[i].input_components),
                                outputs: JSON.parse(result.rows[i].output_components)
                            }
                            componentList.push(newComponent);
                        }
                        resolve(componentList);

                    }
                });
            });

            return await returnVal;
    },
    getLastWorkflowComponent: async function(){
        let lastWorkflowComponentQuery = `SELECT * FROM workflow_component ORDER BY id DESC limit 1;`;
        let returnVal = new Promise(function(resolve, reject) {
            // Do async job
            pool.query(lastWorkflowComponentQuery, (err, result) => {
                if (err)
                {
                    resolve(err);
                }
                else
                {
                    let lastRecord;
                    if(result.rowCount != 0){
                        lastRecord = result.rows[0].id;
                    }
                    else{
                        lastRecrod = null;
                    }
                    resolve(lastRecord);
                }
            });
        });

        return await returnVal;
    },
    getLastWorkflow: async function(){
        let lastWorkflowQuery = `SELECT * FROM workflow ORDER BY workflow_id DESC limit 1;`;
        let returnVal = new Promise(function(resolve, reject) {
            // Do async job
            pool.query(lastWorkflowQuery, (err, result) => {
                if (err)
                {
                    resolve(err);
                }
                else
                {

                    // console.log("get last workflow");
                    let lastRecord;
                    if(result.rows[0]!= null){
                        lastRecord = result.rows[0].workflow_id;
                    }
                    else{
                        lastRecord = null;
                    }
                    resolve(lastRecord);
                }
            });
        });
        return await returnVal;
    },
    updateWorkflowDescription: async function(workflowID, workflowDescription){
        // let checkUserPasswordQuery = `SELECT * FROM user_table WHERE user_id = '${userID}' AND password = '${password}' ;`;
        let updateWorkflowDescriptionQuery = `UPDATE workflow SET workflow_description = '${workflowDescription}' WHERE workflow_id = '${workflowID}';`;

        // console.log(updateWorkflowDescriptionQuery);

        let returnVal =  new Promise(function(resolve,reject){
            pool.query(updateWorkflowDescriptionQuery, (err, result) => {
                if (err)
                {
                    // console.log("error!")
                    resolve(err);
                    //resolve("New Workflow");
                }
                else
                {
                    resolve("update the description!");
                }
            });
        });
        return await returnVal;
    },
    createWorkflow: async function(newWorkflow,lastRecord,workflowDescription = "test"){
        // type check for arguments
        try{
            if(lastRecord == null){

            }
            else if(typeof(lastRecord)!="number"){
                throw "Last record should be an integer";
            }
            else if(Number.isInteger(lastRecord)==false){
                throw "Last record should be an integer";
            }
            else if(lastRecord < 0){
                throw "Last record should not be smaller than 0";
            }
            if(typeof(newWorkflow)!="string"){
                throw "New workflow name should be a string"
            }
        }
        catch(error){
            console.log(error);
            return error;
        }

        let ID;
        if(lastRecord != null){
            ID = lastRecord + 1;
        }
        else{
            ID = 0;
        }

        let createNewWorkflowQuery =`INSERT INTO workflow (workflow_id, workflow_name, workflow_description) VALUES
        
            (${ID}, '${newWorkflow}', '${workflowDescription}' ); `;

        // createNewWorkflowQuery = "INSERT INTO workflow (workflow_id, workflow_name, workflow_description) VALUES"
        //     + "(" + ID + ", \'" + newWorkflow + "\',\'testing 1\');";


        // console.log(createNewWorkflowQuery);

        let returnVal = new Promise(function(resolve, reject) {
            pool.query(createNewWorkflowQuery, (err, result) => {
                if (err)
                {
                    resolve(err);
                }
                else
                {
                    resolve(ID);
                }
            });

        });
        return await returnVal;
    }
};
