const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const config = require('./config');
const ReprocessamentoController = require('./controllers/reprocessamentocontroller');

const app = express();
const PORT = config.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

let reprocessamentoController = new ReprocessamentoController();

app.get("/listarreprocessamentospendentes", (req, res) => {
    reprocessamentoController.listarReprocessamentosPendentes(req, res);
});

module.exports = function(){
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
};