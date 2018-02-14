const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config');
const PesquisarHistoricoTaxasController = require('./controllers/pesquisarhistoricotaxascontroller');
const ListarUsinasController = require('./controllers/listarusinascontroller');
const ListarTipoTaxaController = require('./controllers/listartipotaxacontroller');
const MemoriaProcessamentoController = require('./controllers/memoriaprocessamentocontroller');

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

let listarTipoTaxaController = new ListarTipoTaxaController();

app.get("/listartipotaxa", (req, res) => {
    listarTipoTaxaController.listarTipoTaxa(req, res);
});

let listarUsinasController = new ListarUsinasController();

app.get("/listarusinas", (req, res) => {
    listarUsinasController.listarUsinas(req, res);
});

let memoriaProcessamentoController = new MemoriaProcessamentoController();

app.post("/getMemoriaDeProcessamento", (req, res) => {
    memoriaProcessamentoController.getMemoriaDeProcessamento(req, res);
});

app.get("/downloadMemoriaProcessamentoXlsx", (req, res) => {
    memoriaProcessamentoController.downloadMemoriaProcessamentoXlsx(req, res);
});

let pesquisarHistoricoTaxasController = new PesquisarHistoricoTaxasController();

app.post("/pesquisarhistorico", (req, res) => {
    pesquisarHistoricoTaxasController.pesquisarHistorico(req, res);
});

app.post("/pesquisartaxaporid", (req, res) => {
    pesquisarHistoricoTaxasController.pesquisarTaxasAPartirIdFechamento(req, res);
});

app.post("/pesquisarfechamentomensalporid", (req, res) => {
    pesquisarHistoricoTaxasController.pesquisarFechamentoMensalPorId(req, res);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});