var app = angular.module('app', [
  'ngMaterial',
  'ngAnimate', 
  'ui.grid',
  'ui.grid.pagination', 
  'ui.grid.edit',  
  'ui.grid.rowEdit',
  'ui.grid.cellNav',
  'ui.grid.treeView', 
  'ui.grid.selection',
  'ui.grid.exporter'

  ]);

function goMenu(url) {
	$("#main").attr('src',url);
	$(".menu-close").trigger( "click" );
}
  
app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('light-green')
    .accentPalette('orange');
});

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  var today = new Date();
  var nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  var rowtpl='<div ng-class="{\'green\':true, \'blue\':row.entity.count==1 }"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';

  $scope.selectedItems = ["CAMPOS","USINA XINGO"];
  $scope.gridOptions = {
    rowTemplate: rowtpl,
    enableRowSelection: true,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'nome',width:"15%",cellTooltip: true },
      { field: 'tipo',width:"100" },
      // { field: 'tipo',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>', 
      //   filter: { 
      //     term: 1,
      //     options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above 
      //   }, 
      //   cellFilter: 'mapGender' },                               
      //{ field: 'potenciaKw', enableFiltering: false },
      { field: 'agente',width:"300",cellTooltip: true },
      //{ field: 'municipio', enableFiltering: false },
      // { field: 'age',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      // },
      { field: 'estado', visible: false }
    ]
  };

  $http.get('usinas.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
      // $scope.gridOptions.data[0].age = -5;

      // data.forEach( function addDates( row, index ){
      //   row.mixedDate = new Date();
      //   row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
      //   row.gender = row.gender==='male' ? '1' : '2';
      // });
    });


    $scope.gridOptions2 = {
    enableRowSelection: true,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'nome', width:"100", cellTooltip: true },
      { field: 'agente', width:"100" }
      // { field: 'tipo',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>', 
      //   filter: { 
      //     term: 1,
      //     options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above 
      //   }, 
      //   cellFilter: 'mapGender' },                               
      //{ field: 'potenciaKw', enableFiltering: false },
      //{ field: 'agente',width:"300",cellTooltip: true },
      //{ field: 'municipio', enableFiltering: false },
      // { field: 'age',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      // },
      //{ field: 'estado', visible: false }
    ]
  };

  $http.get('interligacoes.json')
    .success(function(data) {
      $scope.gridOptions2.data = data;
      // $scope.gridOptions.data[0].age = -5;

      // data.forEach( function addDates( row, index ){
      //   row.mixedDate = new Date();
      //   row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
      //   row.gender = row.gender==='male' ? '1' : '2';
      // });
    });
}])
app.controller('AdicionarCenarioCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  var today = new Date();
  var nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  $scope.selectedItems = ["B.FLUMINENSE (EOC)"];

  var rowtpl='<div ng-class="{\'green\':true, \'blue\':row.entity.count==1 }"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';

  //var headertpl = '<div ng-class="{ \'sortable\': sortable }"><div class="ui-grid-vertical-bar">&nbsp;</div><div class="ui-grid-cell-contents-wrap" col-index="renderIndex"><span>{{ col.displayName CUSTOM_FILTERS }}</span><span ui-grid-visible="col.sort.direction" ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }">&nbsp;</span></div><div class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false" class="ui-grid-column-menu-button" ng-click="toggleMenu($event)"><i class="ui-grid-icon-angle-down">&nbsp;</i></div><div ng-if="filterable" class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><input type="text" class="ui-grid-filter-input" ng-model="colFilter.term" ng-click="$event.stopPropagation()" ng-attr-placeholder="{{colFilter.placeholder || \'\'}}" /><div class="ui-grid-filter-button" ng-click="colFilter.term = null"><i class="ui-grid-icon-cancel" ng-show="!!colFilter.term">&nbsp;</i> <!-- use !! because angular interprets \'f\' as false --></div></div></div>';
  $scope.gridOptions = {
    rowTemplate: rowtpl,
    enableRowSelection: true,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'nome',width:"20%",cellTooltip: true },
      { field: 'tipo',width:"20%" },
      // { field: 'tipo',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>', 
      //   filter: { 
      //     term: 1,
      //     options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above 
      //   }, 
      //   cellFilter: 'mapGender' },                               
      //{ field: 'potenciaKw', enableFiltering: false },
      { field: 'agente',width:"20%",cellTooltip: true },
      { field: 'dataVigenciaEOC', displayName:"Vigência a partir do EOC", width:"15%", type: 'boolean', enableCellEdit: true,cellTemplate: '<input type="checkbox" ng-model="row.entity.isActive">' },
      { field: 'dataVigencia', displayName:"Data de início de vigência", width:"30%", type: 'date', enableCellEdit: true , cellFilter: 'date:\'dd/MM/yyyy\''},
      //{ field: 'municipio', enableFiltering: false },
      // { field: 'age',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      // },
      { field: 'estado', visible: false }
    ]
  };

  $http.get('usinas.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
      // $scope.gridOptions.data[0].age = -5;

      // data.forEach( function addDates( row, index ){
      //   row.mixedDate = new Date();
      //   row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
      //   row.gender = row.gender==='male' ? '1' : '2';
      // });
    });


    $scope.gridOptions2 = {
    enableRowSelection: true,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'nome', width:"100", cellTooltip: true },
      { field: 'agente', width:"100" }
      // { field: 'tipo',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>', 
      //   filter: { 
      //     term: 1,
      //     options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above 
      //   }, 
      //   cellFilter: 'mapGender' },                               
      //{ field: 'potenciaKw', enableFiltering: false },
      //{ field: 'agente',width:"300",cellTooltip: true },
      //{ field: 'municipio', enableFiltering: false },
      // { field: 'age',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      // },
      //{ field: 'estado', visible: false }
    ]
  };

  $http.get('interligacoes.json')
    .success(function(data) {
      $scope.gridOptions2.data = data;
      // $scope.gridOptions.data[0].age = -5;

      // data.forEach( function addDates( row, index ){
      //   row.mixedDate = new Date();
      //   row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
      //   row.gender = row.gender==='male' ? '1' : '2';
      // });
    });
}])
.controller('GerarRelatoriosCtrl', ['$scope', '$http', 'uiGridConstants','$interval', function ($scope, $http, uiGridConstants,$interval) {
  var today = new Date();
  var nextWeek = new Date();

  $scope.tipo = -1;

  nextWeek.setDate(nextWeek.getDate() + 7);

  var rowtpl='<div ng-class="{\'green\':true, \'blue\':row.entity.count==1 }"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';

  $scope.selectedItems = ["CAMPOS","USINA XINGO"];


  $scope.gridOptions = {
    rowTemplate: rowtpl,
    enableRowSelection: true,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'nome',width:"15%",cellTooltip: true },
      { field: 'tipo',width:"100",enableFiltering: false },
      // { field: 'tipo',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>', 
      //   filter: { 
      //     term: 1,
      //     options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above 
      //   }, 
      //   cellFilter: 'mapGender' },                               
      //{ field: 'potenciaKw', enableFiltering: false },
      { field: 'agente',width:"300",cellTooltip: true },
      //{ field: 'municipio', enableFiltering: false },
      // { field: 'age',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      // },
      { field: 'estado', visible: false },
      { field: 'tipsinc', visible:false}
    ]
  };

   $scope.selectAll = function() {
      $scope.gridApi.selection.selectAllVisibleRows();
    };
    $scope.clearAll = function() {
      $scope.gridApi.selection.clearSelectedRows();
    };



  $scope.Update = function () {
    $scope.clearAll();

    if($scope.tipo == "0") {
    
       $scope.gridApi.grid.columns[2].filters[0].term = "UTE";
       $scope.gridApi.grid.columns[5].filters[0].term = "";

     } else if($scope.tipo == "1") {
      // testar se faz jus  a tipsinc
       $scope.gridApi.grid.columns[2].filters[0].term = "UHE";
       $scope.gridApi.grid.columns[5].filters[0].term = "true";
     } else if($scope.tipo == "2") {
    
       $scope.gridApi.grid.columns[2].filters[0].term = "UHE";
       $scope.gridApi.grid.columns[5].filters[0].term = "";
     } else {
       $scope.gridApi.grid.columns[2].filters[0].term = "";
       $scope.gridApi.grid.columns[5].filters[0].term = "";
     }
    $scope.gridApi.core.refresh();
     $interval( function() {
     $scope.selectAll();
    }, 0, 1);
    
     //$scope.tipoAlteracao = "Diferente";
     //$scope.gridApi.core.notifyDataChange($scope.gridApi.grid, uiGridConstants.dataChange.ALL);
  };

    $http.get('gerarRelatorios.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
      // $scope.gridOptions.data[0].age = -5;

      // data.forEach( function addDates( row, index ){
      //   row.mixedDate = new Date();
      //   row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
      //   row.gender = row.gender==='male' ? '1' : '2';
      // });
    });


    $scope.gridOptions2 = {
    enableRowSelection: true,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi2 = gridApi;
    },
    columnDefs: [
      { field: 'nome', width:"100", cellTooltip: true },
      { field: 'agente', width:"100" }
      // { field: 'tipo',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>', 
      //   filter: { 
      //     term: 1,
      //     options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above 
      //   }, 
      //   cellFilter: 'mapGender' },                               
      //{ field: 'potenciaKw', enableFiltering: false },
      //{ field: 'agente',width:"300",cellTooltip: true },
      //{ field: 'municipio', enableFiltering: false },
      // { field: 'age',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      // },
      //{ field: 'estado', visible: false }
    ]
  };

  $http.get('interligacoes.json')
    .success(function(data) {
      $scope.gridOptions2.data = data;
      // $scope.gridOptions.data[0].age = -5;

      // data.forEach( function addDates( row, index ){
      //   row.mixedDate = new Date();
      //   row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
      //   row.gender = row.gender==='male' ? '1' : '2';
      // });
    });
}])
.controller('ConsultarAgendamentoCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  $scope.flagCalculo     = false;
  $scope.flagRetificacao = false;
  $scope.flagCenario     = false;
  $scope.tipoSelecionado = '';
  $scope.selecionar = function() {
    switch($scope.tipoSelecionado) {
      case "0":
        $scope.flagCalculo = true;
        $scope.flagRetificacao = false;
        $scope.flagCenario = false;
        break;
      case "1":
        $scope.flagCalculo = false;
        $scope.flagRetificacao = true;
        $scope.flagCenario = false;
        break;
      case "2":
        $scope.flagCalculo = false;
        $scope.flagRetificacao = false;
        $scope.flagCenario = true;
        break;
      default:
        break;
    }
  };

  $scope.gridOptionsRetificacao = {
    enableRowSelection: false,
    enableSelectAll: false,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'num', displayName:"Número da Tarefa", cellTooltip: true },
      { field: 'datahora', displayName:"Data/Hora" },
      { field: 'situacao', displayName:"Situação" },
      { field: 'resultado', displayName:"Resultado", }
      // { field: 'tipo',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>', 
      //   filter: { 
      //     term: 1,
      //     options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above 
      //   }, 
      //   cellFilter: 'mapGender' },                               
      //{ field: 'potenciaKw', enableFiltering: false },
      //{ field: 'agente',width:"300",cellTooltip: true },
      //{ field: 'municipio', enableFiltering: false },
      // { field: 'age',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      // },
      //{ field: 'estado', visible: false }
    ]
  };

  $http.get('agendamentoRetificacao.json')
    .success(function(data) {
      $scope.gridOptionsRetificacao.data = data;
      // $scope.gridOptions.data[0].age = -5;

      // data.forEach( function addDates( row, index ){
      //   row.mixedDate = new Date();
      //   row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
      //   row.gender = row.gender==='male' ? '1' : '2';
      // });
    });

}])

