/* all computation function

Admin can add their functions for component here

*/
// import regression from 'regression';
const LPF = require("lpf");

const Spline = require('cubic-spline');
const MathJS = require('mathjs');

var compFunc = module.exports = {
    // now input are an array
    inputComp: function(input){
    
        let inputVal = input.slice(0);

        return inputVal; // return a copy of data
    },
    
    outputComp: function(input){
        // only keep the results(remove all previous traces)
        let inputVal = input.slice(0);
        let xArray = inputVal[0].slice(0);
        let yArray = inputVal[1].slice(0);
        let yArray1; // for keeping the same scale
        if(inputVal.length > 2){
            yArray1 = inputVal[2].slice(0);
        }
        else{
            yArray1 = inputVal[1].slice(0);
        }

        // return inputVal; // return a copy of data

        //only return the result data // array 0 and array1
        return [xArray,yArray,yArray1];
    },
    compA: function(input){
        // output best-fit curve instead
        
        let inputVal = input[0].slice(0);
        let xArray = inputVal[0].slice(0); // always keep make a copy of array
        let yArray = inputVal[1].slice(0);

        let yArray1 = yArray.slice(0);

        // let yOutput = MA.ma(yArray1,10);

        // LPF.smoothing = 0.2;
        // let yOutput = LPF.smoothArray(yArray1);

        // prepare data;
        // let data = [];
        // for(let i = 0; i<xArray.length; i++){
        //     data.push([xArray[i],yArray[i]]);
        // }
        // let result1 = Regression.polynomial(data,{order:3});

        // console.log(result1);
        // let yOutput = [];
        // for(let i=0; i<xArray.length;i++){
        //     yOutput.push(result1.points[i][1]); // get the y variable
        // }


        // use spline instead(with a sample of data)
        // let xSample = [];
        // let ySample = [];
        // for(let i=0; i<xArray.length; i+=80){ // 10 as step size
        //     xSample.push(xArray[i]);
        //     ySample.push(yArray[i])
        // } 

        // const spline = new Spline(xSample,ySample);

        // let yOutput = [];
        // for(let i=0; i<xArray.length; i++){
        //     yOutput.push(spline.at(xArray[i]));
        // }

        let yOutput = splineFit(xArray,yArray);

        // console.log("length of input!!!!!!");
        // console.log(yArray.length);
        // console.log("length of output!!!!!!");
        // console.log(yOutput.length);
        
        let result = [xArray,yOutput,yArray];
        return result;
    },
    compB: function(input){ // component B accept 2 inputs input contain two array
        // accept two components return the sum of two input

        let inputVal0 = input[0].slice(0);
        let inputVal1 = input[1].slice(0);

        let xArray = inputVal0[0].slice(0);

        let yArray0 = inputVal0[1].slice(0);
        let yArray1 = inputVal1[1].slice(0);

        let yArray = [];
        for(let i=0; i<xArray.length; i++){
            yArray.push(yArray0[i]+yArray1[i]);
        }

        let result = [xArray,yArray];

        return result;
    },
    
    compC: function(input){ // component C accept 3 inputs
        // accept three components return the sum of three input

        let inputVal0 = input[0].slice(0);
        let inputVal1 = input[1].slice(0);
        let inputVal2 = input[2].slice(0);

        let xArray = inputVal0[0].slice(0);

        let yArray0 = inputVal0[1].slice(0);
        let yArray1 = inputVal1[1].slice(0);
        let yArray2 = inputVal2[1].slice(0);

        let yArray = [];
        for(let i=0; i<xArray.length; i++){
            yArray.push(yArray0[i]+yArray1[i]+yArray2[i]);
        }

        let result = [xArray,yArray];

        return result;
    },
    compD: function(input){ // component C accept 3 inputs
        let inputVal = input[0].slice(0);
        let xArray = inputVal[0].slice(0); // always keep make a copy of array
        let yArray = inputVal[1].slice(0);

        let yArray1 = yArray.slice(0);
        let yArray2 = yArray.slice(0);
        let yArray3 = yArray.slice(0);
        let yArray4 = yArray.slice(0);
        let yArray5 = yArray.slice(0);
        let yArray6 = yArray.slice(0);
        let yArray7 = yArray.slice(0);
        let yArray8 = yArray.slice(0);
        let yArray9 = yArray.slice(0);
        let yArray10 = yArray.slice(0);
        let yArray11 = yArray.slice(0);
        let yArray12 = yArray.slice(0);
        let yArray13 = yArray.slice(0);

        for(let i = 0; i<yArray.length; i++){
            yArray1[i] = yArray[i] + 10;
            yArray2[i] = yArray[i] + 20;
            yArray3[i] = yArray[i] + 30;
            yArray4[i] = yArray[i] + 40;
            yArray5[i] = yArray[i] + 50;
            yArray6[i] = yArray[i] + 60;
            yArray7[i] = yArray[i] + 70;
            yArray8[i] = yArray[i] + 80;
            yArray9[i] = yArray[i] + 90;
            yArray10[i] = yArray[i] + 100;
            yArray11[i] = yArray[i] + 110;
            yArray12[i] = yArray[i] + 120;
            yArray13[i] = yArray[i] + 130;
        }
        let result = [
            xArray,
            yArray,
            yArray1,
            yArray2,
            yArray3,
            yArray4,
            yArray5,
            yArray6,
            yArray7,
            yArray8,
            yArray9,
            yArray10,
            yArray11,
            yArray12,
            yArray13
        ];
        // console.log("reach the result!!!! in CompD");
        return result;

    },
    outlierRemove: function(input){

        let inputVal = input[0].slice(0);
        let xArray = inputVal[0].slice(0); // always keep make a copy of array
        let yArray = inputVal[1].slice(0);

        let yArrayBefore = yArray.slice(0);

        // yArray = removeOutlierOld(yArray,1);

        let yArrayFit = splineFit(xArray,yArray);
        yArray = removeOutlierFromFitCurve(yArray,yArrayFit,20);
        yArray = removeOutlierIQR(yArray,1);

        let result = [xArray,yArray,yArrayBefore];
        return result;
    
    },
    noiseSeparate: function(input){
        // will return the maximum number
        // let inputVal = input[0].slice(0);
        // let xArray = inputVal[0].slice(0); // always keep make a copy of array
        // let yArray = inputVal[1].slice(0);

        // let yArray1 = yArray.slice(0);

        // // let yOutput = MA.ma(yArray1,10);

        // LPF.smoothing = 0.2;
        // let yOutput = LPF.smoothArray(yArray1);

        // return [xArray,yOutput,yArray];

        let inputVal = input[0].slice(0);
        let xArray = inputVal[0].slice(0); // always keep make a copy of array
        let yArray = inputVal[1].slice(0);

        let yArrayBefore = yArray.slice(0);

        yArrayFit = splineFit(xArray,yArray);

        let yOutput = separator(yArray,yArrayFit,20);

        return [xArray,yOutput,yArrayBefore];
        // return input.slice(0); // return a copy of data
    },
    noiseSuppress: function(input){

        let inputVal = input[0].slice(0);
        let xArray = inputVal[0].slice(0); // always keep make a copy of array
        let yArray = inputVal[1].slice(0);

        let yArray1 = yArray.slice(0);

        // let yOutput = MA.ma(yArray1,10);

        LPF.smoothing = 0.1;
        let yOutput = LPF.smoothArray(yArray1);

        return [xArray,yOutput,yArray];
        // will return the minimum number
        // return input.slice(0); // return a copy
    }
}

