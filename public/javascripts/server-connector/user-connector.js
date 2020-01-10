/*
Database connector about relating to user

*/

const userConnector = (function () {

    return { //exposed to public
        writeUserSettings: function (settings) {
            //console.log("........................................$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            let myJSON = [settings];

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/write_settings";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));

            console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                //console.log(xmlhttp.responseText);
                //let data = JSON.parse(response);
                // console.log(response);
            }
        },
        readUserSettings: function () {
            //console.log("........................................$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            let myJSON = ["reading user settings"];

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/read_settings";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                //console.log(xmlhttp.responseText);
                //let data = JSON.parse(response);
                // console.log(response);
                if (response.length > 0) {
                    settingsModule.dbSettings(JSON.parse(response));
                }
            }
        },
        addLog: function (userID, action) {
            
            // console.log("check user ID!!!!!")
            let myJSON = [userID,action];

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/add_log";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                // console.log(response);
                
            }
        },
        checkLoginUser: function () {
            
            // console.log("check user ID!!!!!")
            let myJSON = ["check user ID"];

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/check_login_user";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                // console.log(response);
                
            }
        },
    }
}());

