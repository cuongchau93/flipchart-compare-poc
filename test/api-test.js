process.env.NODE_ENV = 'test';

// here after are global scope variable that are defined without var or let or const
fs = require('fs');
postBody = JSON.parse(fs.readFileSync('test/data/postRequestBody.json', 'utf8'));

chai = require('chai');
chai.use(require('chai-string'));
chai.use(require('chai-http'));
expect = chai.expect;
serviceConfig = require('../config');
routing = serviceConfig.routing;

server = require('../server');

prefix = "/omni/service/questionnaire";
nextHrefEndingString = "?_start=21&_num=20";
firstHrefEndingString = "?_start=1&_num=20";

importTest = function(name, path) {
    describe(name, function() {
        require(path);
    });
};

describe('Compare Service Test', function() {
    this.timeout(100000);    // increase the default timeout
    
    before(function (done) {
        setTimeout(done, 5000); // waiting for server to start
    });

    // each batch can run when other batches are commented out
    // first batch
    importTest('Compare Controller Test', "./compareControllerTest.js");
});