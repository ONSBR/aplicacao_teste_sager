webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div>\n  <app-consultar-historico-taxas></app-consultar-historico-taxas>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__consultar_historico_taxas_consultar_historico_taxas_component__ = __webpack_require__("../../../../../src/app/consultar-historico-taxas/consultar-historico-taxas.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_4__consultar_historico_taxas_consultar_historico_taxas_component__["a" /* ConsultarHistoricoTaxasComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/consultar-historico-taxas/consultar-historico-taxas.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/consultar-historico-taxas/consultar-historico-taxas.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>\n  Histórico de taxas</h2>\n\n<table border=\"0\">\n  <tr>\n    <td width=\"500\" style=\"vertical-align:top\">\n      <fieldset style=\"height: 110px\">\n        <div>\n          <span>Usina:\n            <select [(ngModel)]=\"filtroConsulta.usina\">\n              <option *ngFor=\"let usina of usinas\" [ngValue]=\"usina\">\n                {{usina.nome}}\n              </option>\n            </select>\n          </span>\n        </div>\n        <div>\n          <span>Tipo de taxa:\n            <select [(ngModel)]=\"filtroConsulta.tipoTaxa\">\n              <option *ngFor=\"let tipoTaxa of tiposTaxa\" [ngValue]=\"tipoTaxa\">\n                {{tipoTaxa.nome}}\n              </option>\n            </select>\n          </span>\n        </div>\n        <div>\n          <span>\n            Mês Inicial:\n            <select [(ngModel)]=\"filtroConsulta.mesInicial\">\n              <option *ngFor=\"let mes of meses\" [ngValue]=\"mes\">\n                {{mes}}\n              </option>\n            </select>\n            Ano Inicial:\n            <input [(ngModel)]=\"filtroConsulta.anoInicial\" size=\"4\"/>\n          </span>\n        </div>\n        <div>\n          <span>\n            Mês Final:\n            <select [(ngModel)]=\"filtroConsulta.mesFinal\">\n              <option *ngFor=\"let mes of meses\" [ngValue]=\"mes\">\n                {{mes}}\n              </option>\n            </select>\n            Ano Final:\n            <input [(ngModel)]=\"filtroConsulta.anoFinal\" size=\"4\"/>\n          </span>\n        </div>\n        <div>\n          <span>\n            <button class=\"button\" (click)='pesquisar($event)'>Pesquisar</button>\n          </span>\n        </div>\n      </fieldset>\n      <div>\n        <span>\n          <h2>Execuções:</h2>\n          <ul>\n            <li (click)='expandirExecucao(execucao)' *ngFor=\"let execucao of execucoes\">\n              <b *ngIf=\"execucaoSelecionada.id == execucao.id\">\n                Execução: {{ execucao.protocolo }} - {{execucao._metadata.branch}} - {{ execucao.dataInicio | date: 'dd/MM/yyyy HH:mm:ss' }}\n              </b>\n              <span *ngIf=\"execucaoSelecionada.id != execucao.id\" style=\"cursor: pointer\">\n                Execução: {{ execucao.protocolo }} - {{execucao._metadata.branch}} - {{ execucao.dataInicio | date: 'dd/MM/yyyy HH:mm:ss' }}\n              </span>\n            </li>\n          </ul>\n        </span>\n      </div>\n\n      <div>\n        <span>\n          <h2>Fechamento: </h2>\n          Mês: {{ fechamentoMensal.mes }} Ano: {{ fechamentoMensal.ano }}\n          <h2>Taxas: </h2>\n          <ul>\n            <li *ngFor=\"let taxa of taxas\">\n              <a href=\"{{linkMemoriaTaxa(taxa)}}\">Valor: {{ showValor(taxa.valor?taxa.valor:0, 8) }} - {{ taxa._metadata.branch }}</a>\n              <input type=\"button\" (click)=\"reproduzirCalculoTaxa(taxa)\" value=\"Reproduzir\" /> ({{printIdentify(taxa._metadata.instance_id)}}, versão:{{taxa._metadata.version}})\n            </li>\n          </ul>\n        </span>\n      </div>\n    </td>\n    <td style=\"vertical-align:top; max-width: 350px;\">\n      <fieldset style=\"height: 110px;\">\n        <div>\n          <span>\n            <b>Solicitar Cálculo de Taxas</b>\n            <br>\n            <br>\n          </span>\n        </div>\n        <div>\n          <table>\n            <tr>\n              <th>Mês:</th>\n              <td><input type=\"text\" size=\"4\" [(ngModel)]=\"fechamentoParaCalculo.mes\" /></td>\n              <th>Mês Intervalo:</th>\n              <td><input type=\"text\" size=\"4\" [(ngModel)]=\"fechamentoParaCalculo.mesIntervalo\" /></td>\n            </tr>\n            <tr>\n              <th>Ano:</th>\n              <td><input type=\"text\" size=\"4\" [(ngModel)]=\"fechamentoParaCalculo.ano\" /></td>\n              <th>Ano Intervalo:</th>\n              <td><input type=\"text\" size=\"4\" [(ngModel)]=\"fechamentoParaCalculo.anoIntervalo\" /></td>\n            </tr>\n          </table>\n        </div>\n        <div>\n          <span>\n            <button class=\"button\" (click)='calcularTaxas($event)'>Solicitar Cálculo</button>\n          </span>\n        </div>\n      </fieldset>\n      <br>\n      <fieldset>\n        <div>\n          <span>\n            <b>Reprodução</b>\n            <br>\n          </span>\n        </div>\n        <div>\n          <span>\n            <ul>\n              <li *ngFor=\"let reproducao of reproducoes\">\n                <a href=\"{{linkResultadoReproducao(reproducao)}}\">{{ reproducao.start_date | date: 'dd/MM/yyyy HH:mm:ss' }}</a>\n                ({{printIdentify(reproducao.originalId)}})\n              </li>\n            </ul>\n          </span>\n        </div>\n      </fieldset>\n      <br>\n      <fieldset>\n        <div>\n          <span>\n            <b>Eventos de Negócio</b>&nbsp;\n            <input size=\"1\" type=\"text\" [(ngModel)]=\"filterEvts.horas\" />h\n            &nbsp;/&nbsp;\n            Qtd.Evts:&nbsp;<input size=\"1\" type=\"text\" [(ngModel)]=\"filterEvts.qtd\" />\n            <br>\n          </span>\n        </div>\n        <div>\n          <span>\n            <ul>\n              <li *ngFor=\"let bevent of businessEvents\">\n                <b>{{bevent.data | date: 'dd/MM/yyyy HH:mm:ss'}}:</b> {{bevent.msg}}\n              </li>\n            </ul>\n          </span>\n        </div>\n      </fieldset>\n    </td>\n  </tr>\n</table>"

/***/ }),

