var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();


require('../public/javascripts/GUI/database-connector.js');




// var classElement = {classname: 'componentsOnWorkflow'};
// addClass(classElement,'componentsOnWorkflow');
// var classElement = database_connector.componentsOnWorkflow;

describe('Checking the responsible module for connection between GUI and server', function(){
    it('Should check the Compatibility of the components', function(done){
        expect(databaseConnector.loadFlow()).exist;
        //assert(typeof databaseConnector === 'function')
         //databaseConnector.loadFlow(1).then(result => {
           // console.log(result);
            done();

    });
});
