// This module is responsible for the chart visualisation

// The publicly available methods are:
//do this later



const chartModule = (function() {
    let spinner = `<div style=""><div class = "vertical-center"><div class="loading">Loading Trace File </div><br><br><div class="loader"></div></div></div>`;

    return { //exposed to public
        generateSpinner: function(){
            return spinner;
        },
        generateChart: function(traceData, divElement, titleElement){
            Plotly.purge(divElement);
            titleElement.innerText = traceData.title;


            let layout = {
                //title: traceData.title,
                xaxis:{title: traceData.xLabel},
                yaxis:{title: traceData.yLabel},
                font: {size: 14},
                margin: {
                    // if there are axis labels must comment out "l: 0"
                    l: 0,
                    r: 0,
                    b: 0,
                    t: 0,
                    // pad: 4
                },

            };

            divElement.innerHTML = "";
            Plotly.plot( divElement, traceData.data, layout,{responsive: true}  );


        }
    }
}());

