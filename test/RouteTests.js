const assert = require('chai').assert;
let describe = require('mocha').describe;
let it = require('mocha').it;
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
var express = require('express');
var router = express.Router();

describe('Unit testing the HyperDAP Routes', function() {

    it('should return a function with router methods', function() {
        assert(typeof router === 'function')
        assert(typeof router.get === 'function')
        assert(typeof router.handle === 'function')
        assert(typeof router.use === 'function')
        assert(typeof router.post === 'function')
    });

    it('Get \'/\' (HyperDAP Home Page)', function() {
      return request(app)
        .get('/')
        .then(function(response){
            assert.equal(response.status, 302) //302 is redirection
        })
    });

    it('Login test', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
            assert.equal(response.status, 302)
            });
    });

    it('Post get_result_data', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/get_result_data')
                .send([0,1])
                .then(function(response) {
                assert.equal(response.status, 200)
                    });
            });
            
    });


    // it('Post adminlogin should redirect to admin page or adminlogin based on userid', function () {
    //     return request(app)
    //         .post('/adminlogin')
    //         .send(['HDtest','mypassword1'])
    //         .then(function(response) {
    //             assert.equal(response.status, 200) // 302 -- Should redirect to Admin page
    //         });
    // });

    // it('Get \'/adminlogin\' ', function() {
    //     return request(app)
    //         .get('/adminlogin')
    //         .then(function(response){
    //             assert.equal(response.status, 200)
    //         })
    // });

    it('Get \'/admin\' render login page so status should be 200', function() {
        return request(app)
            .get('/admin')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });

    it('Post admin_filter displays the logfile based on admin credentials, no of logs, asc/dsc', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/admin_filter')
                .send(['HDtest', 10, null, null])
                .then(function(response) {
                    assert.equal(response.status, 200)
                });
            });

    });

    it('Post Login should redirect to hyperdap /  based on login credentials', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302) // 302 -- Should redirect to Admin page
            });
    });

    it('Post Login should redirect to hyperdap /  based on login credentials', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1111" // wrong password
            })
            .then(function(response) {
                assert.equal(response.status, 200) // 302 -- Should redirect to Admin page
            });
    });


    it('Get login', function() {
        return request(app)
            .get('/login')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });

    it('Post Logout should redirect to login page', function () {
        return request(app)
            .post('/logout')
            .then(function(response) {
                assert.equal(response.status, 302) // 302 -- Should redirect to Login page
            });
    });

    it('Post Add_log should log the users action', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/add_log')
                .send(['HDtest','User Action test'])
                .then(function(response) {
                    assert.equal(response.status, 200) // 302 -- Should redirect to Login page
                });
            });
            
    });

    it('Post check_login_user should check whether the session is active for the user or not', function () {
        return request(app)
            .post('/check_login_user')
            .then(function(response){

            //console.log(response);
                assert.equal(response.status, 200)
            });
    });

    // it('new test 1', function () {
    //     return request(app)
    //         .post('/login')
    //         .send({"username": "HDtest", "password": "mypassword1"})
    //         .then(function(response) {
    //             assert.equal(response.status, 200)
    //         })
    //         .post('/check_login_user')
    //         .then(function(response){
    //            assert.equal(response,200);
    //         });
    // });

    it('Post set_password should reset the password', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/set_password')
                .send(['HD565','Password123'])
                .then(function(response) {
                    assert.equal(response.status, 200)
                });
            });
    });

    it('Post Check Password for a user valid or not', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/check_password')
                .send(['HD565','Password123'])
                .then(function(response) {
                    assert.equal(response.status, 200)
                });
            });
    });

    it('Post to read the local data', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/read_local_data')
                .send(['CH1-DTS/channel 1 20140718 001 00001.ddf'])
                .then(function(response) {
                    assert.equal(response.status, 200)
                });
            });
    });

    it('Get get_valid_path of the connections in the workchain', function() {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .get('/get_valid_path')
                .then(function(response){
                    assert.equal(response.status, 200)
                })
            });
    });

    it('Get mocha - for the testing', function() {
        return request(app)
            .get('/mocha')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });

    it('Post read the user settings', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/read_settings')
                .then(function(response) {
                    assert.equal(response.status, 200)
                });
            });
    });
    it('Post load the user settings', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/write_settings')
                .then(function(response) {
                    assert.equal(response.status, 200)
                });
            });
    });

    it('Post read input traces', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/read_input')
                .send(['0','CH1-DTS/channel 1 20140718 001 00010.ddf',1])
                .then(function(response) {
                    assert.equal(response.status, 200)
                });
            });
    });

    it('Post fetch trace list', function () {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/trace_list')
                .then(function(response) {
                    assert.equal(response.status, 200)
                });
            });
    });



    it('Get \'/workflow-frame\' (iframe for the workflow tab)', function() {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .get('/workflow-frame')
                .then(function(response){
                    assert.equal(response.status, 200)
                });
            });
    });

    it('Post \'/check_compatibility\'', function() {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/check_compatibility')
                .then(function(response){
                    assert.equal(response.status, 200)
                });
            });
    });

    it('Post \'/computation\'', function() {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/computation')
                .send([1,2])
                .then(function(response){
                    assert.equal(response.status, 200)
                });
            });
    });

    it('Post \'/computation_output\'', function() {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/computation_output')
                .send([0,0,1])
                .then(function(response){
                    assert.equal(response.status, 200)
                })
            });
    });



    it('Post \'/workflow_list\'', function() {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/workflow_list')
                .then(function(response){
                    assert.equal(response.status, 200)
                })
            });
    });

    it('Post \'/load_workflow\'', function() {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/load_workflow')
                .send([1])
                .then(function(response){
                    //console.log ('................................');
                    //console.log(response.text);
                    assert.equal(response.status, 200)
                });
            });
    });

    it('Post \'/delete_workflow\'', function() {
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/delete_workflow')
                .send([1])
                .then(function(response){
                    //console.log ('................................');
                    //console.log(response.text);
                    assert.equal(response.status, 200)
                });
            });
    });

    it('Post \'/save_workflow\' expecting the response from the router if successful', function() {
        let data = { workflowName: 'Workflow 1',
            array:
                [ { localId: '0',
                    componentId: 0,
                    transform: 'translate(200px, 60px)',
                    inputComponents: [],
                    outputComponents: [Array] },
                    { localId: '1',
                        componentId: 1,
                        transform: 'translate(800px, 400px)',
                        inputComponents: [Array],
                        outputComponents: [] },
                    { localId: '2',
                        componentId: 4,
                        transform: 'translate(329.867px, 246.267px)',
                        inputComponents: [Array],
                        outputComponents: [Array] },
                    { localId: '3',
                        componentId: 2,
                        transform: 'translate(618.867px, 286.067px)',
                        inputComponents: [Array],
                        outputComponents: [Array] } ] };
        return request(app)
            .post('/login')
            .send({
                "username": "HDtest",
                "password": "mypassword1"
            })
            .then(function(response) {
                assert.equal(response.status, 302);
                request(app)
                .post('/save_workflow')
                .send(data)
                .then(function(response){
                    assert.equal(response.status, 200)
                });
            });
    });

});