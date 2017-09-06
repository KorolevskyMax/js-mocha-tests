const request = require('request');
const config = require('config').get("mockServer");

createClient = function (user_id, email, cb) {
    request.post(config.apiBase + config.port + config.routes.clients,
        {
            json: {
                user_id: user_id,
                email: email
            }
        }, function (error, response, body) {
            cb(error, response, body);
        });
};

getClient = function (user_id) {
    request.get(config.apiBase + config.port + config.routes.client.format(user_id),
        function (error, response, body) {
            cb(error, response, body);
        });
};

module.exports = {
    createClient,
    getClient
};