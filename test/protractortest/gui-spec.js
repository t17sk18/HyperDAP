describe('HyperDAP Browser Testing: ', function() {
    let gap1 = 500; // gap one between each action
    let gap2 = 300;
    let endStop = 5000;
    // it('should add one and two', function() {
    //   browser.get('http://juliemr.github.io/protractor-demo/');
    //   element(by.model('first')).sendKeys(1);
    //   element(by.model('second')).sendKeys(2);
  
    //   element(by.id('gobutton')).click();
  
    //   expect(element(by.binding('latest')).getText()).
    //       toEqual('3'); // This is wrong!
    // });
    browser.ignoreSynchronization = true;

    beforeAll(async function(){
        browser.get('http://localhost:3000/'); // keyin username/password manually now

        // should redirect to the login page

        browser.manage().window().maximize();

        await browser.sleep(gap1);

        let username = await element(by.name('username'));
        username.clear().sendKeys('HDtest');

        await browser.sleep(gap2);

        let password = await element(by.name('password'));
        password.clear().sendKeys('mypassword1');

        await browser.sleep(gap2);

        // get the button

        let submit = await element(by.name('submit-button'));

        await submit.click();

        await browser.sleep(gap1);


        



        // browser.get('http://teamalpha:teamalpha_hyperdap@localhost:3000/'); //(adding username/password in URL crashes the UI)

        // browser.get('https://teamalpha:teamalpha_hyperdap@team-alpha-it.herokuapp.com/'); // same problem for online version
        // use sendKey to input username and password. (adding username/password in URL crashes the UI)
        // let element1 = await browser.driver().switchTo().activeElement();
        // await browser.switchTo().alert().accept();
        // await browser.sleep(gap1);
        // await browser.switchTo().alert().accept();
        // await browser.sleep(gap1);
        // await browser.switchTo().alert().accept();
        // await browser.sleep(gap1);
        // await console.log(element1);

        
    });

    // /* // menu pages test block start
    it('HyperDAP Home Page', async function() {
        
        let title = await browser.getTitle();
        console.log(title);
        let text1 = await element(by.css('.title:nth-child(1) > h5')).getText();
        console.log(text1);

        expect(title).toEqual('HyperDAP');
        expect(text1).toEqual('Components');
        //await expect(browser.getTitle()).toEqual('HyperDAP');
        //let element1 = await element(by.css('#draggable5 > p'));
        // browser.actions().mouseMove({x:0, y:300}).mouseMove({x:200, y:300}).perform();
    });

    it('Open save modal', async function() {
        // open the save window

        await element(by.id('save-file-button')).click();

        await browser.sleep(gap2);


    });

    it('Check elements on save modal', async function() {
        // open the save window

        let text1 = await element(by.css('#modal-save h1')).getText();
        console.log(text1);
        expect(text1).toEqual("Save a workflow");
        let text2 = await element(by.css('#modal-save .col > h5')).getText();
        console.log(text2);
        expect(text2).toEqual("Information about selected workflow");
        let text3 = await element(by.css('#modal-save .col-4 > h5')).getText();
        console.log(text3);
        expect(text3).toEqual("List of existing workflows");
        let text4 = await element(by.linkText('Workflow Name')).getText();
        console.log(text4);
        expect(text4).toEqual("Workflow Name");


    });

    it('Click on existing workflows on save modal', async function() {
        // open the save window

        await element(by.id('workflow_item_1')).click();
        let wfName1List = await element(by.id('workflow_item_1')).getText();
        let wfName1 = await element(by.id('save_workflow_name')).getAttribute('value');
        console.log(wfName1);

        await element(by.id('workflow_item_2')).click();
        let wfName2List = await element(by.id('workflow_item_2')).getText();
        let wfName2 = await element(by.id('save_workflow_name')).getAttribute('value');
        console.log(wfName2);

        await element(by.id('workflow_item_3')).click();
        let wfName3List = await element(by.id('workflow_item_3')).getText();
        let wfName3 = await element(by.id('save_workflow_name')).getAttribute('value');
        console.log(wfName3);

        expect(wfName1).toEqual(wfName1List);
        expect(wfName2).toEqual(wfName2List);
        expect(wfName3).toEqual(wfName3List);


        await browser.sleep(gap1);

    });

    it('Close save modal', async function() {
        // open the save window

        await element(by.id('modal-save-window-close')).click();

        await browser.sleep(gap1);

    });

    it('Open open modal', async function() {
        // open the save window
        await element(by.id('open-file-button')).click(); //click on the open button

        await browser.sleep(gap2);

        

    });

    it('Check elements on open modal', async function() {
        // open the save window

        let text1 = await element(by.css('#modal-open h1')).getText();
        console.log(text1);
        expect(text1).toEqual("Open an existing workflow");
        let text2 = await element(by.css('#modal-open .col > h5')).getText();
        console.log(text2);
        expect(text2).toEqual("Information about selected workflow");



    });

    it('Click on existing workflows on open modal', async function() {
        // open the save window

        await element(by.css('#modal-open #workflow_item_1')).click();

        await element(by.css('#modal-open #workflow_item_2')).click();

        await element(by.css('#modal-open #workflow_item_3')).click();


        await browser.sleep(gap1);

    });

    it('Close open modal', async function() {
        // open the save window

        await element(By.id('modal-open-window-close')).click(); //close the window

        await browser.sleep(gap1);

    });


    it('Open new modal', async function() {
        // open the save window
        await element(by.id('new-file-button')).click(); //click on the new button

        await browser.sleep(gap2);


    });

    it('Check elements on new modal', async function() {
        // open the save window

        let text1 = await element(by.css('#modal-new h1')).getText();
        console.log(text1);
        expect(text1).toEqual("New Workflow");
        let text2 = await element(by.css('#modal-new .col > h5')).getText();
        console.log(text2);
        expect(text2).toEqual("Name your new workflow:");
        let text3 = await element(by.css('#modal-new .col-4 > h5')).getText();
        console.log(text3);
        expect(text3).toEqual("List of existing workflows");
        let text4 = await element(by.linkText('Workflow Name')).getText();
        console.log(text4);
        //expect(text4).toEqual("Workflow Name");


    });

    it('Click on existing workflows on new modal', async function() {
        // open the save window

        await element(by.css('#modal-new #workflow_item_1')).click();
        let wfName1List = await element(by.css('#modal-new #workflow_item_1')).getText();
        console.log(wfName1List);
        let wfName1 = await element(by.id('new_workflow_name')).getAttribute('value');
        console.log(wfName1);

        await element(by.css('#modal-new #workflow_item_2')).click();
        let wfName2List = await element(by.css('#modal-new #workflow_item_2')).getText();
        console.log(wfName2List);
        let wfName2 = await element(by.id('new_workflow_name')).getAttribute('value');
        console.log(wfName2);

        await element(by.css('#modal-new #workflow_item_3')).click();
        let wfName3List = await element(by.css('#modal-new #workflow_item_3')).getText();
        console.log(wfName3List);
        let wfName3 = await element(by.id('new_workflow_name')).getAttribute('value');
        console.log(wfName3);

        expect(wfName1).toEqual(wfName1List);
        expect(wfName2).toEqual(wfName2List);
        expect(wfName3).toEqual(wfName3List);


        await browser.sleep(gap1);

    });

    it('Close new modal', async function() {
        // open the save window

        await element(By.id('modal-new-window-close')).click(); //close the window

        await browser.sleep(gap1);

    });

    it('Open setting window', async function() {
        // open the setting window
        await element(by.css('.col:nth-child(2) > #settings-button > .fa')).click(); //click on the setting button

        await browser.sleep(gap2);
      

    });

    it('Check elements on setting window', async function() {
        // open the setting window
        let text1 = await element(by.css('#modal-settings .col > h1')).getText();
        console.log(text1);
        let text2 = await element(by.css('#modal-settings .col-4 > h5')).getText();
        console.log(text2);
        let text3 = await element(by.css('.col:nth-child(2) > div > h5')).getText();
        console.log(text3);
        let text4 = await element(by.css('h1:nth-child(3)')).getText();
        console.log(text4);
        let text5 = await element(by.css('.thingy > p:nth-child(1)')).getText();
        console.log(text5);
        let text6 = await element(by.css('.thingy > p:nth-child(3)')).getText();
        console.log(text6);

        expect(text1).toEqual('Settings');
        expect(text2).toEqual('Settings');
        expect(text3).toEqual('About');
        expect(text4).toEqual('The HyperDAP Application');
        expect(text5).toEqual('Show grid lines:');
        expect(text6).toEqual('Snap to grid:');

        
      

    });

    it('Close setting window', async function() {
        // open the save window
        await element(By.id('modal-settings-window-close')).click(); //close the window

        await browser.sleep(gap1);
    });

    it('Open output window', async function() {
        // open the save window

        await browser.switchTo().frame(0);

        await element(by.css('.fa-database')).click(); //click on the output button

        await browser.sleep(gap2);

        await browser.switchTo().defaultContent();

        await browser.sleep(gap2);
    });

    it('Check elements on output window', async function() {
        // open the save window
        let text1 = await element(By.css('#modal-output h1')).getText();
        console.log(text1);
        let text2 = await element(By.css('.col:nth-child(1) > h5')).getText();
        console.log(text2);
        // let text3 = await element(By.css('#modal-output .col > button')).getText();
        // console.log(text3);

        expect(text1).toEqual('Combined Outputs');
        expect(text2).toEqual('Results');
        // expect(text3).toEqual('Export Results');

    });

    it('Close output window', async function() {
        // open the save window
        await element(By.id('modal-output-window-close')).click(); //close the window

        await browser.sleep(gap1);

    });


    // driver.findElement(By.id("info0")).click();

    it('Open input window', async function() {
        // open the save window
        await browser.switchTo().frame(0);

        await element(By.css('.fa-line-chart')).click(); //click on the input button

        await browser.sleep(gap2);

        await browser.switchTo().defaultContent();

        await browser.sleep(gap2);

    });

    it('Check elements in input window', async function() {
        let text1 = await element(By.css('#modal-input h1')).getText();
        console.log(text1);

        expect(text1).toEqual('Select an input');


    });

    it('Close input window', async function() {
        await element(By.id('modal-input-window-close')).click(); //close the window

        await browser.sleep(gap1);

    });


    // */ // menu pages test block end

    // /* // workflow test one start

    it('Add 3 components to the workspace', async function() {
        
        let componentA = await element(by.css('#draggable2 > p'));
        let componentB = await element(by.css('#draggable3 > p'));
        let componentC = await element(by.css('#draggable4 > p'));
        // browser.actions().mouseMove({x:0, y:300}).mouseMove({x:200, y:300}).perform();

        //move elements
        await browser.actions().mouseDown(componentA).mouseMove({x: 750, y: -100}).mouseUp().perform();
        await browser.actions().mouseDown(componentB).mouseMove({x: 800, y: 0}).mouseUp().perform();
        await browser.actions().mouseDown(componentC).mouseMove({x: 850, y: 100}).mouseUp().perform();
        await browser.sleep(gap1);

    });

    it('Connect the components', async function() {
        
        await browser.switchTo().frame(0); // change to workflow space

        let rightNodePointer0 = element(by.id('right_node_pointer0'));
        let rightNodePointer1 = element(by.id('right_node_pointer1'));
        let rightNodePointer2 = element(by.id('right_node_pointer2'));
        let rightNodePointer3 = element(by.id('right_node_pointer3'));
        let rightNodePointer4 = element(by.id('right_node_pointer4'));

        let leftNodePointer0 = element(by.id('left_node_pointer0'));
        let leftNodePointer1 = element(by.id('left_node_pointer1'));
        let leftNodePointer2 = element(by.id('left_node_pointer2'));
        let leftNodePointer3 = element(by.id('left_node_pointer3'));
        let leftNodePointer4 = element(by.id('left_node_pointer4'));

        await browser.actions().mouseDown(rightNodePointer0).mouseMove(leftNodePointer2).mouseUp().perform();
        await browser.actions().mouseDown(rightNodePointer2).mouseMove(leftNodePointer3).mouseUp().perform();
        await browser.actions().mouseDown(rightNodePointer3).mouseMove(leftNodePointer4).mouseUp().perform();
        await browser.actions().mouseDown(rightNodePointer4).mouseMove(leftNodePointer1).mouseUp().perform();

        // //old way hard coding the offset
        // let rightNodePointer0 = element(by.id('right_node_pointer0'));
        // let rightNodePointer2 = element(by.id('right_node_pointer2'));
        // let rightNodePointer3 = element(by.id('right_node_pointer3'));
        // let rightNodePointer4 = element(by.id('right_node_pointer4'));

        // await browser.actions().mouseDown(rightNodePointer0).mouseMove({x: 80, y: 0}).mouseUp().perform();
        // await browser.actions().mouseDown(rightNodePointer2).mouseMove({x: -100, y: 150}).mouseUp().perform();
        // await browser.actions().mouseDown(rightNodePointer3).mouseMove({x: -100, y: 150}).mouseUp().perform();
        // await browser.actions().mouseDown(rightNodePointer4).mouseMove({x: 110, y: 40}).mouseUp().perform();

        await browser.sleep(gap1);

    });

    it('Disonnect the components', async function() {
        
        let rightNodePointer0 = element(by.id('right_node_pointer0'));
        let rightNodePointer2 = element(by.id('right_node_pointer2'));
        let rightNodePointer3 = element(by.id('right_node_pointer3'));
        let rightNodePointer4 = element(by.id('right_node_pointer4'));

        
        await browser.actions().mouseDown(rightNodePointer0).mouseMove({x:50, y:0}).mouseUp().perform();
        await browser.actions().mouseDown(rightNodePointer2).mouseMove({x:50, y:0}).mouseUp().perform();
        await browser.actions().mouseDown(rightNodePointer3).mouseMove({x:50, y:0}).mouseUp().perform();
        await browser.actions().mouseDown(rightNodePointer4).mouseMove({x:50, y:0}).mouseUp().perform();

        await browser.sleep(gap1);

    });

    it('Connect the components again', async function() {
        
        let rightNodePointer0 = element(by.id('right_node_pointer0'));
        let rightNodePointer1 = element(by.id('right_node_pointer1'));
        let rightNodePointer2 = element(by.id('right_node_pointer2'));
        let rightNodePointer3 = element(by.id('right_node_pointer3'));
        let rightNodePointer4 = element(by.id('right_node_pointer4'));

        let leftNodePointer0 = element(by.id('left_node_pointer0'));
        let leftNodePointer1 = element(by.id('left_node_pointer1'));
        let leftNodePointer2 = element(by.id('left_node_pointer2'));
        let leftNodePointer3 = element(by.id('left_node_pointer3'));
        let leftNodePointer4 = element(by.id('left_node_pointer4'));

        await browser.actions().mouseDown(rightNodePointer0).mouseMove(leftNodePointer2).mouseUp().perform();
        await browser.actions().mouseDown(rightNodePointer2).mouseMove(leftNodePointer3).mouseUp().perform();
        await browser.actions().mouseDown(rightNodePointer3).mouseMove(leftNodePointer4).mouseUp().perform();
        await browser.actions().mouseDown(rightNodePointer4).mouseMove(leftNodePointer1).mouseUp().perform();


        // //old way hard coding the offset
        // let rightNodePointer0 = element(by.id('right_node_pointer0'));
        // let rightNodePointer2 = element(by.id('right_node_pointer2'));
        // let rightNodePointer3 = element(by.id('right_node_pointer3'));
        // let rightNodePointer4 = element(by.id('right_node_pointer4'));

        // await browser.actions().mouseDown(rightNodePointer0).mouseMove({x: 80, y: 0}).mouseUp().perform();
        // await browser.actions().mouseDown(rightNodePointer2).mouseMove({x: -100, y: 150}).mouseUp().perform();
        // await browser.actions().mouseDown(rightNodePointer3).mouseMove({x: -100, y: 150}).mouseUp().perform();
        // await browser.actions().mouseDown(rightNodePointer4).mouseMove({x: 110, y: 40}).mouseUp().perform();

        await browser.sleep(gap1);

    });

    it('Move the components', async function() {
        
        let componentA = await element(by.css('#draggable2'));
        let componentB = await element(by.css('#draggable3'));
        let componentC = await element(by.css('#draggable4'));

        await browser.actions().mouseDown(componentA).mouseMove({x: 0, y: -50}).mouseUp().perform();
        await browser.actions().mouseDown(componentB).mouseMove({x: 0, y: 0}).mouseUp().perform();
        await browser.actions().mouseDown(componentC).mouseMove({x: 0, y: 50}).mouseUp().perform();

        await browser.sleep(gap1);

    });

    it('Add outputs in components', async function() {
        
        let plus0 = element(by.id('plus0'));
        let plus2 = element(by.id('plus2'));
        let plus3 = element(by.id('plus3'));
        let plus4 = element(by.id('plus4'));

        await plus0.click();
        await plus2.click();
        await plus3.click();
        await plus4.click();

        await browser.sleep(gap1);

    });

    it('Add another output', async function() {

        await browser.switchTo().defaultContent();
        
        let output = await element(by.css('#draggable1 > p'));

        await browser.actions().mouseDown(output).mouseMove({x: 1100, y: 50}).mouseUp().perform();

        await browser.sleep(gap1);

    });

    it('Connect to the new output', async function() {

        await browser.switchTo().frame(0);

        let pointer1 = await element(by.id('3outputpointer0')); //#\33 outputcontainer0 > a.borderoutlineright.right.node

        // let pointer1Position = await element(by.id('3outputpointer0')).getLocation();

        let leftNodePointer5 = await element(by.id('left_node_pointer5'));

        // let offset = {
        //     x: 
        // }

        await browser.actions().mouseDown(pointer1).mouseMove(leftNodePointer5).mouseUp().perform();
        
        // await browser.actions().mouseDown(pointer1).mouseMove({x: 160, y: -65}).mouseUp().perform();

        await browser.sleep(gap1);

    });

    // it('Check data in save modal', async function() {

    //     await browser.switchTo().defaultContent();

    //     await element(by.id('save-file-button')).click();

    //     let data = await element(by.css('#save-display > p')).getText();

    //     data = JSON.parse(data);

    //     // let expectedData = [{"c_name":"Input","id":"0","local_id":"0","transform":"translate(200px, 60px)",
    //     //                         "inputs":[],
    //     //                         "outputs":[{"local_id":"2","count":"0"},{"local_id":null,"count":"1"}]},
    //     //                     {"c_name":"Output","id":"1","local_id":"1","transform":"translate(800px, 400px)",
    //     //                         "inputs":[{"local_id":"4","count":"0"}],
    //     //                         "outputs":[]},
    //     //                     {"c_name":"Component A","id":"2","local_id":"2","transform":"translate(434.203px, 25.6562px)",
    //     //                         "inputs":[{"local_id":"0","count":"0"}],
    //     //                         "outputs":[{"local_id":"3","count":"0"},{"local_id":null,"count":"1"}]},
    //     //                     {"c_name":"Component B","id":"3","local_id":"3","transform":"translate(484.203px, 216.656px)",
    //     //                         "inputs":[{"local_id":"2","count":"0"}],
    //     //                         "outputs":[{"local_id":"4","count":"0"},{"local_id":"5","count":"1"}]},
    //     //                     {"c_name":"Component C","id":"4","local_id":"4","transform":"translate(534.203px, 407.656px)",
    //     //                         "inputs":[{"local_id":"3","count":"0"}],
    //     //                         "outputs":[{"local_id":"1","count":"0"},{"local_id":null,"count":"1"}]},
    //     //                     {"c_name":"Output","id":"1","local_id":"5","transform":"translate(784.203px, 184.656px)",
    //     //                         "inputs":[{"local_id":"3","count":"0"}],
    //     //                         "outputs":[]}]
    //     //console.log(data);
    //     console.log(data);

    //     //Check Input
    //     expect(data[0].c_name).toEqual("Input");
    //     expect(data[0].id).toEqual("0");
    //     expect(data[0].local_id).toEqual("0");
    //     expect(data[0].outputs[0].local_id).toEqual("2");
    //     expect(data[0].outputs[0].myDepth).toEqual("0");

    //     //check Output1
    //     expect(data[1].c_name).toEqual("Output");
    //     expect(data[1].id).toEqual("1");
    //     expect(data[1].local_id).toEqual("1");
    //     expect(data[1].inputs[0].local_id).toEqual("4");
    //     expect(data[1].inputs[0].myDepth).toEqual("0");

    //     //check Component A
    //     expect(data[2].c_name).toEqual("Component A");
    //     expect(data[2].id).toEqual("2");
    //     expect(data[2].local_id).toEqual("2");
    //     expect(data[2].inputs[0].local_id).toEqual("0");
    //     expect(data[2].inputs[0].myDepth).toEqual("0");
    //     expect(data[2].outputs[0].local_id).toEqual("3");
    //     expect(data[2].outputs[0].myDepth).toEqual("0");

    //     //check Component B
    //     expect(data[3].c_name).toEqual("Component B");
    //     expect(data[3].id).toEqual("3");
    //     expect(data[3].local_id).toEqual("3");
    //     expect(data[3].inputs[0].local_id).toEqual("2");
    //     expect(data[3].inputs[0].myDepth).toEqual("0");
    //     expect(data[3].outputs[0].local_id).toEqual("4");
    //     expect(data[3].outputs[0].myDepth).toEqual("0");
    //     expect(data[3].outputs[1].local_id).toEqual("5");
    //     expect(data[3].outputs[1].myDepth).toEqual("1");

    //     //check Component C
    //     expect(data[4].c_name).toEqual("Component C");
    //     expect(data[4].id).toEqual("4");
    //     expect(data[4].local_id).toEqual("4");
    //     expect(data[4].inputs[0].local_id).toEqual("3");
    //     expect(data[4].inputs[0].myDepth).toEqual("0");
    //     expect(data[4].outputs[0].local_id).toEqual("1");
    //     expect(data[4].outputs[0].myDepth).toEqual("0");

    //     //check Output 2
    //     expect(data[5].c_name).toEqual("Output");
    //     expect(data[5].id).toEqual("1");
    //     expect(data[5].local_id).toEqual("5");
    //     expect(data[5].inputs[0].local_id).toEqual("3");
    //     expect(data[5].inputs[0].myDepth).toEqual("0");

    //     await browser.sleep(gap1);
        
    //     await element(by.id('modal-save-window-close')).click();

    //     await browser.sleep(gap1);

        

        

    // });
    // */ // workflow test one finish
    it('Create a new workflow', async function() {

        await browser.switchTo().defaultContent();

        await element(by.id('new-file-button')).click(); //click on the new button

        await browser.sleep(gap2);

        let newFlowName = await element(by.id('new_workflow_name'));

        // newFlowName.setAttribute('value','some flow')
        newFlowName.clear().sendKeys('New Workflow(for testing only)');

        await element(by.id('create-new-workflow')).click();

        await browser.sleep(gap1);

    });

    it('Add components to the workspace', async function() {
        
        let componentA = await element(by.css('#draggable2 > p'));
        let componentB = await element(by.css('#draggable3 > p'));
        let componentC = await element(by.css('#draggable4 > p'));

        
        // browser.actions().mouseMove({x:0, y:300}).mouseMove({x:200, y:300}).perform();

        // await browser.switchTo().frame(1); // change to workflow space

        

        await browser.actions().mouseDown(componentA).mouseMove({x: 750, y: -100}).mouseUp().perform();
        await browser.actions().mouseDown(componentB).mouseMove({x: 1000, y: 0}).mouseUp().perform();
        await browser.actions().mouseDown(componentC).mouseMove({x: 850, y: 100}).mouseUp().perform();
        // await browser.switchTo().frame(1); // change to workflow space
        // let InputPosition = await element(by.id('draggable2')).getLocation();
        //console.log(InputPosition);


        await browser.sleep(gap1);

    });

    it('Connect the components (smarter)', async function() {
        
        await browser.switchTo().frame(1); // change to workflow space

        // let componentAPosition = await element(by.css('#draggable2')).getLocation();
        // console.log(componentAPosition);

        let rightNodePointer0 = element(by.id('right_node_pointer0'));
        let rightNodePointer1 = element(by.id('right_node_pointer1'));
        let rightNodePointer2 = element(by.id('right_node_pointer2'));
        let rightNodePointer3 = element(by.id('right_node_pointer3'));
        let rightNodePointer4 = element(by.id('right_node_pointer4'));

        let leftNodePointer0 = element(by.id('left_node_pointer0'));
        let leftNodePointer1 = element(by.id('left_node_pointer1'));
        let leftNodePointer2 = element(by.id('left_node_pointer2'));
        let leftNodePointer3 = element(by.id('left_node_pointer3'));
        let leftNodePointer4 = element(by.id('left_node_pointer4'));

        await browser.actions().mouseDown(rightNodePointer0).mouseMove(leftNodePointer2).mouseUp().perform();
        await browser.actions().mouseDown(rightNodePointer2).mouseMove(leftNodePointer4).mouseUp().perform();
        await browser.actions().mouseDown(rightNodePointer4).mouseMove(leftNodePointer3).mouseUp().perform();
        await browser.actions().mouseDown(rightNodePointer3).mouseMove(leftNodePointer1).mouseUp().perform();

        // await browser.actions().mouseDown(rightNodePointer0).mouseMove({x: 80, y: 0}).mouseUp().perform();
        // await browser.actions().mouseDown(rightNodePointer2).mouseMove({x: -100, y: 150}).mouseUp().perform();
        // await browser.actions().mouseDown(rightNodePointer3).mouseMove({x: -100, y: 150}).mouseUp().perform();
        // await browser.actions().mouseDown(rightNodePointer4).mouseMove({x: 110, y: 40}).mouseUp().perform();

        await browser.sleep(gap1);

    });

    it('Rearrange comoponents(based on input position)', async function() {
        

        let InputPosition = await element(by.css('#draggable0 .comp_header_text')).getLocation();

        let componentA = await element(by.css('#draggable2 .comp_header_text'));
        let componentB = await element(by.css('#draggable3 .comp_header_text'));
        let componentC = await element(by.css('#draggable4 .comp_header_text'));
        let positionA = await element(by.css('#draggable2 .comp_header_text')).getLocation();
        let positionB = await element(by.css('#draggable3 .comp_header_text')).getLocation();
        let positionC = await element(by.css('#draggable4 .comp_header_text')).getLocation();

        let componentAPosition = {
            x:  InputPosition.x - positionA.x + 250,
            y:  InputPosition.y - positionA.y + 0
        };

        let componentBPosition = {
            x:  InputPosition.x - positionB.x + 500,
            y:  InputPosition.y - positionB.y + 0
        };

        let componentCPosition = {
            x:  InputPosition.x - positionC.x + 300,
            y:  InputPosition.y - positionC.y + 150
        };


        //move elements
        await browser.actions().mouseDown(componentA).mouseMove(componentAPosition).mouseUp().perform();
        await browser.actions().mouseDown(componentB).mouseMove(componentBPosition).mouseUp().perform();
        await browser.actions().mouseDown(componentC).mouseMove(componentCPosition).mouseUp().perform();

        await browser.sleep(gap1);

        await browser.sleep(endStop);

    });

    // it('Select the input trace', async function() {
        

    //     await browser.switchTo().frame(0);

    //     await element(By.css('.fa-line-chart')).click(); //click on the input button

    //     await browser.sleep(gap2);

    //     await browser.switchTo().defaultContent();

    //     await browser.sleep(gap2);

        

    // });


  });