const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config');
const ListarUsinasController = require('./controllers/listarusinascontroller');

const app = express();
const PORT = config.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

let listarUsinasController = new ListarUsinasController();

app.get("/listarusinas", (req, res) => {
    listarUsinasController.listarUsinas(req, res);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});