/*
    compatibility module in the server

    function:
    checkCompatiblity   check the compatibility in a validpath/validpaths

*/

var compatibility = module.exports = {
    checkCompatiblity: async function(validPath){
        // loop through each path
        let response = [];
        for(let j = 0; j<validPath.length; j++){
            let validPathList = validPath[j].path[0];
            let outputID = validPath[j].outputLocalID;
            let path = [];
            for(let i = 0; i< (validPathList.length -1); i++) {
                let input = Number(validPathList[i].componentID);
                let output = Number(validPathList[i + 1].componentID);
                let inputLocalID = Number(validPathList[i].componentLocalID);
                let outputLocalID = Number(validPathList[i + 1].componentLocalID);
                let isComp = await DBConnector.getCompatibility(input, output); // use await solve everything!
                let RecordOne = {
                    inputComponentLocalID: inputLocalID,
                    inputComponentID: input,
                    outputComponentLocalID: outputLocalID,
                    outputComponentID: output,
                    isCompatible: isComp,
                    message: "some feedback message"
                };
                path.push(RecordOne);
            }
            let responseOne = {
                outputLocalID: outputID,
                path: path
            };
            response.push(responseOne);
        }
        return response;
    },
}

var DBConnector = require('../modules/DB-Connector');