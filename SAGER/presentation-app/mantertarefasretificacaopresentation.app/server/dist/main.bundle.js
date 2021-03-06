webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
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
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<div>\r\n  <app-mantertarefa></app-mantertarefa>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mantertarefa_mantertarefa_component__ = __webpack_require__("./src/app/mantertarefa/mantertarefa.component.ts");
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
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__mantertarefa_mantertarefa_component__["a" /* MantertarefaComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/mantertarefa/mantertarefa.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/mantertarefa/mantertarefa.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>\r\n  Manter tarefas\r\n</h2>\r\n\r\n<fieldset>\r\n  <div><b>Download de Eventos</b></div> <br>\r\n  <div *ngIf=\"camposObrigatoriosPesquisaEventos.length > 0\" [ngStyle]=\"{'color':'red'}\">\r\n    <span>Campos obrigatórios:</span>\r\n    <ul>\r\n      <li *ngFor=\"let campoObrigatorio of camposObrigatoriosPesquisaEventos\">\r\n        {{campoObrigatorio}}\r\n      </li>\r\n    </ul>\r\n  </div>\r\n  <div>\r\n    <span>Usina:</span>\r\n    <span *ngFor=\"let usina of usinas\">\r\n      <input type=\"checkbox\" (change)=\"updateCheckedOptions($event, usina)\">{{usina.idUsina}}\r\n    </span>\r\n  </div>\r\n  <div>\r\n    <span>Data Inicial:\r\n      <input type=\"date\" [(ngModel)]=\"filtroEvento.dataInicial\" />\r\n    </span>\r\n  </div>\r\n  <div>\r\n    <span>Data Final:\r\n      <input type=\"date\" [(ngModel)]=\"filtroEvento.dataFinal\" />\r\n    </span>\r\n  </div>\r\n  <div>\r\n    <span>\r\n      <button class=\"button\" (click)='pesquisarEventos($event)'>Pesquisar eventos</button>\r\n    </span>\r\n  </div>\r\n</fieldset>\r\n<h3>\r\n    Lista de tarefas\r\n  </h3>\r\n<fieldset>\r\n  <div *ngIf=\"camposObrigatoriosTarefa.length > 0\" [ngStyle]=\"{'color':'red'}\">\r\n    <span>Campos obrigatórios:</span>\r\n    <ul>\r\n      <li *ngFor=\"let campoObrigatorioTarefa of camposObrigatoriosTarefa\">\r\n        {{campoObrigatorioTarefa}}\r\n      </li>\r\n    </ul>\r\n  </div>\r\n  <div *ngIf=\"mensagemSucesso\" [ngStyle]=\"{'color':'green'}\">\r\n    <span>{{mensagemSucesso}}</span>\r\n  </div>\r\n  <div *ngIf=\"mensagemErro\" [ngStyle]=\"{'color':'red'}\">\r\n    <span>{{mensagemErro}}</span>\r\n  </div>\r\n  <div>\r\n    <span>Nome da tarefa:\r\n      <input type=\"text\" [(ngModel)]=\"nomeTarefa\" />\r\n      <button class=\"button\" (click)='inserirTarefa($event)'>Salvar tarefa</button>\r\n    </span>\r\n  </div>\r\n  <br>\r\n  <div>\r\n    <table class=\"grid-entidades\" width=\"100%\">\r\n      <tr><th colspan=\"5\">Tarefas</th></tr>\r\n      <tr *ngFor=\"let tarefa of tarefas\">\r\n        <td width=\"250\">\r\n          {{ tarefa.nome }} <b *ngIf=\"tarefa.situacao\"><i>({{tarefa.situacao}})</i></b>\r\n        </td>\r\n        <td>\r\n          <label for=\"file\" *ngIf=\"tarefa.situacao != 'aplicado'\">Upload da planilha</label>\r\n          <input type=\"file\" (change)='uploadPlanilha(tarefa, $event.target.files)' *ngIf=\"tarefa.situacao != 'aplicado'\" />\r\n        </td>\r\n        <td>\r\n          <button class=\"button\" (click)='downloadPlanilha(tarefa, $event)' *ngIf=\"tarefa.situacao != 'pendente'\" width=\"50\">Download da planilha</button>\r\n        </td>\r\n        <td>\r\n          <button class=\"button\" (click)='aplicar(tarefa)'  width=\"50\" *ngIf=\"tarefa.situacao == 'iniciada'\">Aplicar</button>\r\n        </td>\r\n        <td>\r\n          <button class=\"button\" (click)='excluir(tarefa)'  width=\"50\" *ngIf=\"tarefa.situacao != 'aplicado'\">Excluir</button>\r\n        </td>\r\n      </tr>\r\n    </table>\r\n  </div>\r\n</fieldset>"

/***/ }),