/***/ "../../../../../src/app/consultar-historico-taxas/consultar-historico-taxas.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConsultarHistoricoTaxasComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filtro_FiltroConsulta_model__ = __webpack_require__("../../../../../src/app/filtro/FiltroConsulta.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EXCEL_TYPE = 'charset=UTF-8';
var EXCEL_EXTENSION = '.xlsx';
var ConsultarHistoricoTaxasComponent = /** @class */ (function () {
    function ConsultarHistoricoTaxasComponent(http) {
        this.http = http;
        this.presentationId = Guid.newGuid();
        this.maxViewReproduction = 10;
        this.maxViewBusinessEvents = 20;
        this.filterEvts = { horas: 1, qtd: 20 };
        this.fechamentoParaCalculo = { 'mes': '', 'ano': '', 'mesIntervalo': '', 'anoIntervalo': '' };
        this.reproducoes = [];
        this.businessEvents = [];
        this.filtroConsulta = new __WEBPACK_IMPORTED_MODULE_2__filtro_FiltroConsulta_model__["a" /* FiltroConsulta */](null, null, null, null, null, null);
        this.environment = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */];
    }
    Object.defineProperty(ConsultarHistoricoTaxasComponent.prototype, "urlServerPresentation", {
        get: function () {
            var url = window.location.href;
            if (!url.endsWith("/")) {
                url += "/";
            }
            return url;
        },
        enumerable: true,
        configurable: true
    });
    ConsultarHistoricoTaxasComponent.prototype.ngOnInit = function () {
        this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.listarUsinas();
        this.execucaoSelecionada = { 'protocolo': '' };
        this.fechamentoMensal = { 'mes': '', 'ano': '', 'mesIntervalo': '', 'anoIntervalo': '' };
        this.listarTipoTaxa();
        var self = this;
        this.pollingConsultaReproducao(self);
        this.pollingConsultaBusinessEvents(self);
    };
    ConsultarHistoricoTaxasComponent.prototype.pollingConsultaBusinessEvents = function (self) {
        var listarBusinessEvents = this.listarBusinessEvents;
        listarBusinessEvents(self);
        setInterval(function () { listarBusinessEvents(self); }, 10000);
    };
    ConsultarHistoricoTaxasComponent.prototype.pollingConsultaReproducao = function (self) {
        var listarReproducoes = this.listarReproducoes;
        listarReproducoes(self);
        setInterval(function () { listarReproducoes(self); }, 10000);
    };
    ConsultarHistoricoTaxasComponent.prototype.descBusinessEvent = function (businessEvent) {
        var retorno = { data: new Date(businessEvent.timestamp), msg: '' };
        if (businessEvent.name == "calculate.tax.request") {
            retorno.msg = "Solicitação de cálculo de " +
                "taxas do fechamento (" + businessEvent.payload.mesFechamento + "/" +
                businessEvent.payload.anoFechamento + ") recebida.";
        }
        else if (businessEvent.name == "calculate.tax.by.usina") {
            retorno.msg = "Solicitação de cálculo de " +
                "taxas " + (businessEvent.payload.acumulada ? "acumuladas" : "") + " da usina (" +
                businessEvent.payload.idUsina + ") realizada.";
        }
        else if (businessEvent.name == "calculate.tax.done") {
            retorno.msg = "Solicitado cálculo de taxas do fechamento.";
        }
        else if (businessEvent.name == "calculate.tax.by.usina.done") {
            retorno.msg = "Cálculo de taxas da usina realizado com sucesso.";
        }
        else if (businessEvent.name == "calculate.tax.error") {
            retorno.msg = "Error na solicitação de cálculo de " +
                "taxas, error: " + businessEvent.payload.message;
        }
        else if (businessEvent.name == "calculate.tax.by.usina.error") {
            retorno.msg = "Error na solicitação de cálculo de " +
                "taxas da usina, error: " + businessEvent.payload.message;
        }
        return retorno;
    };
    ConsultarHistoricoTaxasComponent.prototype.pesquisar = function () {
        var _this = this;
        if (!this.filtroConsulta.usina || !this.filtroConsulta.mesInicial || !this.filtroConsulta.anoInicial
            || !this.filtroConsulta.mesFinal || !this.filtroConsulta.anoFinal || !this.filtroConsulta.tipoTaxa) {
            alert("Informe todos os filtros da pesquisa!");
            return;
        }
        var url = this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].pesquisarHistorico;
        var body = { 'filtroConsulta': this.filtroConsulta };
        this.http.post(url, body).subscribe(function (data) {
            _this.execucoes = data;
            _this.taxas = [];
            _this.fechamentoMensal = {};
        });
    };
    ConsultarHistoricoTaxasComponent.prototype.isLeapYear = function (year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    };
    ;
    ConsultarHistoricoTaxasComponent.prototype.getDaysInMonth = function (year, month) {
        return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    };
    ;
    ConsultarHistoricoTaxasComponent.prototype.addMonths = function (data, value) {
        var n = data.getDate();
        data.setDate(1);
        data.setMonth(data.getMonth() + value);
        data.setDate(Math.min(n, this.getDaysInMonth(data.getFullYear(), data.getMonth())));
        return data;
    };
    ConsultarHistoricoTaxasComponent.prototype.gerarMesAnoIntervalo = function (mes, ano, mesIntervalo, anoIntervalo) {
        var mesAno = new Date(ano, mes - 1, 1);
        var mesAnoIntervalo = null;
        if (mesIntervalo > 0 && mesIntervalo <= 12 && anoIntervalo >= 2000) {
            mesAnoIntervalo = new Date(anoIntervalo, mesIntervalo - 1, 1);
        }
        var retorno = [];
        do {
            retorno.push(new Date(mesAno));
            mesAno = this.addMonths(mesAno, 1);
        } while (mesAnoIntervalo && mesAno.getTime() <= mesAnoIntervalo.getTime());
        return retorno;
    };
    ConsultarHistoricoTaxasComponent.prototype.validarMesAnoCalculoTaxas = function (mes, ano, contemMesIntervalo, contemAnoIntervalo, mesIntervalo, anoIntervalo) {
        var valido = true;
        if (mes <= 0 || mes > 12 || ano < 2000) {
            valido = false;
        }
        else if (contemMesIntervalo && contemAnoIntervalo && (mesIntervalo <= 0 || mesIntervalo > 12 || anoIntervalo < 2000)) {
            valido = false;
        }
        return valido;
    };
    ConsultarHistoricoTaxasComponent.prototype.converterInt = function (valor) {
        var retorno = 0;
        try {
            retorno = parseInt(valor);
        }
        catch (error) { }
        return retorno;
    };
    ConsultarHistoricoTaxasComponent.prototype.enviarSolicitacaoCalculoTaxa = function (mes, ano) {
        var url = this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].calcularTaxas;
        var body = { presentationId: this.presentationId, mesFechamento: mes, anoFechamento: ano };
        return this.http.post(url, body).toPromise();
    };
    ConsultarHistoricoTaxasComponent.prototype.calcularTaxas = function () {
        var _this = this;
        var mesFechamento = this.converterInt(this.fechamentoParaCalculo.mes);
        var anoFechamento = this.converterInt(this.fechamentoParaCalculo.ano);
        var mesIntervalo = this.converterInt(this.fechamentoParaCalculo.mesIntervalo);
        var anoIntervalo = this.converterInt(this.fechamentoParaCalculo.anoIntervalo);
        if (this.validarMesAnoCalculoTaxas(mesFechamento, anoFechamento, this.fechamentoParaCalculo.mesIntervalo, this.fechamentoParaCalculo.anoIntervalo, mesIntervalo, anoIntervalo)) {
            var intervaloCalculo = this.gerarMesAnoIntervalo(mesFechamento, anoFechamento, mesIntervalo, anoIntervalo);
            var solicitacoesCalculo = [];
            var listaMesAno = "";
            intervaloCalculo.forEach(function (it) {
                var mes = it.getMonth() + 1;
                var ano = it.getFullYear();
                if (listaMesAno) {
                    listaMesAno += ", ";
                }
                listaMesAno += mes + "/" + ano;
                solicitacoesCalculo.push(_this.enviarSolicitacaoCalculoTaxa(mes, ano));
            });
            Promise.all(solicitacoesCalculo).then(function (result) {
                var msg = 'Solicitação de cálculo(s) de taxa(s) enviado(s) com sucesso. Fechamento(s): ' + listaMesAno;
                console.log(msg);
                alert(msg);
            });
        }
        else {
            alert("Inválido mês ou ano informados para execução de cálculo.");
        }
    };
    ConsultarHistoricoTaxasComponent.prototype.linkMemoriaTaxa = function (taxa) {
        return this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].downloadMemoriaProcessamentoXlsx +
            '?idinstance=' + taxa._metadata.instance_id + '&idtaxa=' + taxa.id;
    };
    ConsultarHistoricoTaxasComponent.prototype.linkResultadoReproducao = function (reproducao) {
        return this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].downloadComparacaoReproducaoXlsx +
            '?instance_id=' + reproducao.instanceId +
            '&original_id=' + reproducao.originalId +
            '&taxa_id=' + reproducao.externalId;
    };
    ConsultarHistoricoTaxasComponent.prototype.reproduzirCalculoTaxa = function (taxa) {
        this.http.post(this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].reproduzirCalculoTaxa, { instance_id: taxa._metadata.instance_id, presentationId: this.presentationId, taxa_id: taxa.id }).subscribe(function (data) {
            alert('Solicitação de reprodução do cálculo da taxa realizada com sucesso.');
        });
    };
    ConsultarHistoricoTaxasComponent.prototype.printIdentify = function (ident) {
        return ident && ident.length > 20 ? ident.substring(0, 20) + "..." : ident;
    };
    ConsultarHistoricoTaxasComponent.prototype.listarReproducoes = function (self) {
        self.http.get(self.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].listarReproducoes).subscribe(function (data) {
            var reprods = data;
            var newlist = [];
            for (var i = reprods.length - 1; i >= reprods.length - self.maxViewReproduction && i >= 0; i--) {
                newlist.push(reprods[i]);
            }
            self.reproducoes = newlist;
        });
    };
    ConsultarHistoricoTaxasComponent.prototype.listarBusinessEvents = function (self) {
        var url = self.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].listarBusinessEvents;
        url += "?horas=" + self.filterEvts.horas;
        var qtd = self.converterInt(self.filterEvts.qtd);
        if (qtd <= 0) {
            qtd = self.maxViewBusinessEvents;
        }
        self.http.get(url).subscribe(function (data) {
            var newlist = [];
            if (data && data.length > 0) {
                for (var i = data.length - 1; i >= data.length - qtd && i >= 0; i--) {
                    newlist.push(self.descBusinessEvent(data[i]));
                }
            }
            self.businessEvents = newlist;
        });
    };
    ConsultarHistoricoTaxasComponent.prototype.listarUsinas = function () {
        var _this = this;
        this.http.get(this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].listarUsinas).subscribe(function (data) {
            _this.usinas = data;
        });
    };
    ConsultarHistoricoTaxasComponent.prototype.showValor = function (val, round) {
        if (!val)
            return '0';
        if (!round)
            round = 2;
        val = parseFloat(val.toFixed(round));
        return ("" + val).replace('.', ',');
    };
    ConsultarHistoricoTaxasComponent.prototype.listarTipoTaxa = function () {
        var _this = this;
        this.http.get(this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].listarTipoTaxa).subscribe(function (data) {
            _this.tiposTaxa = data;
        });
    };
    ConsultarHistoricoTaxasComponent.prototype.expandirExecucao = function (execucaoSelecionada) {
        var _this = this;
        this.execucaoSelecionada = execucaoSelecionada;
        var body = { 'idFechamentoMensal': this.execucaoSelecionada.idFechamento, 'filtroConsulta': this.filtroConsulta };
        this.http.post(this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].pesquisarFechamentoMensalPorId, body).
            toPromise().then(function (fechamentoMensal) {
            _this.fechamentoMensal = fechamentoMensal[0];
        });
        this.http.post(this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].pesquisarTaxaPorId, body).
            toPromise().then(function (taxas) {
            _this.taxas = taxas;
        });
    };
    ConsultarHistoricoTaxasComponent.prototype.exportarMemoriaProcessamento = function (taxa) {
        this.http.get(this.getUrlDownloadMemoriaDeProcessamento(taxa)).toPromise().then(function (request) {
            console.log('Export com sucesso');
        });
    };
    ConsultarHistoricoTaxasComponent.prototype.getUrlDownloadMemoriaDeProcessamento = function (taxa) {
        return this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].downloadMemoriaProcessamentoXlsx +
            '?idinstance=' + taxa._metadata.instance_id + '&idtaxa=' + taxa.id;
    };
    ConsultarHistoricoTaxasComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-consultar-historico-taxas',
            template: __webpack_require__("../../../../../src/app/consultar-historico-taxas/consultar-historico-taxas.component.html"),
            styles: [__webpack_require__("../../../../../src/app/consultar-historico-taxas/consultar-historico-taxas.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ConsultarHistoricoTaxasComponent);
    return ConsultarHistoricoTaxasComponent;
}());

