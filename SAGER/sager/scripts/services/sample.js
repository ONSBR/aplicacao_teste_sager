'use strict';

/**
 * @ngdoc service
 * @name angularGanttDemoApp.Sample
 * @description
 * # Sample
 * Service in the angularGanttDemoApp.
 */
angular.module('angularGanttDemoApp')
    .service('Sample', function Sample() {
        return {
            getExample: function() {
                return [
                        // Order is optional. If not specified it will be assigned automatically
                        {name: 'Milestones', height: '3em', sortable: false, drawTask: false, classes: 'gantt-row-milestone', color: '#45607D', tasks: [
                            // Dates can be specified as string, timestamp or javascript date object. The data attribute can be used to attach a custom object
                            {name: 'Kickoff', color: '#93C47D', from: '2013-10-07T09:00:00', to: '2013-10-07T10:00:00', data: 'Can contain any custom data or object'},
                            {name: 'Concept approval', color: '#93C47D', from: new Date(2013, 9, 18, 18, 0, 0), to: new Date(2013, 9, 18, 18, 0, 0), est: new Date(2013, 9, 16, 7, 0, 0), lct: new Date(2013, 9, 19, 0, 0, 0)},
                            {name: 'Development finished', color: '#93C47D', from: new Date(2013, 10, 15, 18, 0, 0), to: new Date(2013, 10, 15, 18, 0, 0)},
                            {name: 'Shop is running', color: '#93C47D', from: new Date(2013, 10, 22, 12, 0, 0), to: new Date(2013, 10, 22, 12, 0, 0)},
                            {name: 'Go-live', color: '#93C47D', from: new Date(2013, 10, 29, 16, 0, 0), to: new Date(2013, 10, 29, 16, 0, 0)}
                        ], data: 'Can contain any custom data or object'},
                        {name: 'Status meetings', tasks: [
                            {name: 'Demo #1', color: '#9FC5F8', from: new Date(2013, 9, 25, 15, 0, 0), to: new Date(2013, 9, 25, 18, 30, 0)},
                            {name: 'Demo #2', color: '#9FC5F8', from: new Date(2013, 10, 1, 15, 0, 0), to: new Date(2013, 10, 1, 18, 0, 0)},
                            {name: 'Demo #3', color: '#9FC5F8', from: new Date(2013, 10, 8, 15, 0, 0), to: new Date(2013, 10, 8, 18, 0, 0)},
                            {name: 'Demo #4', color: '#9FC5F8', from: new Date(2013, 10, 15, 15, 0, 0), to: new Date(2013, 10, 15, 18, 0, 0)},
                            {name: 'Demo #5', color: '#9FC5F8', from: new Date(2013, 10, 24, 9, 0, 0), to: new Date(2013, 10, 24, 10, 0, 0)}
                        ]},
                        {name: 'Kickoff', movable: {allowResizing: false}, tasks: [
                            {name: 'Day 1', color: '#9FC5F8', from: new Date(2013, 9, 7, 9, 0, 0), to: new Date(2013, 9, 7, 17, 0, 0),
                                progress: {percent: 100, color: '#3C8CF8'}, movable: false},
                            {name: 'Day 2', color: '#9FC5F8', from: new Date(2013, 9, 8, 9, 0, 0), to: new Date(2013, 9, 8, 17, 0, 0),
                                progress: {percent: 100, color: '#3C8CF8'}},
                            {name: 'Day 3', color: '#9FC5F8', from: new Date(2013, 9, 9, 8, 30, 0), to: new Date(2013, 9, 9, 12, 0, 0),
                                progress: {percent: 100, color: '#3C8CF8'}}
                        ]},
                        {name: 'Create concept', tasks: [
                            {name: 'Create concept', priority: 20, content: '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}', color: '#F1C232', from: new Date(2013, 9, 10, 8, 0, 0), to: new Date(2013, 9, 16, 18, 0, 0), est: new Date(2013, 9, 8, 8, 0, 0), lct: new Date(2013, 9, 18, 20, 0, 0),
                                progress: 100}
                        ]},
                        {name: 'Finalize concept', tasks: [
                            {id: 'Finalize concept', name: 'Finalize concept', priority: 10, color: '#F1C232', from: new Date(2013, 9, 17, 8, 0, 0), to: new Date(2013, 9, 18, 18, 0, 0),
                                progress: 100}
                        ]},
                        {name: 'Development', children: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4'], content: '<i class="fa fa-file-code-o" ng-click="scope.handleRowIconClick(row.model)"></i> {{row.model.name}}'},
                        {name: 'Sprint 1', tooltips: false, tasks: [
                            {id: 'Product list view', name: 'Product list view', color: '#F1C232', from: new Date(2013, 9, 21, 8, 0, 0), to: new Date(2013, 9, 25, 15, 0, 0),
                                progress: 25, dependencies: [{to: 'Order basket'}, {from: 'Finalize concept'}]}
                        ]},
                        {name: 'Sprint 2', tasks: [
                            {id: 'Order basket', name: 'Order basket', color: '#F1C232', from: new Date(2013, 9, 28, 8, 0, 0), to: new Date(2013, 10, 1, 15, 0, 0),
                                dependencies: {to: 'Checkout'}}
                        ]},
                        {name: 'Sprint 3', tasks: [
                            {id: 'Checkout', name: 'Checkout', color: '#F1C232', from: new Date(2013, 10, 4, 8, 0, 0), to: new Date(2013, 10, 8, 15, 0, 0),
                                dependencies: {to: 'Login & Signup & Admin Views'}}
                        ]},
                        {name: 'Sprint 4', tasks: [
                            {id: 'Login & Signup & Admin Views', name: 'Login & Signup & Admin Views', color: '#F1C232', from: new Date(2013, 10, 11, 8, 0, 0), to: new Date(2013, 10, 15, 15, 0, 0),
                                dependencies: [{to: 'HW'}, {to: 'SW / DNS/ Backups'}]}
                        ]},
                        {name: 'Hosting'},
                        {name: 'Setup', tasks: [
                            {id: 'HW', name: 'HW', color: '#F1C232', from: new Date(2013, 10, 18, 8, 0, 0), to: new Date(2013, 10, 18, 12, 0, 0)}
                        ]},
                        {name: 'Config', tasks: [
                            {id: 'SW / DNS/ Backups', name: 'SW / DNS/ Backups', color: '#F1C232', from: new Date(2013, 10, 18, 12, 0, 0), to: new Date(2013, 10, 21, 18, 0, 0)}
                        ]},
                        {name: 'Server', parent: 'Hosting', children: ['Setup', 'Config']},
                        {name: 'Deployment', parent: 'Hosting', tasks: [
                            {name: 'Depl. & Final testing', color: '#F1C232', from: new Date(2013, 10, 21, 8, 0, 0), to: new Date(2013, 10, 22, 12, 0, 0), 'classes': 'gantt-task-deployment'}
                        ]},
                        {name: 'Workshop', tasks: [
                            {name: 'On-side education', color: '#F1C232', from: new Date(2013, 10, 24, 9, 0, 0), to: new Date(2013, 10, 25, 15, 0, 0)}
                        ]},
                        {name: 'Content', tasks: [
                            {name: 'Supervise content creation', color: '#F1C232', from: new Date(2013, 10, 26, 9, 0, 0), to: new Date(2013, 10, 29, 16, 0, 0)}
                        ]},
                        {name: 'Documentation', tasks: [
                            {name: 'Technical/User documentation', color: '#F1C232', from: new Date(2013, 10, 26, 8, 0, 0), to: new Date(2013, 10, 28, 18, 0, 0)}
                        ]}
                    ];
            },
            getSampleData: function() {
                var data = [
                        // {name: 'Marcos Regulatórios', height: '3em', sortable: false,  classes: 'gantt-row-milestone', color: '#45607D', tasks: [
                        //     // Dates can be specified as string, timestamp or javascript date object. The data attribute can be used to attach a custom object
                        //     {name: 'Resolução Normativa ANEEL 614/2014', color: '#93C47D', from: '2014-10-01T00:00:00', to: '2014-10-01T00:00:00', data: 'Can contain any custom data or object'},
                        //     {name: 'Resolução Normativa ANEEL 688/2003', color: '#93C47D', from: new Date(2004, 6, 1, 0, 0, 0), to: new Date(2014, 9, 1, 0, 0, 0)}
                        // ], data: 'Can contain any custom data or object'},
                        // Order is optional. If not specified it will be assigned automatically
                        {name: 'Cenário Inicial', children:['ini_solicitar1','ini_ret1','ini_ret2','ini_ret3'],dtCom: new Date(2017,0,1)},
                        {name: 'ini_solicitar1',content: 'Solicitar Cálculo (protocolo 0001/2017)',dtCom: new Date(2017,0,2), height: '3em',  data: 'Can contain any custom data or object'},
                        {name: 'ini_ret1',content:'Tarefa Retificação (COSR-NET0001/2017)',dtCom: new Date(2017,0,3), height: '3em',  data: 'Can contain any custom data or object'},
                        {name: 'ini_ret2',content:'Tarefa Retificação (COSR-NET0002/2017)',dtCom: new Date(2017,0,4), height: '3em',  data: 'Can contain any custom data or object'},
                        {name: 'ini_ret3',content:'Tarefa Retificação (COSR-NET0003/2017)',dtCom: new Date(2017,0,6), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'cen1', content:'Cenário 1 (desde EOC)',children:['cen1_criacao','cen1_ret3'],dtCom: new Date(2017,0,5) },
                        {name: 'cen1_criacao',content:'Criação do Cenário', height: '3em',dtCom: new Date(2017,0,5),  dependencies: {from: 'ini_ret2'}, data: 'Can contain any custom data or object'},
                        {name: 'cen1_ret3',content:'Tarefa Retificação (COSR-NET0003/2017)',dtCom: new Date(2017,0,6), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'Cenário 2', children:['cen2_criacao','cen2_ret3'],dtCom: new Date(2017,0,7)},
                        {name: 'cen2_criacao',content:'Criação do Cenário',dtCom: new Date(2017,0,7), height: '3em', data: 'Can contain any custom data or object'}
                    ];

                data[1].tasks = [] // criando tarefas para cenário inicial
                data[2].tasks = [] // criando tarefas ini_ret1
                data[3].tasks = [] // criando tarefas ini_ret2
                data[4].tasks = [] // criando tarefas ini_ret3
                data[6].tasks = [] // criando tarefas cen1_criacao
                data[7].tasks = [] // criando tarefas cen1_ret3
                data[9].tasks = [] // criando tarefas cen2_criacao
                

                var dtInicial = new Date(2001,0,1); // 01/01/2001
                var dtRet1 = new Date(2016,0,1); // 01/01/2016
                var dtRet1Com = new Date(2017,0,1); //01/01/2017
                var dtRet2 = new Date(2015,0,1); // 01/01/2015
                var dtRet3 = new Date(2016,5,1); // 01/06/2016
                var dtCen2 = new Date(2014,0,1); // 01/01/2014
                var dtHoje = new Date();
                while (dtInicial.getTime() < dtHoje.getTime()) {
                    var dtProxMes = new Date(dtInicial.getTime());
                    dtProxMes.setMonth(dtInicial.getMonth() + 1);
                    data[1].tasks.push({
                        name: "0,12345678",
                        color: '#93C47D',
                        from: new Date(dtInicial.getTime()),
                        to: dtProxMes

                    });
                    if(dtInicial.getTime() >= dtRet1.getTime()) {
                        data[2].tasks.push({
                            name: "0,12345678",
                            color: '#93C47D',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    }
                    if(dtInicial.getTime() >= dtRet2.getTime()) {
                        data[3].tasks.push({
                            name: "0,12345678",
                            color: '#93C47D',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    }
                    if(dtInicial.getTime() >= dtRet3.getTime()) {
                        data[4].tasks.push({
                            name: "0,12345678",
                            color: '#93C47D',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    }
                    
                    data[6].tasks.push({
                        name: "0,12345678",
                        color: '#93C47D',
                        from: new Date(dtInicial.getTime()),
                        to: dtProxMes
                    });
                    if(dtInicial.getTime() >= dtRet3.getTime()) {
                        data[7].tasks.push({
                            name: "0,12345678",
                            color: '#93C47D',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    }
                    if(dtInicial.getTime() >= dtCen2.getTime()) {
                        data[9].tasks.push({
                            name: "0,12345678",
                            color: '#93C47D',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    }
                    dtInicial.setMonth(dtInicial.getMonth() + 1);
                }

                return data; 
            },
            // mostra as informações por ordem do mais novo pro mais antigo
            getSampleDataInverso: function() {
                var data = [
                        // {name: 'Marcos Regulatórios', height: '3em', sortable: false,  classes: 'gantt-row-milestone', color: '#45607D', tasks: [
                        //     // Dates can be specified as string, timestamp or javascript date object. The data attribute can be used to attach a custom object
                        //     {name: 'Resolução Normativa ANEEL 614/2014', color: '#93C47D', from: '2014-10-01T00:00:00', to: '2014-10-01T00:00:00', data: 'Can contain any custom data or object'},
                        //     {name: 'Resolução Normativa ANEEL 688/2003', color: '#93C47D', from: new Date(2004, 6, 1, 0, 0, 0), to: new Date(2014, 9, 1, 0, 0, 0)}
                        // ], data: 'Can contain any custom data or object'},
                        // Order is optional. If not specified it will be assigned automatically
                        {name: 'Cenário Principal Vigente', children:['ini_solicitar2','ini_solicitar1','ini_ret1','ini_ret2','ini_ret3'],dtCom: new Date(2016,10,2)},
                        {name: 'ini_solicitar2',content:'Solicitar Cálculo (protocolo 0002/2017)',dtCom: new Date(2016,11,8), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'ini_ret3',content:'Tarefa Retificação (COSR-NET0003/2017)',dtCom: new Date(2016,10,6), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'ini_ret2',content:'Tarefa Retificação (COSR-NET0002/2017)',dtCom: new Date(2016,10,4), height: '3em',  data: 'Can contain any custom data or object'},
                        {name: 'ini_ret1',content:'Tarefa Retificação (COSR-NET0001/2017)',dtCom: new Date(2016,10,3), height: '3em',  data: 'Can contain any custom data or object'},
                        {name: 'ini_solicitar1',content: 'Solicitar Cálculo (protocolo 0001/2017)',dtCom: new Date(2016,10,2), height: '3em',  data: 'Can contain any custom data or object'},
                        {name: 'cen1', content:'Cenário 1 (desde EOC)',children:['cen1_criacao','cen1_ret3','cen1_solicitar2'],dtCom: new Date(2016,10,5) },
                        {name: 'cen1_solicitar2',content:'Solicitar Cálculo (protocolo 0002/2017)',dtCom: new Date(2016,11,8), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'cen1_ret3',content:'Tarefa Retificação (COSR-NET0003/2017)',dtCom: new Date(2016,10,6), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'cen1_criacao',content:'Criação do Cenário', height: '3em',dtCom: new Date(2016,10,5),  dependencies: [{from: 'ini_ret2'}], data: 'Can contain any custom data or object'},
                        {name: 'Cenário 2', children:['cen2_criacao','cen2_ret3','cen2_solicitar2','cen2_desativacao'],dtCom: new Date(2016,10,7)},
                        {name: 'cen2_desativacao',content:'Desativação de cenário',dtCom: new Date(2016,11,9), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'cen2_solicitar2',content:'Solicitar Cálculo (protocolo 0002/2017)',dtCom: new Date(2016,11,8), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'cen2_criacao',content:'Criação do Cenário',dtCom: new Date(2016,10,7), height: '3em', data: 'Can contain any custom data or object'}
                    ];

                var iRet3 = 2;
                var iRet2 = 3;
                var iRet1 = 4;
                var iSolicitar1 = 5;
                var iSolicitar2 = 1;
                var icen1_solicitar2 = 7;
                var icen1_ret3 = 8;
                var icen1_criacao = 9;
                var icen2_desativacao = 11;
                var icen2_solicitar2 = 12;
                var icen2_criacao = 13;

                data[iRet3].tasks = []; 
                data[iRet2].tasks = [];
                data[iRet1].tasks = [];
                data[iSolicitar1].tasks = [];
                data[iSolicitar2].tasks = [];
                data[icen1_solicitar2].tasks = [];
                data[icen1_ret3].tasks = [];
                data[icen1_criacao].tasks = [];
                data[icen2_desativacao].tasks = [];
                data[icen2_solicitar2].tasks = [];
                data[icen2_criacao].tasks = [];
                

                var dtInicial = new Date(2001,0,1); // 01/01/2001
                var dtRet1 = new Date(2016,0,1); // 01/01/2016
                var dtRet1Com = new Date(2017,0,1); //01/01/2017
                var dtRet2 = new Date(2015,0,1); // 01/01/2015
                var dtRet3 = new Date(2016,5,1); // 01/06/2016
                var dtCen2 = new Date(2014,0,1); // 01/01/2014
                var dtHoje = new Date(2017,0,1); // 01/01/2017
                dtHoje.setMonth(dtInicial.getMonth() - 2);

                while (dtInicial.getTime() < dtHoje.getTime()) {
                    var dtProxMes = new Date(dtInicial.getTime());
                    dtProxMes.setMonth(dtInicial.getMonth() + 1);

                    if(dtInicial.getTime() < dtRet2.getTime()) {
                        data[iSolicitar1].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-ativa"],
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes

                        });
                    }
                    if(dtInicial.getTime() >= dtRet1.getTime()) {
                        data[iRet1].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-inativa"],
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    }
                    if(dtInicial.getTime() >= dtRet2.getTime()) {
                        
                        data[iSolicitar1].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-inativa"],
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes

                        });
                        if (dtInicial.getTime() < dtRet3.getTime()) {
                            data[iRet2].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-ativa"],
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                            });
                        } else {
                            data[iRet2].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-inativa"],
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                        }
                    }
                    
                    if(dtInicial.getTime() < dtRet3.getTime()) {
                        data[icen1_criacao].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-ativa"],
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    } else {
                        data[icen1_criacao].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-inativa"],
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                        data[iRet3].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-ativa"],
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });

                        data[icen1_ret3].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-ativa"],
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    }
                    if(dtInicial.getTime() >= dtCen2.getTime()) {
                        data[icen2_criacao].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-inativa"],
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    }
                    dtInicial.setMonth(dtInicial.getMonth() + 1);
                }

                data[iSolicitar2].tasks.push({
                        name: "0,12345678",
                        classes: ["tarefa-ativa"],
                        from: new Date('2016-11-01'),
                        to: new Date('2016-12-01')

                });
                data[icen1_solicitar2].tasks.push({
                        name: "0,12345678",
                        classes: ["tarefa-ativa"],
                        from: new Date('2016-11-01'),
                        to: new Date('2016-12-01')

                    });
                data[icen2_solicitar2].tasks.push({
                        name: "0,12345678",
                        classes: ["tarefa-inativa"],
                        from: new Date('2016-11-01'),
                        to: new Date('2016-12-01')

                    });

                return data; 
            },
            getSampleDataInverso2: function() {
                var data = [
                        // {name: 'Marcos Regulatórios', height: '3em', sortable: false,  classes: 'gantt-row-milestone', color: '#45607D', tasks: [
                        //     // Dates can be specified as string, timestamp or javascript date object. The data attribute can be used to attach a custom object
                        //     {name: 'Resolução Normativa ANEEL 614/2014', color: '#93C47D', from: '2014-10-01T00:00:00', to: '2014-10-01T00:00:00', data: 'Can contain any custom data or object'},
                        //     {name: 'Resolução Normativa ANEEL 688/2003', color: '#93C47D', from: new Date(2004, 6, 1, 0, 0, 0), to: new Date(2014, 9, 1, 0, 0, 0)}
                        // ], data: 'Can contain any custom data or object'},
                        // Order is optional. If not specified it will be assigned automatically
                        {name: 'ini', content: '<i class="fa fa-circle"></i> Cenário Principal Vigente', children:['ini_solicitar2','ini_solicitar1','ini_ret1','ini_ret2','ini_ret3'],dtCom: new Date(2016,10,2)},
                        {name: 'ini_solicitar2',content:'<i class="fa fa-cog"></i> Solicitar Cálculo (protocolo 0002/2017)',dtCom: new Date(2016,11,8), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'ini_ret3',content:'<i class="fa fa-cog"></i> Tarefa Retificação (COSR-NET0003/2017)',dtCom: new Date(2016,10,6), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'ini_ret2',content:'<i class="fa fa-cog"></i> Tarefa Retificação (COSR-NET0002/2017)',dtCom: new Date(2016,10,4), height: '3em',  dependencies: {to: 'cen1'}},
                        {name: 'ini_ret1',content:'<i class="fa fa-cog"></i> Tarefa Retificação (COSR-NET0001/2017)',dtCom: new Date(2016,10,3), height: '3em',  data: 'Can contain any custom data or object'},
                        {name: 'ini_solicitar1',content: '<i class="fa fa-cog"></i> Solicitar Cálculo (protocolo 0001/2017)',dtCom: new Date(2016,10,2), height: '3em',  data: 'Can contain any custom data or object'},
                        {name: 'cen1', content:'<i class="fa fa-circle-o"></i> Cenário 1 (desde EOC)',children:['cen1_criacao','cen1_ret3','cen1_solicitar2'],dtCom: new Date(2016,10,5) },
                        {name: 'cen1_solicitar2',content:'<i class="fa fa-cog"></i> Solicitar Cálculo (protocolo 0002/2017)',dtCom: new Date(2016,11,8), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'cen1_ret3',content:'<i class="fa fa-cog"></i> Tarefa Retificação (COSR-NET0003/2017)',dtCom: new Date(2016,10,6), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'cen1_criacao',content:'<i class="fa fa-cog"></i> Criação do Cenário', height: '3em',dtCom: new Date(2016,10,5)},
                        {name: 'cen2', content:'<i class="fa fa-lock"></i> Cenário 2', classes: ['desativada'],children:['cen2_criacao','cen2_ret3','cen2_solicitar2','cen2_desativacao'], dtCom: new Date(2016,10,7)},
                        {name: 'cen2_desativacao',content:'<i class="fa fa-cog"></i> Desativação de cenário',classes: ['desativada'],dtCom: new Date(2016,11,9), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'cen2_solicitar2',content:'<i class="fa fa-cog"></i> Solicitar Cálculo (protocolo 0002/2017)',classes: ['desativada'],dtCom: new Date(2016,11,8), height: '3em', data: 'Can contain any custom data or object'},
                        {name: 'cen2_criacao',content:'<i class="fa fa-cog"></i> Criação do Cenário',classes: ['desativada'],dtCom: new Date(2016,10,7), height: '3em', data: 'Can contain any custom data or object'}
                    ];

                var icen_inicial = 0;
                var iSolicitar2 = 1;
                var iRet3 = 2;
                var iRet2 = 3;
                var iRet1 = 4;
                var iSolicitar1 = 5;
                var icen1 = 6;
                var icen1_solicitar2 = 7;
                var icen1_ret3 = 8;
                var icen1_criacao = 9;
                var icen2 = 10;
                var icen2_desativacao = 11;
                var icen2_solicitar2 = 12;
                var icen2_criacao = 13;

                data[icen_inicial].tasks = [];
                data[iRet3].tasks = []; 
                data[iRet2].tasks = [];
                data[iRet1].tasks = [];
                data[iSolicitar1].tasks = [];
                data[iSolicitar2].tasks = [];
                data[icen1].tasks = [];
                data[icen1_solicitar2].tasks = [];
                data[icen1_ret3].tasks = [];
                data[icen1_criacao].tasks = [];
                data[icen2].tasks = [];
                data[icen2_desativacao].tasks = [];
                data[icen2_solicitar2].tasks = [];
                data[icen2_criacao].tasks = [];
                

                var dtInicial = new Date(2001,0,1); // 01/01/2001
                var dtRet1 = new Date(2016,0,1); // 01/01/2016
                var dtRet1Com = new Date(2017,0,1); //01/01/2017
                var dtRet2 = new Date(2015,0,1); // 01/01/2015
                var dtRet3 = new Date(2016,5,1); // 01/06/2016
                var dtCen2 = new Date(2014,0,1); // 01/01/2014
                var dtHoje = new Date(2017,0,1); // 01/01/2017
                dtHoje.setMonth(dtInicial.getMonth() - 2);

                while (dtInicial.getTime() < dtHoje.getTime()) {
                    var dtProxMes = new Date(dtInicial.getTime());
                    dtProxMes.setMonth(dtInicial.getMonth() + 1);

                    data[icen_inicial].tasks.push({
                        name: "0,12345678",
                        classes: ["resumo"],
                        content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                        from: new Date(dtInicial.getTime()),
                        to: dtProxMes

                    });

                    data[icen1].tasks.push({
                        name: "0,12345678",
                        classes: ["resumo"],
                        content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                        from: new Date(dtInicial.getTime()),
                        to: dtProxMes

                    });

                    if(dtInicial.getTime() < dtRet2.getTime()) {
                        data[iSolicitar1].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-ativa"],
                            content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes

                        });
                    }
                    if(dtInicial.getTime() >= dtRet1.getTime()) {
                        data[iRet1].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-inativa"],
                            content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    }
                    if(dtInicial.getTime() >= dtRet2.getTime()) {
                        
                        data[iSolicitar1].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-inativa"],
                            content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes

                        });
                        if (dtInicial.getTime() < dtRet3.getTime()) {
                            data[iRet2].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-ativa"],
                            content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                            });
                        } else {
                            data[iRet2].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-inativa"],
                            content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                        }
                    }
                    
                    if(dtInicial.getTime() < dtRet3.getTime()) {
                        data[icen1_criacao].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-ativa"],
                            content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    } else {
                        data[icen1_criacao].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-inativa"],
                            content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                        data[iRet3].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-ativa"],
                            content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });

                        data[icen1_ret3].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-ativa"],
                            content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    }
                    if(dtInicial.getTime() >= dtCen2.getTime()) {
                        data[icen2].tasks.push({
                        name: "0,12345678",
                        classes: ["resumo"],
                        content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                        from: new Date(dtInicial.getTime()),
                        to: dtProxMes

                        });
                        data[icen2_criacao].tasks.push({
                            name: "0,12345678",
                            classes: ["tarefa-inativa"],
                            content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                            from: new Date(dtInicial.getTime()),
                            to: dtProxMes
                        });
                    }
                    dtInicial.setMonth(dtInicial.getMonth() + 1);
                }
                data[icen_inicial].tasks.push({
                        name: "0,12345678",
                        classes: ["resumo"],
                        content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                        from: new Date('2016-11-01'),
                        to: new Date('2016-12-01')

                });
                data[icen1].tasks.push({
                        name: "0,12345678",
                        classes: ["resumo"],
                        content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                        from: new Date('2016-11-01'),
                        to: new Date('2016-12-01')

                    });
                data[icen2].tasks.push({
                        name: "0,12345678",
                        classes: ["resumo"],
                        content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                        from: new Date('2016-11-01'),
                        to: new Date('2016-12-01')

                    });

                data[iSolicitar2].tasks.push({
                        name: "0,12345678",
                        classes: ["tarefa-ativa"],
                        content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                        from: new Date('2016-11-01'),
                        to: new Date('2016-12-01')

                });
                data[icen1_solicitar2].tasks.push({
                        name: "0,12345678",
                        classes: ["tarefa-ativa"],
                        content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                        from: new Date('2016-11-01'),
                        to: new Date('2016-12-01')

                    });
                data[icen2_solicitar2].tasks.push({
                        name: "0,12345678",
                        classes: ["tarefa-inativa"],
                        content: '{{task.model.name}} <i class="fa fa-info-circle" ng-click="scope.handleTaskIconClick($event,task.model)"></i>',
                        from: new Date('2016-11-01'),
                        to: new Date('2016-12-01')

                    });

                return data; 
            },
            getSampleTimespans: function() {
                // TODO: criar periodos de suspensão?

                // var data = [
                //         {
                //             from: new Date(2012, 11, 21, 8, 0, 0),
                //             to: new Date(2015, 3, 25, 15, 0, 0),
                //             name: 'Suspensão',
                //             color: '#FF0000'
                //             //priority: undefined,
                //             //classes: [],
                //             //data: undefined
                //         }
                //     ];
                var data = [];
                return data;
            }
        };
    })
;
