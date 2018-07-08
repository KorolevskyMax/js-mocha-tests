require('chai').should();
var client = require('../utils/http_client');

describe('People tests', () => {
    var post_request = {
        message: "",
        entities: [{
            type: "PERSON",
            name: "people"
            }],
        locale: "ru",
        timeZone: "Europe/Minsk"
    };

    it('People get should return OK response', async () => {
        await client.people_get().then((response) => {
            response.statusCode.should.be.equal(200);
        });
    });

    it('People get should not return error', async () => {
        await client.people_get().then((response) => {
            response.error.should.be.equal(false);
        });
    });

    it('People post should return OK response', async () => {
        await client.people_post(post_request).then((response) => {
            response.statusCode.should.be.equal(200);
        });
    });

    it('People post should contain text in response', async () => {
        await client.people_post(post_request).then((response) => {
            response.res.text.should.not.be.equal(null);
        });
    });

    it('People post should not return error', async () => {
        await client.people_post(post_request).then((response) => {
            response.error.should.be.equal(false);
        });
    });
});