var Guid = /** @class */ (function () {
    function Guid() {
    }
    Guid.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Guid;
}());


/***/ }),

/***/ "../../../../../src/app/filtro/FiltroConsulta.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltroConsulta; });
var FiltroConsulta = /** @class */ (function () {
    function FiltroConsulta(usina, mesInicial, anoInicial, mesFinal, anoFinal, tipoTaxa) {
        this.usina = usina;
        this.mesInicial = mesInicial;
        this.anoInicial = anoInicial;
        this.mesFinal = mesFinal;
        this.anoFinal = anoFinal;
        this.tipoTaxa = tipoTaxa;
    }
    return FiltroConsulta;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    listarUsinas: 'listarusinas',
    listarTipoTaxa: 'listartipotaxa',
    consultaFiltroInicial: 'filtroinicial',
    pesquisarHistorico: 'pesquisarhistorico',
    pesquisarTaxaPorId: 'pesquisartaxaporid',
    calcularTaxas: 'calculartaxas',
    pesquisarFechamentoMensalPorId: 'pesquisarfechamentomensalporid',
    downloadMemoriaProcessamentoXlsx: 'downloadMemoriaProcessamentoXlsx',
    reproduzirCalculoTaxa: 'reproduzirCalculoTaxa',
    listarReproducoes: 'listarReproducoes',
    listarBusinessEvents: 'listarBusinessEvents',
    downloadComparacaoReproducaoXlsx: 'downloadComparacaoReproducaoXlsx'
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map