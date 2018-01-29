var config = require('./config');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = config.PORT;

var Client = require('node-rest-client').Client;

// Set up the Express application to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

app.get("/listar-usinas", function (req, res) {

    console.log("___LISTAR USINAS___" + req.body.presentationId);
    let client = new Client();

    let listarUsinasReq = client.get(config.urlUsinaSAGER, function (data, response) {
        console.log(data);
        res.send(data);
    });
    listarUsinasReq.on('error', function (err) {
        console.log('request error', err);
    });
});

// Listener
// ===========================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});