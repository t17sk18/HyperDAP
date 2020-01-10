// all functions involving encrytion and decrytion, user authentication

/*
Public functions:
isAdmin: async function(userID)
insertLog: async function(userID,action)
checkPassword: async function(userID, password)
setPassword: async function(userID,password)

Privatee functions:
getCurrentTime()

*/

const DBConnector = require('../modules/DB-Connector');

const bcrypt = require('bcrypt');
const saltRounds = 10;

function getCurrentTime(){
    // return current time in a string
    let currentTime = new Date();

    return `${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
}

var authenticator = module.exports = {
    isAdmin: async function(userID){
        let isAdmin = await DBConnector.checkIfAdmin(userID);
        return isAdmin;
    },
    insertLog: async function(userID,action){
        let lastLogID = await DBConnector.getLastLogID();
        let logID;
        if(lastLogID == null){
            logID = 0;
        }
        else{
            logID = lastLogID + 1;
        // }

        // let dateTime = "hard code some dataTime for testing";
        // console.log("before setting log dateTime !!!!%%%%%");
        let dateTime = getCurrentTime();

        // console.log(dateTime);
        let response = await DBConnector.insertLog(logID,userID,action,dateTime);

        // console.log(response);

        return response;
        }

    },
    checkPassword: async function(userID, password){
        let hash = await DBConnector.getPasswordHash(userID);
        let result;
        if(hash == "no result!"){
            result = false;
        }
        else{
            result = bcrypt.compareSync(password,hash);
        }
        // console.log("result is  ??");
        // console.log(result);
        return result;
    },
    setPassword: async function(userID,password){
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(password, salt);

        let response = await DBConnector.setUserPassword(userID,hash);
        return response;
    }
}