.controller('EventosCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  var today = new Date();
  var nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  $scope.gridOptions = {
    enableRowSelection: false,
    enableSelectAll: false,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'inst', displayName:"Instalação", cellTooltip: true },
      { field: 'uge', displayName:"Unidade Geradora", cellTooltip: true },
      { field: 'dtHr', displayName:"Data/Hora" },
      { field: 'EO', displayName:"Estado Operativo" },
      { field: 'CO', displayName:"Condição Operativa", },
      { field: 'OR', displayName:"Origem" },
      { field: 'disp', displayName:"Disponibilidade"}
      // { field: 'tipo',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>', 
      //   filter: { 
      //     term: 1,
      //     options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above 
      //   }, 
      //   cellFilter: 'mapGender' },                               
      //{ field: 'potenciaKw', enableFiltering: false },
      //{ field: 'agente',width:"300",cellTooltip: true },
      //{ field: 'municipio', enableFiltering: false },
      // { field: 'age',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      // },
      //{ field: 'estado', visible: false }
    ]
  };

  $http.get('eventos.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
      // $scope.gridOptions.data[0].age = -5;

      // data.forEach( function addDates( row, index ){
      //   row.mixedDate = new Date();
      //   row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
      //   row.gender = row.gender==='male' ? '1' : '2';
      // });
    });
  $scope.export = function(){
    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
    $scope.gridApi.exporter.csvExport( "all", "all", myElement );
  };
}])
.controller('TarefasCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {

  $scope.gridOptions = {
    enableRowSelection: false,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'tarefa', displayName:"Tarefa", cellTooltip: true },
      { field: 'prazo', displayName:"Prazo para Atendimento", cellTooltip: true  },
      { field: 'origem', displayName:"Origem do Documento" },
      { field: 'numero', displayName:"Numero da Tarefa" },
      //{ field: 'responsavel', displayName:"Responsável" },
      { field: 'COSR', displayName:"Centro Responsável" },
      { field: 'solicitante', displayName:"Solicitante" },
      { field: 'status', displayName:"Status" , cellTemplate: '<div class="label {{COL_FIELD | mapTarefaStatus}}">{{ COL_FIELD }}</div>'}
    ]
  };

  $http.get('tarefas.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });

}])
.controller('TxRefCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {

  $scope.gridOptions = {
    enableRowSelection: false,
    enableSelectAll: false,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'usi', displayName:"Usina", cellTooltip: true },
      { field: 'mes', displayName:"Mês de Referência", cellTooltip: true },
      { field: 'teif', displayName:"TEIF",cellFilter: "number : 8" },
      { field: 'ip', displayName:"IP",cellFilter: "number : 8" }
      // { field: 'tipo',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>', 
      //   filter: { 
      //     term: 1,
      //     options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above 
      //   }, 
      //   cellFilter: 'mapGender' },                               
      //{ field: 'potenciaKw', enableFiltering: false },
      //{ field: 'agente',width:"300",cellTooltip: true },
      //{ field: 'municipio', enableFiltering: false },
      // { field: 'age',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      // },
      //{ field: 'estado', visible: false }
    ]
  };

  $http.get('txref.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
      // $scope.gridOptions.data[0].age = -5;

      // data.forEach( function addDates( row, index ){
      //   row.mixedDate = new Date();
      //   row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
      //   row.gender = row.gender==='male' ? '1' : '2';
      // });
    });

     $scope.gridOptions2 = {
    enableRowSelection: false,
    enableSelectAll: false,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'cint', displayName:"Interligação", cellTooltip: true },
      { field: 'mes', displayName:"Mês de Referência", cellTooltip: true },
      { field: 'teif', displayName:"TEIF" },
      { field: 'ip', displayName:"IP" }
      // { field: 'tipo',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>', 
      //   filter: { 
      //     term: 1,
      //     options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above 
      //   }, 
      //   cellFilter: 'mapGender' },                               
      //{ field: 'potenciaKw', enableFiltering: false },
      //{ field: 'agente',width:"300",cellTooltip: true },
      //{ field: 'municipio', enableFiltering: false },
      // { field: 'age',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      // },
      //{ field: 'estado', visible: false }
    ]
  };

  $http.get('txref2.json')
    .success(function(data) {
      $scope.gridOptions2.data = data;
      // $scope.gridOptions.data[0].age = -5;

      // data.forEach( function addDates( row, index ){
      //   row.mixedDate = new Date();
      //   row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
      //   row.gender = row.gender==='male' ? '1' : '2';
      // });
    });
  $scope.export = function(){
    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
    $scope.gridApi.exporter.csvExport( "all", "all", myElement );
  };
}])
.controller('CenariosCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {

  $scope.gridOptions = {
    enableRowSelection: false,
    enableSelectAll: false,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'nome', displayName:"Nome", cellTooltip: true },
      { field: 'age', displayName:"Agente", cellTooltip: true },
      { field: 'ins', displayName:"Instalação"},
      { field: 'dtInicio', displayName:"Data de início de vigência"},
      { field: 'dtFim', displayName:"Data fim de vigência"},
      { field: 'status', displayName:"Status"},
      { field: 'comentarios', displayName:"Comentários"}
      
    ]
  };

  $http.get('consultarCenarios.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
      // $scope.gridOptions.data[0].age = -5;

      // data.forEach( function addDates( row, index ){
      //   row.mixedDate = new Date();
      //   row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
      //   row.gender = row.gender==='male' ? '1' : '2';
      // });
    });

  $scope.export = function(){
    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
    $scope.gridApi.exporter.csvExport( "all", "all", myElement );
  };
}])

