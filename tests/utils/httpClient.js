var should = require('chai').should();
var request = require('request');

// /ping	// maps to /msg
ping = () => {
    return request.get('/ping', { json: { key: 'value' } }, (error, response, body) => {
        should.not.exist(error);
        should.exist(response);

        return {
            response: response,
            body: body,
            error: error
        };
    })
};

// /people	// as a GET takes a query parameter of the name of a person, as a POST takes the same parameters as as /msg and returns a Person info object.
people_get = () => {
    return request.get('/people', { json: { key: 'value' } }, (error, response, body) => {
        should.not.exist(error);
        should.exist(response);

        return {
            response: response,
            body: body,
            error: error
        };
    })
};

// /people	// as a POST takes the same parameters as as /msg and returns a Person info object.
people_post = () => {
    return request.post('/people', { json: { key: 'value' } }, (error, response, body) => {
        should.not.exist(error);
        should.exist(response);

        return {
            response: response,
            body: body,
            error: error
        };
    })
};

        // /	// serves static files from public and is not required for functional testing
        //
        // /msg	// this is the primary interface. It accepts a simple GET with query parameter message  or ping.
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
        //
        // /people	// as a GET takes a query parameter of the name of a person, as a POST takes the same parameters as
        // as /msg and returns a Person info object.
        //
        // /contract // takes a query parameter where the key is a contract id (no value).
        // If the user is authenticated, it walks through the workflow to complete signing a contract if it is ready to
        // sign. If not authenticated, it prompts the user to authenticate and complete the open side of the contract.
        // If neither condition is met, it returns a user friendly error.
        //
        // /project	// same as with contract, takes a key that is the project id with no value and walks through the
        // project workflow depending on the state of the project and if the user is authenticated or not.
