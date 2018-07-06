var should = require('chai').should();
var client = require('../utils/http_client');

describe('Ping tests', () => {
    it('Ping should return OK response', () => {
        var response = client.ping();
        should.equal(response.statusCode, 200);
    });

    it('Ping should not return error', () => {
        var response = client.ping();
        should.not.exist(response.error);
    });
});