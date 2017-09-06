const axios = require('axios');
const apiBaseUrl = "http://localhost:5000/api/";
const endpoints = {
    login: 'login',
    register: 'register'
};

exports.login = function(email, password, cb) {
    var payload = {
        "email": email,
        "password": password
    };
    var resp = {};
    axios.post(apiBaseUrl + endpoints.login, payload)
        .then(function (response) {
            if (response.data.code === 200) {
                resp = {
                    message: "Login successful",
                    response: response.data
                };
            }
            else if (response.data.code === 400) {
                resp = {
                    error: response.data.errors.error,
                    response: response.data
                };
            }
            else {
                resp = {
                    error: response.data.errors.error,
                    response: response.data
                };
            }
            return cb(resp);
        })
        .catch(function (error) {
            console.log(error);
            resp = {
                error: "Unexpected error occurred",
                response: error
            };
            return cb(resp);
        });
};

exports.register = function(email, password, retypePassword, cb) {
    var payload = {
        "email": email,
        "password": password,
        "retypePassword": retypePassword
    };
    var resp = {};
    axios.post(apiBaseUrl + endpoints.register, payload)
        .then(function (response) {
            if (response.data.code === 200) {
                resp = {
                    message: "Registration successful",
                    response: response.data
                };
            }
            else {
                resp = {
                    error: response.data.errors.error,
                    response: response.data
                };
            }
            return cb(resp);
        })
        .catch(function (error) {
            console.log(error);
            resp = {
                error: "Unexpected error occurred",
                response: error
            };
            return cb(resp);
        });
};
