const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')
const config = require('./config');
const ListarUsinasController = require('./controllers/listarusinascontroller');
const PesquisarEventosController = require('./controllers/pesquisareventoscontroller');
const ManterTarefasController = require('./controllers/mantertarefascontroller');

const app = express();
const PORT = config.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

let listarUsinasController = new ListarUsinasController();

app.get("/listarusinas", (req, res) => {
    listarUsinasController.listarUsinas(req, res);
});

let pesquisarEventosController = new PesquisarEventosController();

app.get("/pesquisareventos", (req, res) => {
    pesquisarEventosController.pesquisarEventos(req, res);
});

let manterTarefasController = new ManterTarefasController();

app.post("/inserirtarefa", (req, res) => {
    manterTarefasController.inserirTarefa(req, res);
});

app.post("/uploadplanilha", (req, res) => {
    manterTarefasController.uploadPlanilha(req, res);
});

app.post("/excluirtarefa", (req, res) => {
    manterTarefasController.excluirTarefa(req, res);
});

app.get("/listartarefas", (req, res) => {
    manterTarefasController.listarTarefas(req, res);
});

app.get("/downloadplanilha", (req, res) => {
    manterTarefasController.downloadPlanilha(req, res);
});

app.get("/aplicartarefa", (req, res) => {
    manterTarefasController.aplicarTarefa(req, res);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});