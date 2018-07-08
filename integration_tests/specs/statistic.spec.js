require('chai').should();
var client = require('../utils/http_client');

describe('Server statistic', () => {
    it('Server statistic should return OK response', async () => {
        await client.server_statistic().then((response) => {
            response.statusCode.should.be.equal(200);
        });
    });

    it('Server statistic should not return error', async () => {
        await client.server_statistic().then((response) => {
            response.error.should.be.equal(false);
        });
    });
});