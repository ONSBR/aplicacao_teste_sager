const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config');
const ManterCenarioController = require('./controllers/mantercenariocontroller');
const app = express();
const path = require('path');
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

let manterCenarioController = new ManterCenarioController();

app.post("/pesquisarCenarios", (req, res) => {
    manterCenarioController.pesquisarCenarios(req, res);
});

app.post("/pesquisarUsinaPorIdUsina", (req, res) => {
    manterCenarioController.pesquisarUsinaPorIdUsina(req, res);
});

app.get("/listarUsinas", (req, res) => {
    manterCenarioController.listarUsinas(req, res);
});

app.get("/listarUnidadesGeradoras", (req, res) => {
    manterCenarioController.listarUnidadesGeradoras(req, res);
});

app.get("/obterRegrasCriticas", (req, res) => {
    manterCenarioController.obterRegrasCriticas(req, res);
});

app.post("/alterarCenario", (req, res) => {
    manterCenarioController.alterarCenario(req, res);
});

app.put("/inserirCenario", (req, res) => {
    manterCenarioController.inserirCenario(req, res);
});

app.delete("/excluirCenario", (req, res) => {
    manterCenarioController.excluirCenario(req, res);
});

app.post("/ativarInativarCenario", (req, res) => {
    manterCenarioController.ativarInativarCenario(req, res);
});

module.exports = function(){
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
};