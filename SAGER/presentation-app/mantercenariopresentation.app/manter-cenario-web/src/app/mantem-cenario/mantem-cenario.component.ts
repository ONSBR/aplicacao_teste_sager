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

  public filtroConsulta = new FiltroConsulta();
  public cenarios: Cenario[] = [];
  public cenarioSelecionado: Cenario = new Cenario();
  public environment;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.environment = environment;
  }

  ngOnInit() {
  }

  pesquisar() {
    this.cenarioSelecionado = new Cenario();
    const url = environment.urlServerPresentation + environment.pesquisarCenarios;
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
      const url = environment.urlServerPresentation + environment.excluirCenario + '?idCenario=' + cenario.idCenario;
      this.http.delete(url).subscribe(data => {
        alert('Exclusão de cenário realizada com sucesso!');
        this.pesquisar();
      });
    }

  }

  incorporar(cenario) {

    if (confirm('Confirma a incorporação do cenário?')) {
      const url = environment.urlServerPresentation + environment.incorporarCenario + '?idCenario=' + cenario.idCenario;
      this.http.post(url, { idCenario: cenario.idCenario }).subscribe(data => {
        alert('Incorporação de cenário realizada com sucesso!');
        this.pesquisar();
      });
    }

  }

  ativarInativar(cenario) {
    const url = environment.urlServerPresentation + environment.ativarInativarCenario;
    this.http.post(url, { idCenario: cenario.idCenario }).subscribe(data => {
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
    const url = environment.urlServerPresentation + environment.obterRegrasCriticas +
      '?idCenario=' + this.cenarioSelecionado.idCenario;

    this.http.get(url).subscribe(data => {
      this.cenarioSelecionado.regras = <RegraCritica[]>data;
      this.openDialog();
    });
  }

  incluir() {

    this.cenarioSelecionado = new Cenario();
    this.cenarioSelecionado.idCenario = Guid.newGuid();

    this.openDialog();
  }

  confirmarInclusao(cenario) {
    const url = environment.urlServerPresentation + environment.inserirCenario;

    this.http.put(url, cenario).subscribe(data => {
      alert('Inclusão de cenário realizada com sucesso!');
      this.pesquisar();
    });
  }

  confirmarAlteracao(cenario) {

    const url = environment.urlServerPresentation + environment.alterarCenario;
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
    console.log('cenario selecionado');
    console.log(this.cenarioSelecionado);
    const dialogRef = this.dialog.open(DialogCenarioComponent, {
      width: '1050px', height: '450px',
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