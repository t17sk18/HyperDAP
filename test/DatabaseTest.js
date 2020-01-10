    let chai = require('chai');
    let describe = require('mocha').describe;
    let it = require('mocha').it;
    let assert = require('chai').assert;
    let expect = require('chai').expect;
    let should = require('chai').should();
    let chaiAsPromised = require("chai-as-promised");
    chai.use(chaiAsPromised);
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    let DB_Connector = require('../modules/DB-Connector.js')
    const pg = require('pg');

    describe('Postgres Database ConnectionCheck', function(){
        it('Should check the connection and sends a successful test if the credentials are correct', function(done){
            let connection = pg.Pool({
                host: 'localhost',
                user: 'TeamAlpha',
                password: 'teamalpha',
                database: 'hyperdap'
            });
            connection.connect(done);
        });
    });

    describe('Checking the workflow id matches based on the input workflow name', function(){
        it('Should return the workflow id  from the DB  based on the input workflow name provided', function(done){
            let list;
            DB_Connector.getWorkflowID("Workflow 1").then(result => {
            console.log(result);
                assert.equal(result, 1 );
            done();
            });
        });
    });

    describe('Checking the workflow id not matches based on the input workflow name', function(){
        it('should return the workflow id  from the DB  based on the input workflow name provided', function(done){
            DB_Connector.getWorkflowID("Workflow 3").then( workflowid => {
                assert.notEqual(workflowid, 2 );
                done();
            });
        });
    });

    describe('Load Components Test', function(){
        it('Should load the all the components from DB using the loadComponents method checks if list exists', function(done){
            DB_Connector.loadComponents().then( list => {
                expect(list).to.exist;
               // assert.isNotNull(list,'List has components');
                done();
            });
        });

        it('Should return the workflow details of the selected workflow id, if record exits, the test passes ', function(done){
            DB_Connector.loadWorkflow(1).then( list => {
                expect(list).to.exist;
                // assert.isNotNull(list,'List has components');
                done();
            });
        });
    });

    describe('Checking the Insertion query - Show insert a record of Workflow - Components', function(){
        it('Should successfully insert into the DB based on the inputs structure provided, fails if any of the datatype is wrong', function(done){
            let workflowId = 1;

            let workflowComponents = [ { localId: '0',
                componentId: 0,
                transform: 'translate(200px, 60px)',
                inputComponents: [],
                outputComponents: [ [Object] ] },
                { localId: '1',
                    componentId: 1,
                    transform: 'translate(800px, 400px)',
                    inputComponents: [ [Object] ],
                    outputComponents: [] },
                { localId: '2',
                    componentId: 4,
                    transform: 'translate(278.867px, 291.267px)',
                    inputComponents: [ [Object] ],
                    outputComponents: [ [Object] ] },
                { localId: '3',
                    componentId: 7,
                    transform: 'translate(645.867px, 196.067px)',
                    inputComponents: [ [Object] ],
                    outputComponents: [ [Object] ] } ];

           // console.log(Object.keys(workflowComponents[0]));

            let lastRecord = null;
            DB_Connector.cleanBeforeSaveWorkflow(workflowId).then(result =>{
                DB_Connector.saveWorkflow(workflowId, workflowComponents, lastRecord).then( result => {
                    assert.equal(result,'Save to the database!')
                    // assert.isNotNull(list,'List has components');
                    done();
                });
            });
        });
    });


    describe('Show the compatibility of the given component', function () {
        it('It should pass the test if the both the component values are true', function (done) {
            let inputComponent = 2;
            let outputComponent = 4;
            DB_Connector.getCompatibility(inputComponent, outputComponent).then (result =>{
                         assert.equal(result, true);
                         done();
            });
        });

        it('It should pass the test if the both the component values are false', function (done) {
            let inputComponent = 2;
            let outputComponent = 6;
            DB_Connector.getCompatibility(inputComponent, outputComponent).then (result =>{
                assert.equal(result, false);
                done();
            });
        });

        it('It should pass the test by showing the follwing message if the both the component values are false', function (done) {
            let inputComponent = null;
            let outputComponent = null;
            DB_Connector.getCompatibility(inputComponent, outputComponent).then (result =>{
                assert.equal(result, 'Component ID should be an integer');
                done();
            });
        });

        it('It should pass the test by showing the follwing message if the both the component values are false', function (done) {
            let inputComponent = 'Two';
            let outputComponent = 3;
            DB_Connector.getCompatibility(inputComponent, outputComponent).then (result =>{
                assert.equal(result, 'Component ID should be an integer');
                done();
            });
        });
    });

    describe('Fetching the all the records from the workflow table', function() {
       it('should check the workflow table retrieves all the records or not, if list exits, test is successful', function(done) {
           DB_Connector.requestWorkflowList().then(result => {
              expect(result).to.exist;
              done();
           });
       });

        it('Test should check the workflow table attribute details', function (done) {
            DB_Connector.requestWorkflowList().then(hash => {
                //console.log('ssssssssssssssssssssssssssssssssssssssssssssssssss');
                //console.log(Object.keys(hash[0]));
                let result = Object.keys(hash[0]);
                assert.equal(result[0], 'workflowId');
                assert.equal(result[1], 'workflowName');
                assert.equal(result[2], 'workflowDescription');
                done();
            });
        });
    });


    describe('Creating a new workflow details into database', function () {
        it('should create a new workflow details by feting the last workflow ID, New Workflow Name and Workflow Descriptions', function (done) {

            let workflow_name = 'Workflow Test';
            //workflow_description = "Test Workflow One"

            DB_Connector.getWorkflowID(workflow_name).then(result => {
                //console.log(result);
                if (result === 'New Workflow') {
                    DB_Connector.getLastWorkflow().then(last_record => {
                        // console.log('aaaaaaaaaaaaaaaa');
                        // console.log(last_record);
                        //lastRecord = last_record;

                        DB_Connector.createWorkflow(workflow_name, last_record).then(id => {
                            console.log(id);
                            //assert.equal(result, last_record + 1);
                            DB_Connector.requestWorkflowList().then(list =>{
                                //console.log ('***********************************');
                                console.log(list[id-1].workflowName);
                                assert.equal(list[id-1].workflowName,'Workflow Test' );
                                done();
                            });
                        });
                    });
                 } else {
                       console.log('Workflow already exits.............Then.............')
                       done();
                }
            });
        });
    });

    describe ('Fetching the last Workflow - components record in the table', function () {
       it('Should return successful test, if the query is successful', function (done) {
           DB_Connector.getLastWorkflowComponent().then(result => {
               //console.log("................................................................")
               //console.log(result);
               expect(result).to.be.above(0);
               done();
           });
       });

        it('Should return true and successful if the list is not empty', function (done) {
            DB_Connector.getLastWorkflowComponent().then(result => {
                // console.log("................................................................")
                //console.log(result);
                Number.isInteger(result).should.be.true;
                //expect(result).to.be .an('integer');
                done();
            });
        });

        it('Should check the workflow_components Object Keys details, if all attributes matches then test is successful', function (done) {
            let workflowId = 1;
            DB_Connector.loadWorkflow(workflowId).then(hash => {
                //console.log('ssssssssssssssssssssssssssssssssssssssssssssssssss');
                //console.log(Object.keys(hash[0]));
                let result = Object.keys(hash[0]);
                assert.equal(result[0], 'c_name');
                assert.equal(result[1], 'id');
                assert.equal(result[2], 'local_id');
                assert.equal(result[3], 'transform');
                assert.equal(result[4], 'inputs');
                assert.equal(result[5], 'outputs');
                done();
            });
        });

    });

    describe('Checking the following functions/methods exits for implementations', function () {

        it('should have compatability method to check compatibility of the components', function (done) {
            expect(DB_Connector.getCompatibility()).to.exist;
            done();
        });

        it('should have method for getting workflow based on the input value', function (done) {
            expect(DB_Connector.getWorkflowID()).to.exist;
            done();
        });

        it('should have a method to load the components from the database', function (done) {
            expect(DB_Connector.loadComponents()).to.exist;
            done();
        });

        it('should have loading workflow method to load the details of the workflows', function (done) {
            expect(DB_Connector.loadWorkflow()).to.exist;
            done();
        });

        it('should have delete saved workflow if updating the workflow method ', function (done) {
            expect(DB_Connector.cleanBeforeSaveWorkflow()).to.exist;
            done();
        });

        it('should have method to fetch the last workflow record, helps to add new record next', function (done) {
            expect(DB_Connector.getLastWorkflow()).to.exist;
            done();
        });

        it('should have method to create a new workflow to save to database', function (done) {
            expect(DB_Connector.createWorkflow()).to.exist;
            done();
        });

        it('should have method for saving workflow details onto the database', function (done) {
            expect(DB_Connector.saveWorkflow()).to.exist;
            done();
        });

        it('should have method to fetch the last record of the workflow-components to add new records', function (done) {
            expect(DB_Connector.getLastWorkflowComponent()).to.exist;
            done();
        });


        it('should have a method to fetch the list of workflows', function (done) {
            expect(DB_Connector.requestWorkflowList()).to.exist;
            done();
        });

    });

    describe('Checking the validating the settings preferences for the users', function () {
        it('Should have a method to read the user settings preferences for a particular user from database', function (done) {
            expect(DB_Connector.readUserSettings('HDtest2')).to.exist;
            done();
        });

        it('Should have a method save the user settings preferences to the  database', function (done) {
            expect(DB_Connector.writeUserSettings()).to.exist;
            done();
        });

        it('Should store the settings preferences of the selected user to the database', (done) => {
            let userId = 'HD987';
            let settings = '{"grid":true,"snap":true,"debug":false}';
            DB_Connector.writeUserSettings(userId, settings).then (result =>{
                assert.equal(result, 'save settings!!!');
                done();
            });
        });

        it('Should read the settings preferences of the selected user from the database', (done) => {
            let userId = 'HDtest2';
            let settings = '{"grid":true,"snap":false,"debug":false}';
            DB_Connector.readUserSettings(userId).then (result =>{
                assert.equal(result, settings);
                done();
            });
        });


    });

    describe('Should have method to Fetch, create and update the password for the user', function () {
        it('Checking if the function exits or not', function (done) {
            expect(DB_Connector.setUserPassword()).to.exist;
            done();
        });

        it('Checking if the function exits or not', function (done) {
            expect(DB_Connector.getPasswordHash('HD987')).to.exist;
            done();
        });

        it('Should update the password  by setUserPassword in the form of hash', (done) => {
            let userId = 'HDtest2';
            let password = 'teamalpha@123';
            let salt = bcrypt.genSaltSync(saltRounds);
            let hashPassword = bcrypt.hashSync(password, salt);
            DB_Connector.setUserPassword(userId, hashPassword).then(result =>{
                assert.equal(result, 'update the password!');
                done();
            });
        });

        it('Should get hash password from the database and compare with actual one', (done) => {
            let userId = 'HDtest2';
            let password = 'teamalpha@123';
            DB_Connector.getPasswordHash(userId).then (hash =>{
                let hashResult = bcrypt.compareSync(password,hash);
                assert.equal(hashResult, true);
                done();
            });
        });

    });

    describe ('Should have a function to retrieve all the input traces from the database', function () {
        it('Checking if the function exits or not', function (done) {
            expect(DB_Connector.readTraceAll()).to.exist;
            done();
        });

        it('Should check the trace table Object Keys details, if all attributes matches then test is successful', function (done) {
            DB_Connector.readTraceAll().then(res => {
                //console.log("................................................................")
                let result = Object.keys(res[0]);
                assert.equal(result[0], 'trace_id');
                assert.equal(result[1], 'trace_name');
                assert.equal(result[2], 'trace_description');
                assert.equal(result[3], 'trace_xcol_metadata');
                assert.equal(result[4], 'trace_ycol_metadata');
                assert.equal(result[5], 'trace_created_time');
                assert.equal(result[6], 'trace_path');
                //console.log(res);
                //expect(result).to.be.above(0);
                done();
            });
        });

        it ('Database should have at least one record of the trace for computation', function (done) {
            DB_Connector.readTraceAll().then(result =>{
               //console.log(result.length);
               Number.isInteger(result.length).should.be.true;
               expect(result.length).to.be.above(0);
            done();
            });
        });
    });



