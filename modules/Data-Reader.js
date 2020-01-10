/*
Data reader module

use jfile module instead


Function list:
readLocalData: function(fileURL)
readInputData: function(fileURL)

private funtions:
function readFromFileComp(fileURL, separator)
function readFromFile(fileURL, separator)

*/

const JFile = require("jfile");

var reader = module.exports = {
    readLocalData: function(fileURL){
        let fileExtension = fileURL.split(".")[1];
        let separator;
        if(fileExtension == "ddf" || fileExtension == "csv"){
            // console.log("loading a ddf file");
            separator = ",";
        }
        else if(fileExtension == "las"){
            // console.log("loading a las file");
            separator = " ";
        }

        return readFromFile(fileURL,separator);
    },
    readInputData: function(fileURL){
        let fileExtension = fileURL.split(".")[1];


        if(fileExtension == "ddf" || fileExtension == "csv"){
            // console.log("loading a ddf file");
            separator = ",";
        }
        else if(fileExtension == "las"){
            // console.log("loading a las file");
            separator = " ";
        }

        return readFromFileComp(fileURL,separator);
    }
}

function readFromFileComp(fileURL, separator){

    function validateNumber(str) {
        var regExp = new RegExp("^[-+., 0-9]+$");
        var isValid = regExp.test(str);
        return isValid;
    }
    let myFile = new JFile(__dirname +'/../data/' + fileURL);

    let lines = myFile.lines;
    
    let lineNum = 0;
    for(let i=0; i<lines.length;i++){
        let item = lines[i].slice(0,-1);
        if(item.length > 3 && validateNumber(item) == true){
            // console.log(item);
            // console.log(validateNumber(item));
            lineNum = i;
            break;
        }
    }
    // console.log(lineNum);

    let xArray = [];
    let yArray = [];


    for(let i = lineNum; i<lines.length; i++){ // start from 1 (ignore 1st line) ignore the last line
        if(validateNumber(lines[i].slice(0,-1)) == false){
            break;
        }
        let item = lines[i].split(separator);
        let num1 = Number(item[0]);
        let num2 = Number(item[1]); // remove "/r later"
        xArray.push(num1);
        yArray.push(num2);
    }
    return [xArray,yArray];

}

function readFromFile(fileURL, separator){

    function validateNumber(str) {
        var regExp = new RegExp("^[-+., 0-9]+$");
        var isValid = regExp.test(str);
        return isValid;
    }
    let myFile = new JFile(__dirname +'/../data/' + fileURL);

    let lines = myFile.lines;

    let lineNum = 0;
    for(let i=0; i<lines.length;i++){
        let item = lines[i].slice(0,-1);
        if(item.length > 3 && validateNumber(item) == true){
            lineNum = i;
            break;
        }
    }

    let xArray = [];
    let yArray = [];
    for(let i = lineNum; i<lines.length; i++){ // start from 1 (ignore 1st line) ignore the last line
        if(validateNumber(lines[i].slice(0,-1)) == false){
            break;
        }
        let item = lines[i].split(separator);
        let num1 = Number(item[0]);
        let num2 = Number(item[1]); // remove "/r later"
        xArray.push(num1);
        yArray.push(num2);
    }
    let returnVal = [{
        x:xArray,
        y:yArray,
        line: {
            color: 'blue',
            width: 1
            }
        }
    ];

    let xLabel = "";
    let yLabel = "";

    let traceData = {data: returnVal, title:fileURL, xLabel: xLabel, yLabel: yLabel  };
    return traceData;

}
