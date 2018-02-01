const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config');
const PesquisarHistoricoTaxasController = require('./controllers/pesquisarhistoricotaxascontroller');
const ListarUsinasController = require('./controllers/listarusinascontroller');
const ListarTipoTaxaController = require('./controllers/listartipotaxacontroller');

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

app.get("/listar-tipo-taxa", (req, res) => {
    listarTipoTaxaController.listarTipoTaxa(req, res);
});

let listarUsinasController = new ListarUsinasController();

app.get("/listar-usinas", (req, res) => {
    listarUsinasController.listarUsinas(req, res);
});

let pesquisarHistoricoTaxasController = new PesquisarHistoricoTaxasController();

app.post("/pesquisar-historico", (req, res) => {
    pesquisarHistoricoTaxasController.pesquisarHistorico(req, res);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});