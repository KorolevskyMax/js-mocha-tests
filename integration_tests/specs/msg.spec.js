require('chai').should();
var client = require('../utils/http_client');

describe('Message tests', () => {
    var post_request = {
        message: null,
        entities: [{
            type: "PERSON",
            name: "Fora",
            people: {
                people: "Fora"
            }
        }],
        ping: 30000,
        locale: "ru",
        timeZone: "Europe/Minsk",
        offset: -180
    };

    it('Message post should return OK response', async () => {
        await client.msg(post_request).then((response) => {
            response.statusCode.should.be.equal(200);
        });
    });

    it('Message should contain text in response', async () => {
        await client.msg(post_request).then((response) => {
            response.res.text.should.not.be.equal(null);
        });
    });

    it('Message should not return error', async () => {
        await client.msg(post_request).then((response) => {
            response.error.should.be.equal(false);
        });
    });
});