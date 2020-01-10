/*
System management function

*/

const adminConnector = (function () {

    return { //exposed to public
        filterLogResult: function () {
            
            // console.log("filter!!!!!")
            // let myJSON = [userID, password];
            let userID = document.getElementById('user-id').value;
            let logNum = document.getElementById('log-num').value;

            let ratioGroup = document.getElementsByName('sort-by');
            let orderBy;
            for(let i=0; i<ratioGroup.length; i++){
                if(ratioGroup[i].checked){
                    orderBy = ratioGroup[i].value;
                }
            }

            let ratioGroup2 = document.getElementsByName('sort-order');
            let desc;
            for(let i=0; i<ratioGroup2.length; i++){
                if(ratioGroup2[i].checked){
                    desc = ratioGroup2[i].value;
                }
            }

            // console.log(userID);
            // console.log(logNum);

            let myJSON = [userID,logNum,orderBy,desc];

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/admin_filter";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                // console.log(response);

                let data = JSON.parse(response);
                let logTable = document.getElementById('log-table');

                let logTableHTML = `
                    <tr>
                        <th>Log ID</th>
                        <th>User ID</th>
                        <th>Action</th>
                        <th>Log Date and Time</th>
                    </tr>
                    `;

                for(let i=0; i<data.length; i++){
                    logTableHTML += `
                        <tr>
                            <td>${data[i].log_id}</td>
                            <td>${data[i].user_id}</td>
                            <td>${data[i].action}</td>
                            <td>${data[i].log_datetime}</td>
                        </tr>
                    `;
                }
                logTable.innerHTML = logTableHTML;

                
                
            }
        },
        resetPassword: function () {
            // reset password from the form
            
            // console.log("set password!!!!!")
            let userID = document.getElementById("user-id-reset").value;
            let password = document.getElementById("password-reset").value;

            let myJSON = [userID, password];

            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            let theUrl = "/set_password";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(myJSON));

            // console.log("send!");

            xmlhttp.onload = function () {
                let response = xmlhttp.responseText;
                // console.log(response);
                
                
            }
        },
        // setPassword: function (userID, password) {
            
        //     console.log("set password!!!!!")
        //     let myJSON = [userID, password];

        //     let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        //     let theUrl = "/set_password";
        //     xmlhttp.open("POST", theUrl);
        //     xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        //     xmlhttp.send(JSON.stringify(myJSON));

        //     console.log("send!");

        //     xmlhttp.onload = function () {
        //         let response = xmlhttp.responseText;
        //         console.log(response);
                
                
        //     }
        // },
    }
}());