// compFunc helper function

function splineFit(xArray, yArray){
    let xSample = [];
    let ySample = [];
    let stepSize = 120;
    for(let i=0; i<xArray.length; i+=stepSize){ // 10 as step size
        xSample.push(xArray[i]);
        if(i==0){
            ySample.push(yArray[i]);
        }
        else{
            // let avg =
            ySample.push(MathJS.mean(yArray.slice(i-stepSize,i)));
        }
    } 
    const spline = new Spline(xSample,ySample);

    let yOutput = [];
    for(let i=0; i<xArray.length; i++){
        yOutput.push(spline.at(xArray[i]));
    }
    return yOutput;
}

function separator(input,inputFit,k){
    // only keep the data which are noisy
    let output = [];
    let boundary = k;

    for(let i=0; i<input.length; i++){
        if(Math.abs(input[i]-inputFit[i])>boundary){
            // console.log("marked outlier!!!!!");
            // console.log(i);
            output.push(input[i]);
        }
        else{
            output.push(null);
        }
    }

    return output;


}

function removeOutlierFromFitCurve(input,inputFit,k){
    let outlierPosition = [];
    let boundary = k;
    // console.log("boundary value is: !!!!!!!!!");
    // console.log(boundary);
    for(let i=0; i<input.length; i++){
        if(Math.abs(input[i]-inputFit[i])>boundary){
            // console.log("marked outlier!!!!!");
            // console.log(i);
            outlierPosition.push(i);
        }
    }

    let output = input.slice(0);

    let lastValidNum = null;
    for(let i=0; i<input.length; i++){
        if(outlierPosition.indexOf(i) == -1){ // not an outlier
            lastValidNum = input[i];
        }
        if(outlierPosition.indexOf(i) != -1){
            // console.log("find an outlier: ");
            // console.log(inputVal[i]);
            if(lastValidNum == null){
                // find the first valid number
                for(let j=i+1; j<input.length; j++){
                    if(outlierPosition.indexOf(j) == -1){
                        // console.log(input[j]);
                        lastValidNum = input[j];
                        break;
                    }
                }
                output[i] = lastValidNum;
            }
            else{
                output[i] = lastValidNum;
            }
        }
        
    }
    return output;
}

// Tukey's fences //InterQuartile Range (IQR)
function removeOutlierIQR(input, k){

    let inputVal = input;
    let inputValSorted = inputVal.slice(0);
    inputValSorted.sort(function(a, b){return a-b});
    let length = input.length;

    let median = inputValSorted[Math.trunc(length * 0.5)];
    let q1 = inputValSorted[Math.trunc(length * 0.25)];
    let q3 = inputValSorted[Math.trunc(length * 0.75)];
    let quartileRange = q3 - q1;

    let outlierPosition = [];
    for(let i=0; i<inputVal.length; i++){
        if(inputVal[i]<(q1-k*quartileRange) || inputVal[i]>(q3+k*quartileRange)){
            outlierPosition.push(i);
        }
    }

    // replace outlier
    let lastValidNum = null;
    for(let i=0; i<inputVal.length; i++){
        if(outlierPosition.indexOf(i) == -1){ // not an outlier
            lastValidNum = inputVal[i];
        }
        if(outlierPosition.indexOf(i) != -1){
            // console.log("find an outlier: ");
            // console.log(inputVal[i]);
            if(lastValidNum == null){
                // find the first valid number
                for(let j=i+1; j<inputVal.length; j++){
                    if(outlierPosition.indexOf(j) == -1){
                        // console.log(inputVal[j]);
                        lastValidNum = inputVal[j];
                        break;
                    }
                }
                inputVal[i] = lastValidNum;
            }
            else{
                inputVal[i] = lastValidNum;
            }
        }
        
    }
    // console.log(inputVal);
    return inputVal;
}

