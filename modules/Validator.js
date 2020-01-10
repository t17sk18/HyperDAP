/*
    Validation of the data when processing the data

*/

/*

public functions:
    sameLength: function(input)

*/

var validator = module.exports = {
    sameLength: function(input){ // input is an array of inputs
        let numInput = input.length; // get the number of input
        let inputLength = null;
        let returnVal = true;
        
        // console.log("input data????????");
        // console.log(input[0]);

        for(let i = 0; i<numInput; i++){
            // console.log("input length????????????");
            // console.log(input[i].length); // this is only the channel number
            // console.log(input[i][1].length);

            if(inputLength == null)inputLength = input[i][1].length;
            else{
                if(inputLength != input[i][1].length){
                    returnVal = false;
                    break;
                }
            }
        }
        // console.log(returnVal);

        return returnVal; // result true or false value
    }
}

