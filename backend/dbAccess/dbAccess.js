let config = require('config');
let mysql = require('mysql');

let options = config.get("dbOptions");

connection = mysql.createConnection(options);
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ...");
    } else {
        console.log("Error connecting database ...", err.code);
    }
});

createUser = function (users, cb) {
    connection.query('INSERT INTO signup.users SET ?', users, function (error, results, fields) {
        cb(error, results);
    });
};

findUser = function (email, cb) {
    connection.query('SELECT * FROM signup.users WHERE email = ?', [email], function (error, results, fields) {
        cb(error, results);
    });
};

createClient = function (users, cb) {
    connection.query('INSERT INTO signup.clients SET ?', users, function (error, results, fields) {
        cb(error, results);
    });
};

findClient = function (email, cb) {
    connection.query('SELECT * FROM signup.clients WHERE user_id = ?', [email], function (error, results, fields) {
        cb(error, results);
    });
};


eraseDB = function () {
    connection.query('CREATE DATABASE IF NOT EXISTS `signup`;');
    connection.query('DROP TABLE IF EXISTS `signup`.`users`;');
    connection.query('CREATE TABLE IF NOT EXISTS `signup`.`users` (\n' +
        ' `id` int(11) NOT NULL AUTO_INCREMENT,\n' +
        ' `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL UNIQUE,\n' +
        ' `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,\n' +
        ' `created` datetime NOT NULL,\n' +
        ' `modified` datetime NOT NULL,\n' +
        ' PRIMARY KEY (`id`)\n' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;');
    connection.query('DROP TABLE IF EXISTS `signup`.`clients`;');
    connection.query('CREATE TABLE IF NOT EXISTS `signup`.`clients` (\n' +
        ' `id` int(11) NOT NULL AUTO_INCREMENT,\n' +
        ' `client_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,\n' +
        ' `user_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,\n' +
        ' `created` datetime NOT NULL,\n' +
        ' `modified` datetime NOT NULL,\n' +
        ' PRIMARY KEY (`id`)\n' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;');
};

module.exports = {
    createUser,
    findUser,
    createClient,
    findClient,
    eraseDB
};