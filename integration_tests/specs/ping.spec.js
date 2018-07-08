require('chai').should();
var client = require('../utils/http_client');

describe('Ping tests', () => {
    it('Ping should return OK response', async () => {
        await client.ping().then((response) => {
            response.statusCode.should.be.equal(200);
        });
    });

    it('Ping should not return error', async () => {
        await client.ping().then((response) => {
            response.error.should.be.equal(false);
        });
    });
});