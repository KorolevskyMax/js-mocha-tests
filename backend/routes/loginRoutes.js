const bcrypt = require('bcrypt');
const dbConnection = require('../dbAccess/dbAccess');
const mockApi = require('../mockServerAPI/api');
dbConnection.eraseDB();

validateRegister = function (values) {
    var errors = {};
    const requiredFields = [
        'email',
        'password',
        'retypePassword'
    ];
    requiredFields.forEach(function (field) {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    if (values.retypePassword && values.password !== values.retypePassword) {
        errors.retypePassword = 'Retype Password should be equal to Password';
    }
    return errors;
};

validateLogin = function (values) {
    var errors = {};
    const requiredFields = [
        'email',
        'password'
    ];
    requiredFields.forEach(function (field) {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    return errors;
};

exports.register = function (req, res) {
    console.log('Captured registration request:', req.body);
    console.log("req", req.body);
    var today = new Date();
    var errors = validateRegister(req.body);
    if (Object.keys(errors).length) {
        res.send({
            "code": 400,
            "errors": errors
        });
    }
    else {
        bcrypt.hash(req.body.password, 5, function (err, bcryptedPassword) {

            var user = {
                "email": req.body.email,
                "password": bcryptedPassword,
                "created": today,
                "modified": today
            };
            dbConnection.createUser(user, function (error, results) {
                if (error) {
                    console.log("Error occurred", error);
                    if (error.code === 'ER_DUP_ENTRY') {
                        errors.error = "Hello, " + user.email + " seems that you're already registered, try to login";
                    }
                    else {
                        errors.error = "Error occurred";
                    }
                    res.send({
                        "code": 400,
                        "errors": errors
                    })
                } else {
                    mockApi.createClient(results.insertId, user.email,
                        function (error, response, body) {
                            if (!error && response.statusCode === 201) {
                                var client = {
                                    "client_id": body.body.id,
                                    "user_id": results.insertId,
                                    "created": today,
                                    "modified": today
                                };
                                dbConnection.createClient(client, function (error, results) {
                                    if (error) {
                                        console.log("Error occurred", error);
                                        errors.error = "Error occurred";
                                        res.send({
                                            "code": 400,
                                            "errors": errors
                                        })
                                    } else {
                                        res.send({
                                            "code": 200,
                                            "id": results.insertId,
                                            "success": "User registered successfully"
                                        });
                                    }
                                });
                            } else {
                                errors.thirdPartyError = "Error occurred while connecting to mocks server";
                                res.send({
                                    "code": 400,
                                    "errors": errors
                                })
                            }
                        }
                    );
                }
            });
        });
    }
};

exports.login = function (req, res) {
    console.log('Captured login request:', req.body);
    var errors = validateLogin(req.body);
    if (Object.keys(errors).length) {
        res.send({
            "code": 400,
            "errors": errors
        });
    }
    else {
        var email = req.body.email;
        var password = req.body.password;
        dbConnection.findUser([email], function (error, results) {
            if (error) {
                console.log("error ocurred", error);
                errors.error = "Error occurred";
                res.send({
                    "code": 400,
                    "errors": errors
                });
            } else {
                if (results.length > 0) {
                    bcrypt.compare(password, results[0].password, function (err, doesMatch) {
                        if (doesMatch) {
                            res.send({
                                "code": 200,
                                "success": "Login successful"
                            });
                        } else {
                            errors.error = "Invalid login or/and password";
                            res.send({
                                "code": 400,
                                "errors": errors
                            });
                        }
                    });
                }
                else {
                    errors.error = "Invalid login or/and password";
                    res.send({
                        "code": 400,
                        "errors": errors
                    });
                }
            }
        });
    }
};