/***/ "./src/app/mantertarefa/mantertarefa.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MantertarefaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_FiltroEvento__ = __webpack_require__("./src/app/model/FiltroEvento.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MantertarefaComponent = /** @class */ (function () {
    function MantertarefaComponent(http) {
        this.http = http;
        this.filtroEvento = new __WEBPACK_IMPORTED_MODULE_1__model_FiltroEvento__["a" /* FiltroEvento */]();
        this.filtroEvento.usinas = [];
        this.camposObrigatoriosPesquisaEventos = [];
        this.camposObrigatoriosTarefa = [];
    }
    Object.defineProperty(MantertarefaComponent.prototype, "urlServerPresentation", {
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
    MantertarefaComponent.prototype.ngOnInit = function () {
        this.listarUsinas();
        this.listarTarefas();
    };
    MantertarefaComponent.prototype.listarUsinas = function () {
        var _this = this;
        this.http.get(this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].listarUsinas).subscribe(function (data) {
            _this.usinas = data;
        });
    };
    MantertarefaComponent.prototype.listarTarefas = function () {
        var _this = this;
        this.nomeTarefa = '';
        this.http.get(this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].listarTarefas).subscribe(function (data) {
            _this.tarefas = data;
        });
    };
    MantertarefaComponent.prototype.inserirTarefa = function () {
        var _this = this;
        this.limparMensagens();
        if (this.validarTarefa()) {
            var body = { 'nomeTarefa': this.nomeTarefa };
            this.http.post(this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].inserirTarefa, body).subscribe(function (data) {
                _this.mensagemSucesso = 'Tarefa inserida com sucesso!';
                _this.listarTarefas();
            }, function (error) {
                console.log("Erro ao inserir tarefa: " + error);
            });
        }
    };
    MantertarefaComponent.prototype.limparMensagens = function () {
        this.camposObrigatoriosPesquisaEventos = [];
        this.camposObrigatoriosTarefa = [];
        this.mensagemSucesso = undefined;
        this.mensagemErro = undefined;
    };
    MantertarefaComponent.prototype.validarTarefa = function () {
        if (!this.nomeTarefa) {
            this.camposObrigatoriosTarefa.push('Nome da tarefa');
        }
        return !(this.camposObrigatoriosTarefa.length > 0);
    };
    MantertarefaComponent.prototype.pesquisarEventos = function () {
        this.limparMensagens();
        if (this.validarFiltroPesquisaEventos()) {
            var url = this.getUrlPesquisarEventos();
            console.log('url' + url);
            window.location.href = url;
        }
    };
    MantertarefaComponent.prototype.validarFiltroPesquisaEventos = function () {
        if (this.filtroEvento.usinas.length <= 0) {
            this.camposObrigatoriosPesquisaEventos.push('Usinas');
        }
        if (!this.filtroEvento.dataInicial) {
            this.camposObrigatoriosPesquisaEventos.push('Data Inicial');
        }
        if (!this.filtroEvento.dataFinal) {
            this.camposObrigatoriosPesquisaEventos.push('Data Final');
        }
        return !(this.camposObrigatoriosPesquisaEventos.length > 0);
    };
    MantertarefaComponent.prototype.uploadPlanilha = function (tarefa, files) {
        var _this = this;
        this.limparMensagens();
        tarefa.planilha = files.item(0);
        var urlUploadPlanilha = this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].uploadPlanilha;
        var formData = new FormData();
        formData.append('planilha', tarefa.planilha, tarefa.planilha.name);
        formData.append('nomeTarefa', tarefa.nome);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]();
        this.http.post(urlUploadPlanilha, formData, { 'headers': headers }).subscribe(function (data) {
            console.log(data);
            _this.mensagemSucesso = 'Upload executado com sucesso';
            _this.listarTarefas();
        }, function (error) {
            console.log("Erro ao realizar upload da planilha: " + error);
        });
    };
    MantertarefaComponent.prototype.downloadPlanilha = function (tarefa) {
        var url = this.getUrlDownloadPlanilha(tarefa.nome);
        window.location.href = url;
    };
    MantertarefaComponent.prototype.getUrlDownloadPlanilha = function (nomeTarefa) {
        return "" + this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].downloadplanilha + "?nomeTarefa=" + nomeTarefa;
    };
    MantertarefaComponent.prototype.getUrlPesquisarEventos = function () {
        return "" + this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].pesquisarEventos +
            ("?idsUsinas=" + this.filtroEvento.usinas.join(';') + "&dataInicial=" + this.filtroEvento.dataInicial) +
            ("&dataFinal=" + this.filtroEvento.dataFinal);
    };
    MantertarefaComponent.prototype.updateCheckedOptions = function (event, usina) {
        if (event.target.checked) {
            this.filtroEvento.usinas.push(usina.idUsina);
        }
        else {
            var index = this.filtroEvento.usinas.indexOf(usina.idUsina);
            this.filtroEvento.usinas.splice(index, 1);
        }
    };
    MantertarefaComponent.prototype.excluir = function (tarefa) {
        var _this = this;
        this.limparMensagens();
        var body = { 'tarefa': tarefa };
        this.http.post(this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].excluirTarefa, body).subscribe(function (data) {
            _this.mensagemSucesso = 'Tarefa excluída com sucesso!';
            _this.listarTarefas();
        });
    };
    MantertarefaComponent.prototype.aplicar = function (tarefa) {
        var _this = this;
        this.limparMensagens();
        var url = this.urlServerPresentation + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].aplicarTarefa;
        this.http.post(url, { 'tarefa': tarefa }).subscribe(function (data) {
            var response = data;
            if (response.meta.status === 'commited') {
                _this.mensagemSucesso = 'Retificação aplicada com sucesso!';
            }
            else if (response.meta.status === 'reprocessing_request') {
                _this.mensagemSucesso = "Retifica\u00E7\u00E3o pendente de aprova\u00E7\u00E3o. O reprocessamento " + response.meta.reprocessing.id + " foi gerado e precisa ser aprovado.";
            }
            _this.listarTarefas();
        }, function (error) {
            console.log("Erro ao aplicar tarefa: " + error);
            _this.mensagemErro = error.error;
        });
    };
    MantertarefaComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-mantertarefa',
            template: __webpack_require__("./src/app/mantertarefa/mantertarefa.component.html"),
            styles: [__webpack_require__("./src/app/mantertarefa/mantertarefa.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], MantertarefaComponent);
    return MantertarefaComponent;
}());



/***/ }),

/***/ "./src/app/model/FiltroEvento.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltroEvento; });
var FiltroEvento = /** @class */ (function () {
    function FiltroEvento() {
    }
    return FiltroEvento;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
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
    listarTarefas: 'listartarefas',
    pesquisarEventos: 'pesquisareventos',
    inserirTarefa: 'inserirtarefa',
    uploadPlanilha: 'uploadplanilha',
    downloadplanilha: 'downloadplanilha',
    excluirTarefa: 'excluirtarefa',
    aplicarTarefa: 'aplicartarefa'
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map