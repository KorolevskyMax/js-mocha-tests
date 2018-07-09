require('chai').should();
var client = require('../utils/http_client');
var expected_info = require('../test_data/expected_info');

describe('Message tests', () => {
    var post_request = { message: null };

    // Post requests

    it('Post: Message request should return OK response', async () => {
        await client.msg_post(post_request).then((response) => {
            response.statusCode.should.be.equal(200);
        });
    });

    it('Post: Message response should contain text in response', async () => {
        await client.msg_post(post_request).then((response) => {
            response.res.text.should.not.be.equal(null);
        });
    });

    it('Post: Message response should not return error', async () => {
        await client.msg_post(post_request).then((response) => {
            response.error.should.be.equal(false);
        });
    });

    it('Post: Message response should contain id', async () => {
        await client.msg_post(post_request).then((response) => {
            JSON.parse(response.res.text).id.should.not.be.equal(null);
        });
    });

    it('Post: About message: should not be empty', async () => {
        var about_request = { message: "about" };
        await client.msg_post(about_request).then((response) => {
            response.res.text.should.not.be.equal(null);
        });
    });

    it('Post: About message: should contain reply', async () => {
        var about_request = { message: "about" };
        await client.msg_post(about_request).then((response) => {
            JSON.parse(response.res.text).reply.should.not.be.equal(null);
        });
    });

    it('Post: About message: should contain info', async () => {
        var about_request = { message: "about" };
        await client.msg_post(about_request).then((response) => {
            JSON.parse(response.res.text).info.should.not.be.equal(null);
        });
    });

    it('Post: About message: info should be valid', async () => {
        var about_request = { message: "about" };
        await client.msg_post(about_request).then((response) => {
            JSON.parse(response.res.text).info.should.be.deep.equal(expected_info);
        });
    });

    it('Post: Default message: should not be empty', async () => {
        var default_request = { message: "default" };
        await client.msg_post(default_request).then((response) => {
            response.res.text.should.not.be.equal(null);
        });
    });

    it('Post: Default message: should contain reply', async () => {
        var default_request = { message: "default" };
        await client.msg_post(default_request).then((response) => {
            JSON.parse(response.res.text).reply.should.not.be.equal(null);
        });
    });

    it('Post: Help message: should not be empty', async () => {
        var help_request = { message: "help" };
        await client.msg_post(help_request).then((response) => {
            response.res.text.should.not.be.equal(null);
        });
    });

    it('Post: Help message: should contain reply', async () => {
        var help_request = { message: "help" };
        await client.msg_post(help_request).then((response) => {
            JSON.parse(response.res.text).reply.should.not.be.equal(null);
        });
    });

    it('Post: Help "faq" message: should contain reply', async () => {
        var help_request = { message: "faq" };
        await client.msg_post(help_request).then((response) => {
            JSON.parse(response.res.text).reply.should.not.be.equal(null);
        });
    });

    it('Post: Help "faq" message: should contain hint', async () => {
        var help_request = { message: "faq" };
        await client.msg_post(help_request).then((response) => {
            JSON.parse(response.res.text).hint.should.not.be.equal(null);
        });
    });

    it('Post: Help "faq" message: should contain suggestion', async () => {
        var help_request = { message: "faq" };
        await client.msg_post(help_request).then((response) => {
            JSON.parse(response.res.text).suggestion.should.not.be.equal(null);
        });
    });

    it('Post: Help "connect" message: should contain reply', async () => {
        var help_request = { message: "connect" };
        await client.msg_post(help_request).then((response) => {
            JSON.parse(response.res.text).reply.should.not.be.equal(null);
        });
    });

    it('Post: Help "connect" message: should contain answers', async () => {
        var help_request = { message: "connect" };
        await client.msg_post(help_request).then((response) => {
            JSON.parse(response.res.text).answers.should.not.be.equal(null);
        });
    });

    it('Post: Help "connect with fora" message: should contain reply', async () => {
        var help_request = { message: "connect with fora" };
        await client.msg_post(help_request).then((response) => {
            JSON.parse(response.res.text).reply.should.not.be.equal(null);
        });
    });

    it('Post: Help "connect with fora" message: should contain answers', async () => {
        var help_request = { message: "connect with fora" };
        await client.msg_post(help_request).then((response) => {
            JSON.parse(response.res.text).answers.should.not.be.equal(null);
        });
    });

    // Get requests

    it('Get: Message request should return OK response', async () => {
        await client.msg_get().then((response) => {
            response.statusCode.should.be.equal(200);
        });
    });

    it('Get: Message response should contain text in response', async () => {
        await client.msg_get().then((response) => {
            response.res.text.should.not.be.equal(null);
        });
    });

    it('Get: Message response should not return error', async () => {
        await client.msg_get().then((response) => {
            response.error.should.be.equal(false);
        });
    });

    it('Get: Message response should contain id', async () => {
        await client.msg_get().then((response) => {
            JSON.parse(response.res.text).id.should.not.be.equal(null);
        });
    });

    it('Get: About message: should not be empty', async () => {
        await client.msg_get("About").then((response) => {
            response.res.text.should.not.be.equal(null);
        });
    });

    it('Get: About message: should contain reply', async () => {
        await client.msg_get("About").then((response) => {
            JSON.parse(response.res.text).reply.should.not.be.equal(null);
        });
    });

    it('Get: About message: should contain info', async () => {
        await client.msg_get("About").then((response) => {
            JSON.parse(response.res.text).info.should.not.be.equal(null);
        });
    });

    it('Get: About message: info should be valid', async () => {
        await client.msg_get("About").then((response) => {
            JSON.parse(response.res.text).info.should.be.deep.equal(expected_info);
        });
    });

    it('Get: Default message: should not be empty', async () => {
        await client.msg_get("default").then((response) => {
            response.res.text.should.not.be.equal(null);
        });
    });

    it('Get: Default message: should contain reply', async () => {
        await client.msg_get("default").then((response) => {
            JSON.parse(response.res.text).reply.should.not.be.equal(null);
        });
    });

    it('Get: Help message: should not be empty', async () => {
        await client.msg_get("help").then((response) => {
            response.res.text.should.not.be.equal(null);
        });
    });

    it('Get: Help message: should contain reply', async () => {
        await client.msg_get("help").then((response) => {
            JSON.parse(response.res.text).reply.should.not.be.equal(null);
        });
    });

    it('Get: Help "faq" message: should contain reply', async () => {
        await client.msg_get("faq").then((response) => {
            JSON.parse(response.res.text).reply.should.not.be.equal(null);
        });
    });

    it('Get: Help "faq" message: should contain hint', async () => {
        await client.msg_get("faq").then((response) => {
            JSON.parse(response.res.text).hint.should.not.be.equal(null);
        });
    });

    it('Get: Help "faq" message: should contain suggestion', async () => {
        await client.msg_get("faq").then((response) => {
            JSON.parse(response.res.text).suggestion.should.not.be.equal(null);
        });
    });

    it('Get: Help "connect" message: should contain reply', async () => {
        await client.msg_get("connect").then((response) => {
            JSON.parse(response.res.text).reply.should.not.be.equal(null);
        });
    });

    it('Get: Help "connect" message: should contain answers', async () => {
        await client.msg_get("connect").then((response) => {
            JSON.parse(response.res.text).answers.should.not.be.equal(null);
        });
    });

    it('Get: Help "connect with fora" message: should contain reply', async () => {
        await client.msg_get("connect with fora").then((response) => {
            JSON.parse(response.res.text).reply.should.not.be.equal(null);
        });
    });

    it('Get: Help "connect with fora" message: should contain answers', async () => {
        await client.msg_get("connect with fora").then((response) => {
            JSON.parse(response.res.text).answers.should.not.be.equal(null);
        });
    });
});