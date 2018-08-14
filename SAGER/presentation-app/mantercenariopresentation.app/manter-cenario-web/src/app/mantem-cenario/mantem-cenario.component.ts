import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FiltroConsulta } from '../filtro/FiltroConsulta.model';
import { environment } from '../../environments/environment';
import { Cenario, SituacaoCenario, RegraCritica } from '../model/model';
import { DialogCenarioComponent } from './dialog-cenario/dialog-cenario.component';

import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material';

@Component({
  selector: 'app-mantem-cenario',
  templateUrl: './mantem-cenario.component.html',
  styleUrls: ['./mantem-cenario.component.css']
})
export class MantemCenarioComponent implements OnInit {

  private presentationId: string = Guid.newGuid();

  maxViewBusinessEvents = 20;
  filterEvts = { horas: 1, qtd: 20};

  public filtroConsulta = new FiltroConsulta();
  public cenarios: Cenario[] = [];
  public cenarioSelecionado: Cenario = new Cenario();
  public businessEvents = [];
  public environment;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.environment = environment;
  }

  get urlServerPresentation() {
    var url = window.location.href;
    if (!url.endsWith("/")) {
      url += "/";
    }
    return url;
  }

  ngOnInit() {
    const self = this;
    this.pollingConsultaBusinessEvents(self);
  }

  pesquisar() {
    this.cenarioSelecionado = new Cenario();
    const url = this.urlServerPresentation + environment.pesquisarCenarios;
    const body = this.filtroConsulta;
    this.http.post(url, body).subscribe(data => {
      this.cenarios = <Cenario[]>data;
      this.cenarios.forEach(it => {
        it.dataInicioVigencia = this.ajustarDataCalendario(it.dataInicioVigencia);
        it.dataFimVigencia = this.ajustarDataCalendario(it.dataFimVigencia);
      });
    });
  }

  printIdentify(ident) {
    return ident && ident.length > 20 ? ident.substring(0, 20) + '...' : ident;
  }

  excluir(cenario) {

    if (confirm('Confirma a exclusão do cenário?')) {
      const url = this.urlServerPresentation + environment.excluirCenario + '?idCenario=' + cenario.idCenario;
      this.http.delete(url).subscribe(data => {
        alert('Exclusão de cenário realizada com sucesso!');
        this.pesquisar();
      });
    }

  }

  incorporar(cenario) {

    if (confirm('Confirma a incorporação do cenário?')) {
      const url = this.urlServerPresentation + environment.incorporarCenario + '?idCenario=' + cenario.idCenario;
      this.http.post(url, { idCenario: cenario.idCenario }).subscribe(data => {
        alert('Incorporação de cenário realizada com sucesso!');
        this.pesquisar();
      });
    }

  }

  ativarInativar(cenario) {
    const url = this.urlServerPresentation + environment.ativarInativarCenario;
    const body = {
      idCenario: cenario.idCenario,
      dataInicioVigencia: cenario.dataInicioVigencia,
      dataFimVigencia: cenario.dataFimVigencia,
      idUsina: cenario.idUsina
    };
    this.http.post(url, body).subscribe(data => {
      alert('Alteração de cenário realizada com sucesso!');
      this.pesquisar();
    });
  }

  private ajustarDataCalendario(dataAjuste) {
    const idx = dataAjuste.indexOf('T');
    return idx > 0 ? dataAjuste.substring(0, idx) : dataAjuste;
  }

  alterar(cenario) {
    this.cenarioSelecionado = clone(cenario);
    this.cenarioSelecionado.dataInicioVigencia = this.ajustarDataCalendario(this.cenarioSelecionado.dataInicioVigencia);
    this.cenarioSelecionado.dataFimVigencia = this.ajustarDataCalendario(this.cenarioSelecionado.dataFimVigencia);
    const url = this.urlServerPresentation + environment.obterRegrasCriticas +
      '?idCenario=' + this.cenarioSelecionado.idCenario;

    this.http.get(url).subscribe(data => {
      this.cenarioSelecionado.regras = <RegraCritica[]>data;
      this.cenarioSelecionado.regras.forEach(regra => {
        regra.dataInicioVigencia = this.ajustarDataCalendario(regra.dataInicioVigencia);
        regra.dataFimVigencia = this.ajustarDataCalendario(regra.dataFimVigencia);
      });
      this.openDialog();
    });
  }

  incluir() {

    this.cenarioSelecionado = new Cenario();
    this.cenarioSelecionado.idCenario = Guid.newGuid();

    this.openDialog();
  }

  confirmarInclusao(cenario) {
    const url = this.urlServerPresentation + environment.inserirCenario;

    this.http.put(url, cenario).subscribe(data => {
      alert('Inclusão de cenário realizada com sucesso!');
      this.pesquisar();
    });
  }

  confirmarAlteracao(cenario) {

    const url = this.urlServerPresentation + environment.alterarCenario;
    if (cenario.situacao === SituacaoCenario.Ativo) {
      alert('Cenário ativo não pode ser alterado!');
    } else {
      this.http.post(url, cenario).subscribe(data => {
        alert('Alteração de cenário realizada com sucesso!');
        this.pesquisar();
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCenarioComponent, {
      width: '1400px', height: '450px',
      data: this.cenarioSelecionado
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        let cenario = findCenario(this.cenarios, result);
        if (!cenario) {
          cenario = result;
          cenario.idCenario = Guid.newGuid();
          cenario.situacao = SituacaoCenario.Inativo;
          this.confirmarInclusao(cenario);
        } else {
          this.confirmarAlteracao(result);
        }
      }
    });
  }

  pollingConsultaBusinessEvents(self) {
    const listarBusinessEvents = this.listarBusinessEvents;
    listarBusinessEvents(self);
    setInterval(function () { listarBusinessEvents(self)}, 10000);
  }

  converterInt(valor) {
    let retorno = 0;
    try {
      retorno = parseInt(valor);
    } catch (error) { }
    return retorno;
  }

  listarBusinessEvents(self) {

    let url = self.urlServerPresentation + environment.listarBusinessEvents;
    url += '?horas=' + self.filterEvts.horas;

    let qtd = self.converterInt(self.filterEvts.qtd);
    if (qtd <= 0) {
      qtd = self.maxViewBusinessEvents;
    }

    self.http.get(url).subscribe(data => {
      const newlist = [];
      if (data && data.length > 0) {
        for (let i = data.length - 1; i >= data.length - qtd && i >= 0; i--) {
          newlist.push( self.descBusinessEvent(data[i]));
        }
      }
      self.businessEvents = newlist;
    });
  }

  descBusinessEvent(businessEvent) {
    let retorno = { data: new Date(businessEvent.timestamp), msg: '' };

    if (businessEvent.name == 'aplicar.criterios.cenario') {
      retorno.msg = 'Solicitação de abertura de cenário ' + businessEvent.payload.cenario.nomeCenario + ' recebida.';
    } else if (businessEvent.name == 'aplicar.criterios.cenario.done' ) {
      retorno.msg = 'Cenário aberto com sucesso.';
    } else if (businessEvent.name == 'aplicar.criterios.error') {
      retorno.msg = 'Erro na abertura do cenário: ' + businessEvent.payload.message;
    } else if (businessEvent.name == 'eb60a12f-130d-4b8b-8b0d-a5f94d39cb0b.merge.request') {
      retorno.msg = 'Solicitação de incorporação: ' + businessEvent.payload.branch  + ' recebida.';
    } else if (businessEvent.name == 'eb60a12f-130d-4b8b-8b0d-a5f94d39cb0b.merge.request.done') {
      retorno.msg = 'Cenário incorporado com sucesso.';
    }

    return retorno;
  }
}

let retorno: Cenario;
  function findCenario(cenarios: Array<Cenario>, cenario: Cenario) {
  if (cenario && cenario.idCenario) {
    cenarios.forEach((it) => {
      if (it.idCenario == cenario.idCenario) {
        retorno = it;
      }
    });
  }
  return retorno;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}



class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}