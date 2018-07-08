var chai = require('chai'), chaiHttp = require('chai-http');

var app = 'http://localhost:8000';

chai.use(chaiHttp);

var http_client = Object.create(null, {
    // /	// serves static files from public and is not required for functional testing
    server_statistic: { value: () => Promise.resolve(chai.request(app).get('/')) },

    // /msg	// this is the primary interface. It accepts a simple GET with query parameter message or ping.
    // These serve the same functions as a POST to /msg
    // POST to /msg takes a JSON body of the form:
    // {
    //     message:     //the command to the server
    //     entities:    //context for the command such as a person, note, task, or project
    //     ping:        //whether this is an automated ping back
    //     locale:      //the client locale e.g. en-US
    //     timeZone:    //the client timezome e.g. America/New_York
    //     offset:      //hours offset from GMT
    // }
    msg: { value: (request) => Promise.resolve(chai.request(app).post('/msg').send(request))},

    // /ping	// maps to /msg
    ping: { value: () => Promise.resolve(chai.request(app).get('/ping'))},

    // /people	// as a GET takes a query parameter of the name of a person
    people_get: { value: () => Promise.resolve(chai.request(app).get('/people'))},

    // /people	// as a POST takes the same parameters as as /msg and returns a Person info object.
    people_post: { value: (request) => Promise.resolve(chai.request(app).post('/people').send(request))},

    // /contract // takes a query parameter where the key is a contract id (no value).
    // If the user is authenticated, it walks through the workflow to complete signing a contract if it is ready to
    // sign. If not authenticated, it prompts the user to authenticate and complete the open side of the contract.
    // If neither condition is met, it returns a user friendly error.
    contract: { value: (contract_id) => Promise.resolve(chai.request(app).get('/contract?' + contract_id))},

    // /project	// same as with contract, takes a key that is the project id with no value and walks through the
    // project workflow depending on the state of the project and if the user is authenticated or not.
    project: { value: (project_id) => Promise.resolve(chai.request(app).get('/project?' + project_id))}
});

module.exports = http_client;
