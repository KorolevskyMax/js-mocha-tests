const express = require("express");
const login = require('./routes/loginRoutes');
const bodyParser = require('body-parser');
const mockServer = require('./mockServer/server');

let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
let router = express.Router();

// test route
router.get('/', function (req, res) {
    res.json({message: 'welcome to our upload module apis'});
});

//route to handle user registration
router.post('/register', login.register);
router.post('/login', login.login);
app.use('/api', router);
app.listen(5000);
console.log("API Server is listening on http://localhost:5000/api/");
mockServer.runMockServer();