.controller('MemoriaCalculoCtrl', ['$scope', '$http', '$interval', 'uiGridTreeViewConstants', function ($scope, $http, $interval, uiGridTreeViewConstants ) {
  $scope.gridOptions = {
    enableSorting: true,
    enableFiltering: false,
    showTreeExpandNoChildren: false,
    columnDefs: [
      { name: 'uge', displayName:'Unidade Geradora',width: '15%' },
      { name: 'mes', displayName:"Mês", width: '10%' },
      { name: 'pNome', displayName: "Parâmetro", width: '20%' },
      { name: 'pValor', displayName: "Valor", width: '15%' },
      { name: 'percTx', displayName:"% Participação", width: '15%', headerTooltip: 'Representa a participação em % deste cálculo na taxa final' },
      { name: 'acoes', displayName: 'Ações',width: '25%' , cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.visualizarEventos(row.entity)" >Visualizar Eventos</button> '}
      //{ name: 'state', width: '35%', field: 'address.state' },
      //{ name: 'balance', width: '25%', treeAggregationType: uiGridTreeViewConstants.aggregation.SUM, cellFilter: 'currency', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><span>{{row.entity.balance CUSTOM_FILTERS}}</span><span ng-if="row.entity[\'$$\' + col.uid]"> ({{row.entity["$$" + col.uid].value CUSTOM_FILTERS}})</span></div>' }
    ],
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
      // $scope.gridApi.treeBase.on.rowExpanded($scope, function(row) {
      //   if( row.entity.$$hashKey === $scope.gridOptions.data[50].$$hashKey && !$scope.nodeLoaded ) {
      //     $interval(function() {
      //       $scope.gridOptions.data.splice(51,0,
      //         {name: 'Dynamic 1', gender: 'female', age: 53, company: 'Griddable grids', balance: 38000, $$treeLevel: 1},
      //         {name: 'Dynamic 2', gender: 'male', age: 18, company: 'Griddable grids', balance: 29000, $$treeLevel: 1}
      //       );
      //       $scope.nodeLoaded = true;
      //     }, 2000, 1);
      //   }
      // });
    }
  };
 
  var memoriaList = [];

  var ugeList = [
  {nome:"uge01",potencia:"50",percTx:"8"},
  {nome:"uge02",potencia:"150",percTx:"15"},
  {nome:"uge03",potencia:"100",percTx:"12"},
  {nome:"uge04",potencia:"200",percTx:"10"},
  {nome:"uge05",potencia:"300",percTx:"14"},
  {nome:"uge06",potencia:"50",percTx:"11"},
  {nome:"uge07",potencia:"150",percTx:"2"},
  {nome:"uge08",potencia:"250",percTx:"3"},
  {nome:"uge09",potencia:"450",percTx:"5"},
  {nome:"uge10",potencia:"550",percTx:"20"}

  ];
  var parametros = [{name:'HDP',value:10},{name:'HEDP',value:10},{name:'HDF',value:10},{name:'HEDF',value:10},{name:'HS',value:684},{name:'HDCE',value:10},{name:'HRD',value:10},{name:'HP',value:744}];

  var monthNames = [
    "01", "02", "03",
    "04", "05", "06", "07",
    "08", "09", "10",
    "11", "12"
  ];

  for(u=0;u < ugeList.length; u++) {
    var dtInicial = new Date(); // hoje
    var perc = {
      uge : ugeList[u].nome,
      pNome: "Potência",
      pValor: ugeList[u].potencia,
      percTx : ugeList[u].percTx,
      $$treeLevel : 0
    };

    memoriaList.push(perc);
    for(i=1;i<=30;i++) {
      memoriaList.push({
        mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
        $$treeLevel : 1
      });
      for (j=0; j < parametros.length; j++) {
        var memoria = {
          //uge : "uge" + uge,
          pNome : parametros[j].name,
          pValor : parametros[j].value,
          $$treeLevel : 2
        };
        memoriaList.push(memoria);
      }
      dtInicial.setMonth(dtInicial.getMonth() - 1);
    }
    for(i=1;i<=20;i++) {
      memoriaList.push({
        mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
        $$treeLevel : 1
      });

      var memoria = {
        pNome : "Taxa de Referência",
        pValor : "0.12345678",
        $$treeLevel : 2
      };
      memoriaList.push(memoria);
      
      dtInicial.setMonth(dtInicial.getMonth() - 1);
    }
    for(i=1;i<=10;i++) {
      memoriaList.push({
        mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
        $$treeLevel : 1
      });

      var memoria = {
        pNome : "Taxa Ajustada",
        pValor : "0.12345678",
        $$treeLevel : 2
      };
      memoriaList.push(memoria);
      
      dtInicial.setMonth(dtInicial.getMonth() - 1);
    }
  }
  //console.log(JSON.stringify(memoriaList));

 //$http.get('memoria.json')
 //.success(function(data) {
   // for ( var i = 0; i < data.length; i++ ){
   //   data[i].balance = Number( data[i].balance.slice(1).replace(/,/,'') );
   // }
   // data[0].$$treeLevel = 0;
   // data[1].$$treeLevel = 1;
   // data[2].$$treeLevel = 2;
   // data[10].$$treeLevel = 1;
   // data[20].$$treeLevel = 0;
   // data[25].$$treeLevel = 1;
   // data[50].$$treeLevel = 0;
   // data[51].$$treeLevel = 0;
   $scope.gridOptions.data = memoriaList;
 //});
 
  $scope.expandAll = function(){
    $scope.gridApi.treeBase.expandAllRows();
  };
 
  $scope.toggleRow = function( rowNum ){
    $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
  };
  $scope.export = function(){
    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
    $scope.gridApi.exporter.csvExport( "all", "all", myElement );
  };
  $scope.visualizarEventos = function(row){
    //console.log(row);
    window.location.replace("consultarEventos.html");
  };
}])
.controller('MemoriaCalculoCtrl2', ['$scope', '$http', '$interval', 'uiGridTreeViewConstants', function ($scope, $http, $interval, uiGridTreeViewConstants ) {
  $scope.gridOptions = {
    enableSorting: true,
    enableFiltering: false,
    showTreeExpandNoChildren: false,
    columnDefs: [
      { name: 'mes', displayName:"Mês", width: '10%' },
      { name: 'uge', displayName:'Unidade Geradora',width: '15%' },
      { name: 'pNome', displayName: "Parâmetro", width: '20%' },
      { name: 'pValor', displayName: "Valor", width: '15%' },
      { name: 'percTx', displayName:"% Participação", width: '15%', headerTooltip: 'Representa a participação em % deste cálculo na taxa final' },
      { name: 'acoes', displayName: 'Ações',width: '25%' , cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-show="row.entity.hasEvents" ng-click="grid.appScope.visualizarEventos(row.entity)" >Visualizar Eventos</button> '}
      //{ name: 'state', width: '35%', field: 'address.state' },
      //{ name: 'balance', width: '25%', treeAggregationType: uiGridTreeViewConstants.aggregation.SUM, cellFilter: 'currency', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><span>{{row.entity.balance CUSTOM_FILTERS}}</span><span ng-if="row.entity[\'$$\' + col.uid]"> ({{row.entity["$$" + col.uid].value CUSTOM_FILTERS}})</span></div>' }
    ],
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
      // $scope.gridApi.treeBase.on.rowExpanded($scope, function(row) {
      //   if( row.entity.$$hashKey === $scope.gridOptions.data[50].$$hashKey && !$scope.nodeLoaded ) {
      //     $interval(function() {
      //       $scope.gridOptions.data.splice(51,0,
      //         {name: 'Dynamic 1', gender: 'female', age: 53, company: 'Griddable grids', balance: 38000, $$treeLevel: 1},
      //         {name: 'Dynamic 2', gender: 'male', age: 18, company: 'Griddable grids', balance: 29000, $$treeLevel: 1}
      //       );
      //       $scope.nodeLoaded = true;
      //     }, 2000, 1);
      //   }
      // });
    }
  };
 
  var memoriaList = [];

  var ugeList = [
  {nome:"uge01",potencia:"50",percTx:"8",dtOp : new Date(2009,07,01)},
  {nome:"uge02",potencia:"150",percTx:"15",dtOp : new Date(2010,11,01)},
  {nome:"uge03",potencia:"100",percTx:"12",dtOp : new Date(2011,11,01)},
  {nome:"uge04",potencia:"200",percTx:"10",dtOp : new Date(2012,11,01)},
  {nome:"uge05",potencia:"300",percTx:"14",dtOp : new Date(2013,11,01)},
  {nome:"uge06",potencia:"50",percTx:"11",dtOp : new Date(2013,11,01)},
  {nome:"uge07",potencia:"150",percTx:"2",dtOp : new Date(2013,11,01)},
  {nome:"uge08",potencia:"250",percTx:"3",dtOp : new Date(2013,11,01)},
  {nome:"uge09",potencia:"450",percTx:"5",dtOp : new Date(2013,11,01)},
  {nome:"uge10",potencia:"550",percTx:"20",dtOp : new Date(2013,11,01)}

  ];
  //var parametros = [{name:'HDP',value:10},{name:'HEDP',value:10},{name:'HDF',value:10},{name:'HEDF',value:10},{name:'HS',value:684},{name:'HDCE',value:10},{name:'HRD',value:10},{name:'HP',value:730}];
  var parametros = [{name:'HDP',value:10},{name:'HEDP',value:10},{name:'HP',value:730}];
  var monthNames = [
    "01", "02", "03",
    "04", "05", "06", "07",
    "08", "09", "10",
    "11", "12"
  ];

  var dtInicial = new Date(2014,08,01); // hoje
  dtInicial.setMonth(dtInicial.getMonth() - 1);

  for (i=0; i<30; i++) {
      var tx = {
      mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
      pNome: "Taxa Mensal",
      pValor: 0.12345678,
      hasEvents: true,
      $$treeLevel : 0
    };
    memoriaList.push(tx);
    for(u=0;u < ugeList.length; u++) {
      var perc = {
        uge : ugeList[u].nome,
        pNome: "Potência",
        pValor: ugeList[u].potencia,
        percTx : ugeList[u].percTx,
        hasEvents: true,
        $$treeLevel : 1
      };
      memoriaList.push(perc);
      for (j=0; j < parametros.length; j++) {
          var memoria = {
            //uge : "uge" + uge,
            pNome : parametros[j].name,
            pValor : parametros[j].value,
            hasEvents: true,
            $$treeLevel : 2
          };
          memoriaList.push(memoria);
      }
    }
    dtInicial.setMonth(dtInicial.getMonth() - 1);
  }
  for (i=0; i<10 ;i++) {
      var tx = {
      mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
      pNome: "Taxa Ajustada",
      pValor: 0.12345678,
      hasEvents: false,
      $$treeLevel : 0
    };
    memoriaList.push(tx);
    dtInicial.setMonth(dtInicial.getMonth() - 1);
  }  
  for (i=0; i<20; i++) {
      var tx = {
      mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
      pNome: "Taxa Referência",
      pValor: 0.12345678,
      hasEvents: false,
      $$treeLevel : 0
    };
    memoriaList.push(tx);
    dtInicial.setMonth(dtInicial.getMonth() - 1);
  }


  //console.log(JSON.stringify(memoriaList));

 //$http.get('memoria.json')
 //.success(function(data) {
   // for ( var i = 0; i < data.length; i++ ){
   //   data[i].balance = Number( data[i].balance.slice(1).replace(/,/,'') );
   // }
   // data[0].$$treeLevel = 0;
   // data[1].$$treeLevel = 1;
   // data[2].$$treeLevel = 2;
   // data[10].$$treeLevel = 1;
   // data[20].$$treeLevel = 0;
   // data[25].$$treeLevel = 1;
   // data[50].$$treeLevel = 0;
   // data[51].$$treeLevel = 0;
   $scope.gridOptions.data = memoriaList;
 //});
 
  $scope.expandAll = function(){
    $scope.gridApi.treeBase.expandAllRows();
  };
 
  $scope.toggleRow = function( rowNum ){
    $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
  };
  $scope.export = function(){
    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
    $scope.gridApi.exporter.csvExport( "all", "all", myElement );
  };
  $scope.visualizarEventos = function(row){
    //console.log(row);
    window.location.replace("consultarEventos.html");
  };
}])
.controller('MemoriaCalculoCtrl3', ['$scope', '$http', '$interval', 'uiGridTreeViewConstants', function ($scope, $http, $interval, uiGridTreeViewConstants ) {
  $scope.gridOptions = {
    enableSorting: true,
    enableFiltering: false,
    showTreeExpandNoChildren: false,
    columnDefs: [
      { name: 'mes', displayName:"Mês", width: '10%' },
      { name: 'uge', displayName:'Unidade Geradora',width: '15%' },
      { name: 'pNome', displayName: "Parâmetro", width: '20%' },
      { name: 'pValor', displayName: "Valor", width: '15%' },
      { name: 'percTx', displayName:"% Participação", width: '15%', headerTooltip: 'Representa a participação em % deste cálculo na taxa final' },
      { name: 'acoes', displayName: 'Ações',width: '25%' , cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-show="row.entity.hasEvents" ng-click="grid.appScope.visualizarEventos(row.entity)" >Visualizar Eventos</button> '}
      //{ name: 'state', width: '35%', field: 'address.state' },
      //{ name: 'balance', width: '25%', treeAggregationType: uiGridTreeViewConstants.aggregation.SUM, cellFilter: 'currency', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><span>{{row.entity.balance CUSTOM_FILTERS}}</span><span ng-if="row.entity[\'$$\' + col.uid]"> ({{row.entity["$$" + col.uid].value CUSTOM_FILTERS}})</span></div>' }
    ],
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
      // $scope.gridApi.treeBase.on.rowExpanded($scope, function(row) {
      //   if( row.entity.$$hashKey === $scope.gridOptions.data[50].$$hashKey && !$scope.nodeLoaded ) {
      //     $interval(function() {
      //       $scope.gridOptions.data.splice(51,0,
      //         {name: 'Dynamic 1', gender: 'female', age: 53, company: 'Griddable grids', balance: 38000, $$treeLevel: 1},
      //         {name: 'Dynamic 2', gender: 'male', age: 18, company: 'Griddable grids', balance: 29000, $$treeLevel: 1}
      //       );
      //       $scope.nodeLoaded = true;
      //     }, 2000, 1);
      //   }
      // });
    }
  };
 
  var memoriaList = [];

  var ugeList = [
  {nome:"uge01",potencia:"50",percTx:"8",dtOp : new Date(2009,07,01)},
  {nome:"uge02",potencia:"150",percTx:"15",dtOp : new Date(2010,11,01)},
  {nome:"uge03",potencia:"100",percTx:"12",dtOp : new Date(2011,11,01)},
  {nome:"uge04",potencia:"200",percTx:"10",dtOp : new Date(2012,11,01)},
  {nome:"uge05",potencia:"300",percTx:"14",dtOp : new Date(2013,11,01)},
  {nome:"uge06",potencia:"50",percTx:"11",dtOp : new Date(2013,11,01)},
  {nome:"uge07",potencia:"150",percTx:"2",dtOp : new Date(2013,11,01)},
  {nome:"uge08",potencia:"250",percTx:"3",dtOp : new Date(2013,11,01)},
  {nome:"uge09",potencia:"450",percTx:"5",dtOp : new Date(2013,11,01)},
  {nome:"uge10",potencia:"550",percTx:"20",dtOp : new Date(2013,11,01)}

  ];
  //var parametros = [{name:'HDP',value:10},{name:'HEDP',value:10},{name:'HDF',value:10},{name:'HEDF',value:10},{name:'HS',value:684},{name:'HDCE',value:10},{name:'HRD',value:10},{name:'HP',value:730}];
  var parametros = [{name:'HDP',value:10},{name:'HEDP',value:10},{name:'HP',value:730}];
  var monthNames = [
    "01", "02", "03",
    "04", "05", "06", "07",
    "08", "09", "10",
    "11", "12"
  ];

  var dtInicial = new Date(2014,08,01); // hoje
  dtInicial.setMonth(dtInicial.getMonth() - 1);

  for (i=0; i<1; i++) {
      var tx = {
      mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
      //pNome: "Taxa Mensal",
      //pValor: 0.12345678,
      hasEvents: true,
      $$treeLevel : 0
    };
    memoriaList.push(tx);
    for(u=0;u < ugeList.length; u++) {
      var perc = {
        uge : ugeList[u].nome,
        pNome: "Potência",
        pValor: ugeList[u].potencia,
        percTx : ugeList[u].percTx,
        hasEvents: true,
        $$treeLevel : 1
      };
      memoriaList.push(perc);
      if(dtInicial > ugeList[u].dtOp) {
        for (j=0; j < parametros.length; j++) {
          var memoria = {
            //uge : "uge" + uge,
            pNome : parametros[j].name,
            pValor : parametros[j].value,
            hasEvents: true,
            $$treeLevel : 2
          };
          memoriaList.push(memoria);
        }
      } else {
          var memoria = {
            //uge : "uge" + uge,
            pNome : "HDP + HEDP",
            pValor : 14.6,
            hasEvents: false,
            $$treeLevel : 2
          };
          memoriaList.push(memoria);

          memoria = {
            //uge : "uge" + uge,
            pNome : "HP",
            pValor : 730,
            hasEvents: false,
            $$treeLevel : 2
          };
          memoriaList.push(memoria);

          if(i > 40 &&  i < 50) {
            memoria = {
              //uge : "uge" + uge,
              pNome : "Taxa ajustada",
              pValor : 0.02,
              hasEvents: false,
              $$treeLevel : 2
            };
            memoriaList.push(memoria);
          } else if (i >= 50){
            memoria = {
              //uge : "uge" + uge,
              pNome : "IP (Taxa de referência)",
              pValor : 0.02,
              hasEvents: false,
              $$treeLevel : 2
            };
            memoriaList.push(memoria);
          }

      }

    }
    dtInicial.setMonth(dtInicial.getMonth() - 1);
  }


  console.log(JSON.stringify(memoriaList));

 //$http.get('memoria.json')
 //.success(function(data) {
   // for ( var i = 0; i < data.length; i++ ){
   //   data[i].balance = Number( data[i].balance.slice(1).replace(/,/,'') );
   // }
   // data[0].$$treeLevel = 0;
   // data[1].$$treeLevel = 1;
   // data[2].$$treeLevel = 2;
   // data[10].$$treeLevel = 1;
   // data[20].$$treeLevel = 0;
   // data[25].$$treeLevel = 1;
   // data[50].$$treeLevel = 0;
   // data[51].$$treeLevel = 0;
   $scope.gridOptions.data = memoriaList;
 //});
 
  $scope.expandAll = function(){
    $scope.gridApi.treeBase.expandAllRows();
  };
 
  $scope.toggleRow = function( rowNum ){
    $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
  };
  $scope.export = function(){
    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
    $scope.gridApi.exporter.csvExport( "all", "all", myElement );
  };
  $scope.visualizarEventos = function(row){
    //console.log(row);
    window.location.replace("consultarEventos.html");
  };
}])
.controller('MemoriaCalculoCtrl4', ['$scope', '$http', '$interval', 'uiGridTreeViewConstants', function ($scope, $http, $interval, uiGridTreeViewConstants ) {
  $scope.gridOptions = {
    enableSorting: true,
    enableFiltering: false,
    showTreeExpandNoChildren: false,
    columnDefs: [
      { name: 'uge', displayName:'Unidade Geradora',width: '15%' },
      { name: 'mes', displayName:"Mês", width: '10%' },
      { name: 'pNome', displayName: "Parâmetro", width: '20%' },
      { name: 'pValor', displayName: "Valor", width: '15%' },
      { name: 'percTx', displayName:"% Participação", width: '15%', headerTooltip: 'Representa a participação em % deste cálculo na taxa final' },
      { name: 'acoes', displayName: 'Ações',width: '25%' , cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-show="row.entity.hasEvents" ng-click="grid.appScope.visualizarEventos(row.entity)" >Visualizar Eventos</button> '}
      //{ name: 'state', width: '35%', field: 'address.state' },
      //{ name: 'balance', width: '25%', treeAggregationType: uiGridTreeViewConstants.aggregation.SUM, cellFilter: 'currency', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><span>{{row.entity.balance CUSTOM_FILTERS}}</span><span ng-if="row.entity[\'$$\' + col.uid]"> ({{row.entity["$$" + col.uid].value CUSTOM_FILTERS}})</span></div>' }
    ],
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
      // $scope.gridApi.treeBase.on.rowExpanded($scope, function(row) {
      //   if( row.entity.$$hashKey === $scope.gridOptions.data[50].$$hashKey && !$scope.nodeLoaded ) {
      //     $interval(function() {
      //       $scope.gridOptions.data.splice(51,0,
      //         {name: 'Dynamic 1', gender: 'female', age: 53, company: 'Griddable grids', balance: 38000, $$treeLevel: 1},
      //         {name: 'Dynamic 2', gender: 'male', age: 18, company: 'Griddable grids', balance: 29000, $$treeLevel: 1}
      //       );
      //       $scope.nodeLoaded = true;
      //     }, 2000, 1);
      //   }
      // });
    }
  };
 
  var memoriaList = [];

  var ugeList = [
  {nome:"uge01",potencia:"50",percTx:"8",dtOp : new Date(2009,07,01)},
  {nome:"uge02",potencia:"150",percTx:"15",dtOp : new Date(2010,11,01)},
  {nome:"uge03",potencia:"100",percTx:"12",dtOp : new Date(2011,11,01)},
  {nome:"uge04",potencia:"200",percTx:"10",dtOp : new Date(2012,11,01)},
  {nome:"uge05",potencia:"300",percTx:"14",dtOp : new Date(2013,11,01)},
  {nome:"uge06",potencia:"50",percTx:"11",dtOp : new Date(2013,11,01)},
  {nome:"uge07",potencia:"150",percTx:"2",dtOp : new Date(2013,11,01)},
  {nome:"uge08",potencia:"250",percTx:"3",dtOp : new Date(2013,11,01)},
  {nome:"uge09",potencia:"450",percTx:"5",dtOp : new Date(2013,11,01)},
  {nome:"uge10",potencia:"550",percTx:"20",dtOp : new Date(2013,11,01)}

  ];
  //var parametros = [{name:'HDP',value:10},{name:'HEDP',value:10},{name:'HDF',value:10},{name:'HEDF',value:10},{name:'HS',value:684},{name:'HDCE',value:10},{name:'HRD',value:10},{name:'HP',value:730}];
  var parametros = [{name:'HDP',value:10},{name:'HEDP',value:10},{name:'HP',value:730}];
  var monthNames = [
    "01", "02", "03",
    "04", "05", "06", "07",
    "08", "09", "10",
    "11", "12"
  ];


  var dtInicial;

  for(u=0;u < ugeList.length; u++) {
    var perc = {
      uge : ugeList[u].nome,
      //pNome: "Potência",
      //pValor: ugeList[u].potencia,
      percTx : ugeList[u].percTx,
      hasEvents: false,
      $$treeLevel : 0
    };
    memoriaList.push(perc);

    dtInicial = new Date(); // hoje
    dtInicial.setMonth(dtInicial.getMonth() - 1);

    for (i=0; i<60; i++) {

      if(dtInicial > ugeList[u].dtOp) {
          var tx = {
          mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
          pNome: "Potência",
          pValor: ugeList[u].potencia,
          hasEvents: true,
          $$treeLevel : 1
        };
        memoriaList.push(tx);
        for (j=0; j < parametros.length; j++) {
          var memoria = {
            //uge : "uge" + uge,
            pNome : parametros[j].name,
            pValor : parametros[j].value,
            hasEvents: true,
            $$treeLevel : 2
          };
          memoriaList.push(memoria);
        }
      } else {

          var tx = {
            mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
            pNome: "Potência",
            pValor: ugeList[u].potencia,
            hasEvents: false,
            $$treeLevel : 1
          };
          memoriaList.push(tx);
          var memoria = {
            //uge : "uge" + uge,
            pNome : "HDP + HEDP",
            pValor : 14.6,
            hasEvents: false,
            $$treeLevel : 2
          };
          memoriaList.push(memoria);

          memoria = {
            //uge : "uge" + uge,
            pNome : "HP",
            pValor : 730,
            hasEvents: false,
            $$treeLevel : 2
          };
          memoriaList.push(memoria);


          memoria = {
            //uge : "uge" + uge,
            pNome : "IP (Taxa de referência)",
            pValor : 0.02,
            hasEvents: false,
            $$treeLevel : 2
          };
          memoriaList.push(memoria);
          

      }
      dtInicial.setMonth(dtInicial.getMonth() - 1);
    }
    
  }


  //console.log(JSON.stringify(memoriaList));

 //$http.get('memoria.json')
 //.success(function(data) {
   // for ( var i = 0; i < data.length; i++ ){
   //   data[i].balance = Number( data[i].balance.slice(1).replace(/,/,'') );
   // }
   // data[0].$$treeLevel = 0;
   // data[1].$$treeLevel = 1;
   // data[2].$$treeLevel = 2;
   // data[10].$$treeLevel = 1;
   // data[20].$$treeLevel = 0;
   // data[25].$$treeLevel = 1;
   // data[50].$$treeLevel = 0;
   // data[51].$$treeLevel = 0;
   $scope.gridOptions.data = memoriaList;
 //});
 
  $scope.expandAll = function(){
    $scope.gridApi.treeBase.expandAllRows();
  };
 
  $scope.toggleRow = function( rowNum ){
    $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
  };
  $scope.export = function(){
    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
    $scope.gridApi.exporter.csvExport( "all", "all", myElement );
  };
  $scope.visualizarEventos = function(row){
    //console.log(row);
    window.location.replace("consultarEventos.html");
  };
}])
.controller('CompararCalculoCtrl4', ['$scope', '$http', '$interval', 'uiGridTreeViewConstants', function ($scope, $http, $interval, uiGridTreeViewConstants ) {
  
 var rowtpl='<div ng-class="{\'blue\':row.entity.tipo==\'Igual-I\', \'red\':row.entity.tipo==\'Diferente\' }"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';

  $scope.gridOptions = {
    rowTemplate: rowtpl,
    enableSorting: true,
    enableFiltering: true,
    showTreeExpandNoChildren: false,
    columnDefs: [
      { name: 'uge', displayName:'Unidade Geradora',width: '15%' },
      { name: 'mes', displayName:"Mês", width: '10%' },
      { name: 'pNome', displayName: "Parâmetro", width: '20%' },
      { name: 'pValor', displayName: "Valor (v1)", width: '10%',cellClass: 'text-right' },
      { name: 'pValor2', displayName: "Valor (reprodução)", width: '10%',cellClass: 'text-right' },
      //{ name: 'percTx', displayName:"% Participação", width: '15%', headerTooltip: 'Representa a participação em % deste cálculo na taxa final' },
      { name: 'tipo', displayName:"Resultado", width: '15%', headerTooltip: 'Igual/Inserido/Alterado/Removido',cellClass: 'text-center'},
      { name: 'acoes', displayName: 'Eventos',width: '15%' , cellTemplate: '<div class="text-center"><button id="editBtn" type="button" class="fa fa-eye btn-u" ng-show="row.entity.tipo == \'Diferente\'" data-toggle="modal" data-target="#modEventos" title="Visualizar Eventos"></button></div>'}
      //{ name: 'state', width: '35%', field: 'address.state' },
      //{ name: 'balance', width: '25%', treeAggregationType: uiGridTreeViewConstants.aggregation.SUM, cellFilter: 'currency', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><span>{{row.entity.balance CUSTOM_FILTERS}}</span><span ng-if="row.entity[\'$$\' + col.uid]"> ({{row.entity["$$" + col.uid].value CUSTOM_FILTERS}})</span></div>' }
    ],
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
      // $scope.gridApi.treeBase.on.rowExpanded($scope, function(row) {
      //   if( row.entity.$$hashKey === $scope.gridOptions.data[50].$$hashKey && !$scope.nodeLoaded ) {
      //     $interval(function() {
      //       $scope.gridOptions.data.splice(51,0,
      //         {name: 'Dynamic 1', gender: 'female', age: 53, company: 'Griddable grids', balance: 38000, $$treeLevel: 1},
      //         {name: 'Dynamic 2', gender: 'male', age: 18, company: 'Griddable grids', balance: 29000, $$treeLevel: 1}
      //       );
      //       $scope.nodeLoaded = true;
      //     }, 2000, 1);
      //   }
      // });
    }
  };

   $scope.Update = function () {
    console.log('Update')

    if($scope.mostrarSomenteDiff) {
    
       $scope.gridApi.grid.columns[6].filters[0].term = "Diferente";
    } else {
      $scope.gridApi.grid.columns[6].filters[0].term = "";
    }
    $scope.gridApi.core.refresh();
     //$scope.tipoAlteracao = "Diferente";
     //$scope.gridApi.core.notifyDataChange($scope.gridApi.grid, uiGridConstants.dataChange.ALL);
  };
 
  var memoriaList = [];

  var ugeList = [
  {nome:"uge01",potencia:"50",percTx:"8",dtOp : new Date(2009,07,01)},
  {nome:"uge02",potencia:"150",percTx:"15",dtOp : new Date(2010,11,01)},
  {nome:"uge03",potencia:"100",percTx:"12",dtOp : new Date(2011,11,01)},
  {nome:"uge04",potencia:"200",percTx:"10",dtOp : new Date(2012,11,01)},
  {nome:"uge05",potencia:"300",percTx:"14",dtOp : new Date(2013,11,01)},
  {nome:"uge06",potencia:"50",percTx:"11",dtOp : new Date(2013,11,01)},
  {nome:"uge07",potencia:"150",percTx:"2",dtOp : new Date(2013,11,01)},
  {nome:"uge08",potencia:"250",percTx:"3",dtOp : new Date(2013,11,01)},
  {nome:"uge09",potencia:"450",percTx:"5",dtOp : new Date(2013,11,01)},
  {nome:"uge10",potencia:"550",percTx:"20",dtOp : new Date(2013,11,01)}

  ];
  //var parametros = [{name:'HDP',value:10},{name:'HEDP',value:10},{name:'HDF',value:10},{name:'HEDF',value:10},{name:'HS',value:684},{name:'HDCE',value:10},{name:'HRD',value:10},{name:'HP',value:730}];
  var parametros = [{name:'HDP',value:10},{name:'HEDP',value:10},{name:'HP',value:730}];
  var monthNames = [
    "01", "02", "03",
    "04", "05", "06", "07",
    "08", "09", "10",
    "11", "12"
  ];

  var dtInicial;

  for(u=0;u < ugeList.length; u++) {
    var perc = {
      uge : ugeList[u].nome,
      //pNome: "Potência",
      //pValor: ugeList[u].potencia,
      percTx : ugeList[u].percTx,
      hasEvents: false,
      tipo: "Igual",
      $$treeLevel : 0
    };
    memoriaList.push(perc);

    dtInicial = new Date(); // hoje
    dtInicial.setMonth(dtInicial.getMonth() - 1);

    for (i=0; i<60; i++) {

      if(dtInicial > ugeList[u].dtOp) {
          var tx = {
          mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
          pNome: "Potência",
          pValor: ugeList[u].potencia,
          tipo: "Igual",
          hasEvents: true,
          $$treeLevel : 1
        };
        memoriaList.push(tx);
        for (j=0; j < parametros.length; j++) {
          var memoria = {
            //uge : "uge" + uge,
            pNome : parametros[j].name,
            pValor : parametros[j].value,
            tipo: "Igual",
            hasEvents: true,
            $$treeLevel : 2
          };
          memoriaList.push(memoria);
        }
      } else {

          var tx = {
            mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
            pNome: "Potência",
            pValor: ugeList[u].potencia,
            tipo: "Igual",
            hasEvents: false,
            $$treeLevel : 1
          };
          memoriaList.push(tx);
          var memoria = {
            //uge : "uge" + uge,
            pNome : "HDP + HEDP",
            pValor : 14.6,
            hasEvents: false,
            tipo: "Igual",
            $$treeLevel : 2
          };
          memoriaList.push(memoria);

          memoria = {
            //uge : "uge" + uge,
            pNome : "HP",
            pValor : 730,
            hasEvents: false,
            tipo: "Igual",
            $$treeLevel : 2
          };
          memoriaList.push(memoria);


          memoria = {
            //uge : "uge" + uge,
            pNome : "IP (Taxa de referência)",
            pValor : 0.02,
            hasEvents: false,
            tipo: "Igual",
            $$treeLevel : 2
          };
          memoriaList.push(memoria);
          

      }
      dtInicial.setMonth(dtInicial.getMonth() - 1);
    }
    
  }




 // console.log(JSON.stringify(memoriaList));

 $http.get('memoria42.json')
 .success(function(data) {
  
   data.forEach(function(entry) {
    entry.pValor2 = entry.pValor;
  });
   //data[0].tipo = 'Igual-I';
   //data[1].tipo = 'Igual-I';
   data[2].pValor2 = 10;
   $scope.gridOptions.data = data;
    $interval( function() {
    //$scope.Update();
     $scope.expandAll();
    }, 0, 1);
 });
 
  $scope.expandAll = function(){
    $scope.gridApi.treeBase.expandAllRows();
  };
 
  $scope.toggleRow = function( rowNum ){
    $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
  };
  $scope.export = function(){
    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
    $scope.gridApi.exporter.csvExport( "all", "all", myElement );
  };
  $scope.visualizarEventos = function(row){
    //console.log(row);
    window.location.replace("consultarEventos.html");
  };
}])
.controller('CompararCalculoCtrl4_2', ['$scope', '$http', '$interval', 'uiGridTreeViewConstants','uiGridConstants', function ($scope, $http, $interval, uiGridTreeViewConstants,uiGridConstants ) {
  
 $scope.mostrarSomenteDiff = true;



 var rowtpl='<div ng-class="{\'blue\':row.entity.tipo==\'Inserido\', \'red\':row.entity.tipo==\'Diferente\' }"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';

  $scope.gridOptions = {
    rowTemplate: rowtpl,
    enableSorting: true,
    enableFiltering: true,
    showTreeExpandNoChildren: false,
    columnDefs: [
      { name: 'uge', displayName:'Unidade Geradora',width: '15%' },
      { name: 'mes', displayName:"Mês", width: '10%' },
      { name: 'pNome', displayName: "Parâmetro", width: '20%' },
      { name: 'pValor', displayName: "Valor (v1)", width: '10%',cellClass: 'text-right' },
      { name: 'pValor2', displayName: "Valor (v2)", width: '10%',cellClass: 'text-right' },
      //{ name: 'percTx', displayName:"% Participação", width: '15%', headerTooltip: 'Representa a participação em % deste cálculo na taxa final' },
      { name: 'tipo', displayName:"Resultado", width: '15%', headerTooltip: 'Igual/Inserido/Alterado/Removido',visible:false,cellClass: 'text-center' },
       { name: 'acoes', displayName: 'Eventos',width: '15%' , cellTemplate: '<div class="text-center"><button id="editBtn" type="button" class="fa fa-eye btn-u" ng-show="row.entity.tipo == \'Diferente\'" data-toggle="modal" data-target="#modEventos" title="Visualizar Eventos"></button></div>'}     
      //{ name: 'acoes', displayName: 'Ações',width: '25%' , cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-show="row.entity.hasEvents" ng-click="grid.appScope.visualizarEventos(row.entity)" >Visualizar Eventos</button> '}
      //{ name: 'state', width: '35%', field: 'address.state' },
      //{ name: 'balance', width: '25%', treeAggregationType: uiGridTreeViewConstants.aggregation.SUM, cellFilter: 'currency', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><span>{{row.entity.balance CUSTOM_FILTERS}}</span><span ng-if="row.entity[\'$$\' + col.uid]"> ({{row.entity["$$" + col.uid].value CUSTOM_FILTERS}})</span></div>' }
    ],
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
      // $scope.gridApi.treeBase.on.rowExpanded($scope, function(row) {
      //   if( row.entity.$$hashKey === $scope.gridOptions.data[50].$$hashKey && !$scope.nodeLoaded ) {
      //     $interval(function() {
      //       $scope.gridOptions.data.splice(51,0,
      //         {name: 'Dynamic 1', gender: 'female', age: 53, company: 'Griddable grids', balance: 38000, $$treeLevel: 1},
      //         {name: 'Dynamic 2', gender: 'male', age: 18, company: 'Griddable grids', balance: 29000, $$treeLevel: 1}
      //       );
      //       $scope.nodeLoaded = true;
      //     }, 2000, 1);
      //   }
      // });
    }
  };

  $scope.Update = function () {
    console.log('Update')

    if($scope.mostrarSomenteDiff) {
    
       $scope.gridApi.grid.columns[6].filters[0].term = "Diferente";
    } else {
      $scope.gridApi.grid.columns[6].filters[0].term = "";
    }
     //$scope.tipoAlteracao = "Diferente";
     //$scope.gridApi.core.notifyDataChange($scope.gridApi.grid, uiGridConstants.dataChange.ALL);
      $scope.gridApi.core.refresh();
  };
 
  var memoriaList = [];

  var ugeList = [
  {nome:"uge01",potencia:"50",percTx:"8",dtOp : new Date(2009,07,01)},
  {nome:"uge02",potencia:"150",percTx:"15",dtOp : new Date(2010,11,01)},
  {nome:"uge03",potencia:"100",percTx:"12",dtOp : new Date(2011,11,01)},
  {nome:"uge04",potencia:"200",percTx:"10",dtOp : new Date(2012,11,01)},
  {nome:"uge05",potencia:"300",percTx:"14",dtOp : new Date(2013,11,01)},
  {nome:"uge06",potencia:"50",percTx:"11",dtOp : new Date(2013,11,01)},
  {nome:"uge07",potencia:"150",percTx:"2",dtOp : new Date(2013,11,01)},
  {nome:"uge08",potencia:"250",percTx:"3",dtOp : new Date(2013,11,01)},
  {nome:"uge09",potencia:"450",percTx:"5",dtOp : new Date(2013,11,01)},
  {nome:"uge10",potencia:"550",percTx:"20",dtOp : new Date(2013,11,01)}

  ];
  //var parametros = [{name:'HDP',value:10},{name:'HEDP',value:10},{name:'HDF',value:10},{name:'HEDF',value:10},{name:'HS',value:684},{name:'HDCE',value:10},{name:'HRD',value:10},{name:'HP',value:730}];
  var parametros = [{name:'HDP',value:10},{name:'HEDP',value:10},{name:'HP',value:730}];
  var monthNames = [
    "01", "02", "03",
    "04", "05", "06", "07",
    "08", "09", "10",
    "11", "12"
  ];

  var dtInicial;

  for(u=0;u < ugeList.length; u++) {
    var perc = {
      uge : ugeList[u].nome,
      //pNome: "Potência",
      //pValor: ugeList[u].potencia,
      percTx : ugeList[u].percTx,
      hasEvents: false,
      tipo: "Igual",
      $$treeLevel : 0
    };
    memoriaList.push(perc);

    dtInicial = new Date(); // hoje
    dtInicial.setMonth(dtInicial.getMonth() - 1);

    for (i=0; i<60; i++) {

      if(dtInicial > ugeList[u].dtOp) {
          var tx = {
          mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
          pNome: "Potência",
          pValor: ugeList[u].potencia,
          tipo: "Igual",
          hasEvents: true,
          $$treeLevel : 1
        };
        memoriaList.push(tx);
        for (j=0; j < parametros.length; j++) {
          var memoria = {
            //uge : "uge" + uge,
            pNome : parametros[j].name,
            pValor : parametros[j].value,
            tipo: "Igual",
            hasEvents: true,
            $$treeLevel : 2
          };
          memoriaList.push(memoria);
        }
      } else {

          var tx = {
            mes : monthNames[dtInicial.getMonth()] + "/" + dtInicial.getFullYear(),
            pNome: "Potência",
            pValor: ugeList[u].potencia,
            tipo: "Igual",
            hasEvents: false,
            $$treeLevel : 1
          };
          memoriaList.push(tx);
          var memoria = {
            //uge : "uge" + uge,
            pNome : "HDP + HEDP",
            pValor : 14.6,
            hasEvents: false,
            tipo: "Igual",
            $$treeLevel : 2
          };
          memoriaList.push(memoria);

          memoria = {
            //uge : "uge" + uge,
            pNome : "HP",
            pValor : 730,
            hasEvents: false,
            tipo: "Igual",
            $$treeLevel : 2
          };
          memoriaList.push(memoria);


          memoria = {
            //uge : "uge" + uge,
            pNome : "IP (Taxa de referência)",
            pValor : 0.02,
            hasEvents: false,
            tipo: "Igual",
            $$treeLevel : 2
          };
          memoriaList.push(memoria);
          

      }
      dtInicial.setMonth(dtInicial.getMonth() - 1);
    }
    
  }


 // console.log(JSON.stringify(memoriaList));

 $http.get('memoria42.json')
 .success(function(data) {
  
   data.forEach(function(entry) {
    entry.pValor2 = entry.pValor;
  });
   data[2].pValor2 = 10;
   $scope.gridOptions.data = data;
   $interval( function() {
      $scope.Update();
     $scope.expandAll();
    }, 0, 1);
   
 });
 
  $scope.expandAll = function(){
    $scope.gridApi.treeBase.expandAllRows();
  };
 
  $scope.toggleRow = function( rowNum ){
    $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
  };
  $scope.export = function(){
    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
    $scope.gridApi.exporter.csvExport( "all", "all", myElement );
  };
  $scope.visualizarEventos = function(row){
    //console.log(row);
    window.location.replace("consultarEventos.html");
  };
}])
.directive('myCustomDropdown', function() {
  return {
    template: '<select class="form-control" ng-model="colFilter.term" ng-options="option.id as option.value for option in colFilter.options"></select>'
  };
})
.controller('ConsultarEventosCtrl', ['$scope', '$http', '$interval', 'uiGridTreeViewConstants', function ($scope, $http, $interval, uiGridTreeViewConstants ) {
  
  $scope.status = '0'; // Consolidado

  $scope.gridOptions = {
    enableSorting: false,
    enableFiltering: false,
    //showTreeExpandNoChildren: false,
    columnDefs: [
      { name: 'ver',  headerTooltip:'Versão',displayName:'V',width: 40 },
      { name: 'cco', headerTooltip:'Consistência ONS',displayName:'CO',width: 40 },
      { name: 'cca', headerTooltip:'Consistência Agente',displayName:"CA",width: 40 },
      { name: 'cosr', headerTooltip:'Centro Regional',displayName:"COSR" },
      { name: 'age', headerTooltip:'Agente',displayName:"Agente" },
      { name: 'eqp', headerTooltip:'Equipamento',displayName:"Equipamento",width: 120 },
      { name: 'datahora', headerTooltip:'Data/Hora Verificada', displayName:"Data/Hora Verificada",type: 'date',cellFilter: 'date:"dd/MM/yyyy HH:mm"',minWidth:"120" },
      { name: 'eo', headerTooltip:'Estado Operativo',displayName:"EO" },
      { name: 'co', headerTooltip:'Condição Operativa',displayName:"CO" ,cellTemplate:'<div class="text-center"><span ng-class="{ \'red\':row.entity.dCO }">{{grid.getCellValue(row, col)}}</span></div>"'},
      { name: 'or', headerTooltip:'Origem',displayName:"OR" },
      { name: 'disp', headerTooltip:'Disponibilidade (MW)', displayName:"Disponibilidade", cellFilter: " number : 3",cellTemplate:'<span ng-class="{ \'red\':row.entity.alterado }">{{grid.getCellValue(row, col)}}</span>"' },
      { name: 'numons', headerTooltip:'Número ONS do evento',displayName:"Número ONS",minWidth:160 },
      { field: 'temcomagente', headerTooltip:'Comentário Agente', displayName:"Comentário Agente", enableCellEdit:false, cellTemplate: '<a id="popoverOption" class="btn" href="#" data-container="body" data-content="{{row.entity.com_age}}" rel="popover" data-placement="bottom" data-original-title="Comentários do Agente">{{grid.getCellValue(row, col)}}</a>'  },
      { field: 'temcomons', headerTooltip:'Comentário ONS',displayName:"Comentário ONS", enableCellEdit:false, cellTemplate: '<a id="popoverOption" class="btn" href="#" data-container="body" data-content="{{row.entity.com_ons}}" rel="popover" data-placement="bottom" data-original-title="Comentários do ONS">{{grid.getCellValue(row, col)}}</a>' },
      { name: 'tipo_op', headerTooltip:'Tipo Operação',displayName:"Tipo Operação" }
      //{ name: 'ret', displayName:"Retificado" }
      //{ name: 'state', width: '35%', field: 'address.state' },
      //{ name: 'balance', width: '25%', treeAggregationType: uiGridTreeViewConstants.aggregation.SUM, cellFilter: 'currency', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><span>{{row.entity.balance CUSTOM_FILTERS}}</span><span ng-if="row.entity[\'$$\' + col.uid]"> ({{row.entity["$$" + col.uid].value CUSTOM_FILTERS}})</span></div>' }
    ],
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
      // $scope.gridApi.treeBase.on.rowExpanded($scope, function(row) {
      //   if( row.entity.$$hashKey === $scope.gridOptions.data[50].$$hashKey && !$scope.nodeLoaded ) {
      //     $interval(function() {
      //       $scope.gridOptions.data.splice(51,0,
      //         {name: 'Dynamic 1', gender: 'female', age: 53, company: 'Griddable grids', balance: 38000, $$treeLevel: 1},
      //         {name: 'Dynamic 2', gender: 'male', age: 18, company: 'Griddable grids', balance: 29000, $$treeLevel: 1}
      //       );
      //       $scope.nodeLoaded = true;
      //     }, 2000, 1);
      //   }
      // });
    }
  };
 
 

 
 $http.get('consultarEventos.json')
 .success(function(data) {
   data.forEach(function(entry) {
    entry.cco = "S";
    entry.cca = "S";
    entry.cosr = "NE";
    entry.ret = "N";
    entry.$$treeLevel = 0;
   
  });
   delete data[1].$$treeLevel;
   delete data[2].$$treeLevel;

     // simulando alteracao
  data[0].alterado = true;
  data[1].alterado = true;

  data[1].dCO = true;
   
   
   $scope.gridOptions.data = data;
 });
 
  $scope.expandAll = function(){
    $scope.gridApi.treeBase.expandAllRows();
  };
 
  $scope.toggleRow = function( rowNum ){
    $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
  };
  $scope.export = function(){
    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
    $scope.gridApi.exporter.csvExport( "all", "all", myElement );
  };
  $scope.visualizarEventos = function(row){
    //console.log(row);
    window.location.replace("consultarEventos.html");
  };
}])
.controller('myCustomModalCtrl', function( $scope, $compile, $timeout ) {
  var $elm;
  
  $scope.showAgeModal = function() {
    $scope.listOfAges = [];
    
    $scope.col.grid.appScope.gridOptions.data.forEach( function ( row ) {
      if ( $scope.listOfAges.indexOf( row.age ) === -1 ) {
        $scope.listOfAges.push( row.age );
      }
    });
    $scope.listOfAges.sort();
    
    $scope.gridOptions = { 
      data: [],
      enableColumnMenus: false,
      onRegisterApi: function( gridApi) {
        $scope.gridApi = gridApi;
        
        if ( $scope.colFilter && $scope.colFilter.listTerm ){
          $timeout(function() {
            $scope.colFilter.listTerm.forEach( function( age ) {
              var entities = $scope.gridOptions.data.filter( function( row ) {
                return row.age === age;
              }); 
              
              if( entities.length > 0 ) {
                $scope.gridApi.selection.selectRow(entities[0]);
              }
            });
          });
        }
      } 
    };
    
    $scope.listOfAges.forEach(function( age ) {
      $scope.gridOptions.data.push({age: age});
    });
    
    var html = '<div class="modal" ng-style="{display: \'block\'}"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">Filter Ages</div><div class="modal-body"><div id="grid1" ui-grid="gridOptions" ui-grid-selection class="modalGrid"></div></div><div class="modal-footer"><button id="buttonClose" class="btn btn-primary" ng-click="close()">Filter</button></div></div></div></div>';
    $elm = angular.element(html);
    angular.element(document.body).prepend($elm);

    $compile($elm)($scope);
    
  };
  
  $scope.close = function() {
    var ages = $scope.gridApi.selection.getSelectedRows();
    $scope.colFilter.listTerm = [];
    
    ages.forEach( function( age ) {
      $scope.colFilter.listTerm.push( age.age );
    });
    
    $scope.colFilter.term = $scope.colFilter.listTerm.join(', ');
    $scope.colFilter.condition = new RegExp($scope.colFilter.listTerm.join('|'));
    
    if ($elm) {
      $elm.remove();
    }
  };
})
.controller('SolicitarRetificacaoCtrl', function( $scope, $compile, $timeout,$mdDialog ) {

    $scope.documentos = [];
    //$scope.origemDoc = "Carta 1234 - Agente";
    //$scope.tipoTarefaSelecionado = 1;
    $scope.tipoTarefas = [
      {nome:"Retificar Eventos",valor:1}
    ];
    $scope.cosrs = [
      {nome:"COSR-N",valor:"N"},
      {nome:"COSR-SE",valor:"SE"},
      {nome:"COSR-S",valor:"S"},
      {nome:"COSR-NCO",valor:"NCO"},
    ];

    $scope.adicionarDocumento = function() {
      //'cartaPetrobras.pdf', 'cartaRespostaONS.pdf'
      $scope.documentos.push("documento.pdf");
    }
     $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Tarefa incluída com sucesso!')
          .textContent('A tarefa foi criada e atribuída para o centro: ' + $scope.cosrSelecionado)
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Ok');

      $mdDialog.show(confirm).then(function() {
        location.href='tarefas.html';
      }, function() {
        $scope.status = 'You decided to keep your debt.';
      });
    };
    $scope.showConfirm2 = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Tarefa incluída com sucesso!')
          .textContent('A tarefa foi criada e atribuída para o centro: ' + $scope.cosrSelecionado)
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Ok');

      $mdDialog.show(confirm).then(function() {
        location.href='retificarEventos.html';
      }, function() {
        $scope.status = 'You decided to keep your debt.';
      });
    };
})
.controller('RetificarEventosCtrl', ['$scope', '$http', '$q', '$interval','uiGridConstants','i18nService','$mdToast', function ($scope, $http, $q,$interval,uiGridConstants,i18nService,$mdToast) {

$scope.isError = false;

i18nService.setCurrentLang('pt-br');

var rowtpl='<div ng-class="{ \'blue\':row.entity.retificado==\'S\' }"><span ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader,\'strike\':row.entity.del==\'S\' }" ui-grid-cell></span></div>';

$scope.tipoSituacao = "2";
$scope.selectedItems = ["Mês Inicial = 01/2001","Agente = CHESF","Instalação = USINA XINGO","Equipamento = Todos"];

  $scope.gridOptions = {
    paginationPageSizes: [10, 50, 100,1000,4000],
    rowTemplate: rowtpl,
    enableRowSelection: true,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    enableCellEditOnFocus: true,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: false,
    rowEditWaitInterval: -1, // desabilita o save automatico
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;

      gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    },
    columnDefs: [
      { field: 'eqp', headerTooltip: 'Equipamento' ,displayName:"Equipamento", enableCellEdit:false, minWidth:"120", cellTemplate: '<span class="btn" id="popoverOption" data-container="body" data-content="Equipamento: UG  527 MW USINA XINGO               1 AL<br/>Saldo Franquia GIS: 1000h<br/>Saldo Franquia GIC: 1000h<br/>Saldo Franquia GIM: 1000h<br/><span>Existem tarefas associadas para este equipamento: <br/>COSR-SE T0001/2016</span>" rel="popover" data-placement="bottom" data-original-title="Informações sobre o equipamento">{{grid.getCellValue(row, col)}}</span>'},
      { field: 'obs', headerTooltip: 'Críticas', displayName:"",enableSorting: false ,enableFiltering: false, enableCellEdit:false, cellTemplate: '<div class="ui-grid-cell-contents" ng-show="row.isError"><span id="popoverOption" class="btn" data-container="body" data-content="{{grid.getCellValue(row, col)}}" rel="popover" data-placement="bottom" data-original-title="Log de Erro"><span style="color:red" class="glyphicon glyphicon-exclamation-sign"></span></span></div>', maxWidth:"50"  },
      { field: 'datahora', headerTooltip: 'Data/Hora Verificada', displayName:"Data/Hora Verificada",type: 'date',cellFilter: 'date:"dd/MM/yyyy HH:mm"',minWidth:"200" },
      { field: 'eo', headerTooltip: 'Estado Operativo', displayName:"EO", cellTooltip: true,maxWidth:"60" , editableCellTemplate: 'ui-grid/dropdownEditor', editDropdownValueLabel: 'label', editDropdownOptionsArray: [
      { id: "DCA", label: 'DCA' },
      { id: "DCO", label: 'DCO' },
      { id: "DPA", label: 'DPA' },
      { id: "DUR", label: 'DUR' },
      { id: "DEM", label: 'DEM' },
      { id: "LIG", label: 'LIG' },
      { id: "LCS", label: 'LCS' },
      { id: "LCC", label: 'LCC' }
      ] },
      { field: 'co', headerTooltip: 'Condição Operativa', displayName:"CO",maxWidth:"60" , editableCellTemplate: 'ui-grid/dropdownEditor', editDropdownValueLabel: 'label', editDropdownOptionsArray: [
      { id: "NOR", label: 'NOR' },
      { id: "NOT", label: 'NOT' },
      { id: "RFO", label: 'RFO' },
      { id: "RPR", label: 'RPR' }
      ] },
      { field: 'or', headerTooltip: 'Origem', displayName:"OR",maxWidth:"60" , editableCellTemplate: 'ui-grid/dropdownEditor', editDropdownValueLabel: 'label', editDropdownOptionsArray: [
      { id: "GUM", label: 'GUM' },
      { id: "GUM", label: 'GTR' },
      { id: "GOT", label: 'GOT' },
      { id: "GAG", label: 'GAG' },
      { id: "GUM", label: 'GAC' },
      { id: "GGE", label: 'GGE' },
      { id: "GCB", label: 'GCB' },
      { id: "GCI", label: 'GCI' },
      { id: "GIS", label: 'GIS' },
      { id: "GIC", label: 'GIC' },
      { id: "GIM", label: 'GIM' },
      { id: "GVO", label: 'GVO' },
      { id: "GMP", label: 'GMP' },
      { id: "GMT", label: 'GMT' },
      { id: "GHN", label: 'GHN' },
      { id: "GHT", label: 'GHT' },
      { id: "GHI", label: 'GHI' },
      { id: "GHC", label: 'GHC' },
      { id: "GRE", label: 'GRE' },
      { id: "GRB", label: 'GRB' },
      { id: "GOU", label: 'GOU' },
      { id: "GOO", label: 'GOO' },
      { id: "GHM", label: 'GHM' }
      
      ] },
      { field: 'disp'   , headerTooltip: 'Disponibilidade (MW)', displayName:"Disponibilidade", cellEditableCondition: 'row.entity.editable'},
      { field: 'numons' , headerTooltip: 'Número ONS', displayName:"Número ONS",enableCellEdit:false, minWidth:160 ,cellTemplate: '<span id="popoverOption" class="btn" href="#" data-container="body" data-content="<table border=1><tr><td>Data/Hora</td><td>EO</td><td>OR</td><td>CO</td><td>Disponibilidade</td></tr><tr><td>11/04/2016 00:00:00</td><td>DCA</td><td>GUM</td><td></td><td>527</td></tr><tr><td>11/04/2016 00:00:00</td><td>DCA</td><td>GUM</td><td></td><td>527</td></tr><tr><td>11/04/2016 00:00:00</td><td>DCA</td><td>GUM</td><td></td><td>527</td></tr><tr><td>11/04/2016 00:00:00</td><td>DCA</td><td>GUM</td><td></td><td>527</td></tr><tr><td>11/04/2016 00:00:00</td><td>DCA</td><td>GUM</td><td></td><td>527</td></tr><tr><td>11/04/2016 00:00:00</td><td>DCA</td><td>GUM</td><td></td><td>527</td></tr></table>" rel="popover" data-placement="bottom" data-original-title="Eventos Adjacentes">{{grid.getCellValue(row, col)}}</span>'},
      { field: 'temcomagente', headerTooltip: 'Comentário Agente', displayName:"Comentário Agente", enableCellEdit:false, cellTemplate: '<span id="popoverOption" class="btn" href="#" data-container="body" data-content="{{row.entity.com_age}}" rel="popover" data-placement="bottom" data-original-title="Comentários do Agente">{{grid.getCellValue(row, col)}}</span>'  },
      { field: 'temcomons', headerTooltip: 'Comentário ONS', displayName:"Comentário ONS", enableCellEdit:false, cellTemplate: '<span id="popoverOption" class="btn" href="#" data-container="body" data-content="{{row.entity.com_ons}}" rel="popover" data-placement="bottom" data-original-title="Comentários do ONS">{{grid.getCellValue(row, col)}}</span>' },
      { field: 'tipo_op', headerTooltip: 'Tipo Operação', displayName:"Tipo Operação" },
      { field: 'age', headerTooltip: 'Agente', displayName:"Agente" },
      { field: 'retificado', displayName:"Retificado?",visible:false },
      { field: 'del', displayName:"Excluir?",visible:false }
      // { field: 'tipo',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>', 
      //   filter: { 
      //     term: 1,
      //     options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above 
      //   }, 
      //   cellFilter: 'mapGender' },                               
      //{ field: 'potenciaKw', enableFiltering: false },
      //{ field: 'agente',width:"300",cellTooltip: true },
      //{ field: 'municipio', enableFiltering: false },
      // { field: 'age',
      //   filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      // },
      //{ field: 'estado', visible: false }
    ]
  };


var rowtpl2='<span ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader,\'highlight\':row.entity.emRetificacao }" ui-grid-cell></span>';

  $scope.gridOptions2 = {
    paginationPageSizes: [10, 50, 100,1000,4000],
    rowTemplate: rowtpl2,
    enableRowSelection: true,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    enableCellEditOnFocus: true,
    rowHeight: 35,
    showGridFooter:true,
    enableFiltering: false,
    rowEditWaitInterval: -1, // desabilita o save automatico
    onRegisterApi: function(gridApi){
      $scope.gridApi2 = gridApi;
    },
    columnDefs: [
      { field: 'eqp', headerTooltip: 'Equipamento' ,displayName:"Equipamento", enableCellEdit:false, minWidth:"120"},
      { field: 'obs', headerTooltip: 'Críticas', displayName:"",enableSorting: false ,enableFiltering: false, enableCellEdit:false, cellTemplate: '<div class="ui-grid-cell-contents" ng-show="row.isError"><span id="popoverOption" class="btn" data-container="body" data-content="{{grid.getCellValue(row, col)}}" rel="popover" data-placement="bottom" data-original-title="Log de Erro"><span style="color:red" class="glyphicon glyphicon-exclamation-sign"></span></span></div>', maxWidth:"50"  },
      { field: 'datahora', headerTooltip: 'Data/Hora Verificada', displayName:"Data/Hora Verificada",type: 'date',cellFilter: 'date:"dd/MM/yyyy HH:mm"',minWidth:"200" },
      { field: 'eo', headerTooltip: 'Estado Operativo', displayName:"EO", cellTooltip: true,maxWidth:"60" },
      { field: 'co', headerTooltip: 'Condição Operativa', displayName:"CO",maxWidth:"60" },
      { field: 'or', headerTooltip: 'Origem', displayName:"OR",maxWidth:"60" },
      { field: 'disp'   , headerTooltip: 'Disponibilidade (MW)', displayName:"Disponibilidade", cellEditableCondition: 'row.entity.editable'},
      { field: 'numons' , headerTooltip: 'Número ONS', displayName:"Número ONS",enableCellEdit:false, minWidth:160 },
      { field: 'temcomagente', headerTooltip: 'Comentário Agente', displayName:"Comentário Agente", enableCellEdit:false, cellTemplate: '<span id="popoverOption" class="btn" href="#" data-container="body" data-content="{{row.entity.com_age}}" rel="popover" data-placement="bottom" data-original-title="Comentários do Agente">{{grid.getCellValue(row, col)}}</span>'  },
      { field: 'temcomons', headerTooltip: 'Comentário ONS', displayName:"Comentário ONS", enableCellEdit:false, cellTemplate: '<span id="popoverOption" class="btn" href="#" data-container="body" data-content="{{row.entity.com_ons}}" rel="popover" data-placement="bottom" data-original-title="Comentários do ONS">{{grid.getCellValue(row, col)}}</span>' },
      { field: 'tipo_op', headerTooltip: 'Tipo Operação', displayName:"Tipo Operação" },
      { field: 'age', headerTooltip: 'Agente', displayName:"Agente" },
      { field: 'retificado', displayName:"Retificado?",visible:false },
      { field: 'del', displayName:"Excluir?",visible:false }
      
    ]
  };


  $http.get('retificarEventos.json')
    .success(function(data) {
      for (i = data.length - 1; i >= 0; i--) {
        data[i].datahora = new Date(data[i].datahora);
        data[i].del = "N";
      }

      $scope.gridOptions.data = [];
      $scope.gridOptions2.data = data;

      // $interval( function() {
      //   $scope.gridApi.grid.sortColumn($scope.gridOptions.columnDefs[1], uiGridConstants.ASC, false);
      // }, 0, 1);
      // $scope.gridOptions.data[0].age = -5;

      // data.forEach( function addDates( row, index ){
      //   row.mixedDate = new Date();
      //   row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
      //   row.gender = row.gender==='male' ? '1' : '2';
      // });
    });
  $scope.excluir = function(){
      var selectedObject =  $scope.gridApi.selection.getSelectedRows();
      $scope.gridApi.rowEdit.setRowsDirty( rows );
      console.log(rows);
      rows.forEach( function ( row, index ){
        row.del = "S";
      });
  };

  $scope.cancelar = function(){
      var selectedObject =  $scope.gridApi.selection.getSelectedRows();

      var indexSelected = $scope.gridOptions.data.indexOf(selectedObject[0]);
      $scope.gridOptions.data.splice(indexSelected, 1);
  };

  $scope.retificar = function(){
      var errors = [];
      var rows = $scope.gridApi2.selection.getSelectedRows();
      rows.forEach( function ( row, index ){
        if(row.emRetificacao) {
          //alert("O evento " + row.numons + " já está em retificação na área de trabalho!");
          errors.push("O evento " + row.numons + " já está em retificação na área de trabalho!\n");
        } else {
          row.emRetificacao = true;
          row.temcomons = 'S';
          row.com_ons = "[sager dd/MM/yyyy] Retificado pela tarefa XXXXXXXX";
          $scope.gridOptions.data.push(row);
        }
      });
      $scope.errorMsg = errors.join();

      // Limpa mensagem depois de 5s.
      $interval( function() {
        delete $scope.errorMsg; 
    }, 5000, 1);
  };

   $scope.copyRows=function(){
    
      var selectedObject =  $scope.gridApi.selection.getSelectedRows();

      $scope.gridApi.selection.clearSelectedRows();

      var newData=angular.copy(selectedObject[0]);
      newData.numons = "";
      newData.datahora = "";
      var newDataArray= [];
      newDataArray.push(newData);

      var indexSelected = $scope.gridOptions.data.indexOf(selectedObject[0]);
      $scope.gridOptions.data.splice(indexSelected+1, 0, newData); //Insert after selected row
    $interval( function() {
      $scope.gridApi.rowEdit.setRowsDirty(newDataArray);
    }, 0, 1);

    }; 
    $scope.adicionar=function(){
    
      var selectedObject =  $scope.gridApi.selection.getSelectedRows();

     $scope.gridApi.selection.clearSelectedRows();

      var newData= {};
      var newDataArray= [];
      newDataArray.push(newData);

      var indexSelected = $scope.gridOptions.data.indexOf(selectedObject[0]);
      $scope.gridOptions.data.splice(indexSelected+1, 0, newData); //Insert after selected row
    $interval( function() {
      $scope.gridApi.rowEdit.setRowsDirty(newDataArray);
    }, 0, 1);

    };
  $scope.salvar = function() {
    $scope.gridApi.rowEdit.flushDirtyRows( $scope.gridApi.grid );
  }

  $scope.saveRow = function( rowEntity ) {
    // create a fake promise - normally you'd use the promise returned by $http or $resource
    var promise = $q.defer();
    $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );
 
    $interval( function() {
        rowEntity.obs = "Não pode existir origem para eventos com condição operativa NOR. NOT ou TST (Regra: Evento NOR,NOT,TST com valor de origem)<br/>Não pode existir origem para eventos com condição operativa NOR. NOT ou TST (Regra: Evento NOR,NOT,TST com valor de origem)<br>Não pode existir origem para eventos com condição operativa NOR. NOT ou TST (Regra: Evento NOR,NOT,TST com valor de origem)";
        
        if(rowEntity.disp == '527') {
            rowEntity.retificado = 'S';
            promise.resolve();
         } else {
          
          promise.reject(); // simula erro na critica
        }
    }, 1000, 1);
  };

  $scope.export = function(){
    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
    $scope.gridApi.exporter.csvExport( "all", "all", myElement );
  };
}])

.filter('mapTarefaStatus', function() {
  return function( input ) {
    switch( input ){
      case "Concluido":
        return 'label-success';
        break;
      case "Solicitado":
        return 'label-primary';
        break;
      case "Cancelado":
        return 'label-danger';
        break;
      default:
        return 'label-default';
        break;
    }
  };
})

.directive('myCustomModal', function() {
  return {
    template: '<label>{{colFilter.term}}</label><button ng-click="showAgeModal()">...</button>',
    controller: 'myCustomModalCtrl'
  };
})
;

