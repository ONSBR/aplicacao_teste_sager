import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FiltroConsulta } from '../filtro/FiltroConsulta.model';
import { environment } from '../../environments/environment';
import { Cenario, SituacaoCenario } from '../model/model';
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
  public cenarios: Array<Cenario> = [];
  public cenarioSelecionada: Cenario;
  public environment;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.environment = environment;
  }

  ngOnInit() {
  }

  pesquisar() {
    const url = environment.urlServerPresentation + environment.pesquisarCenario;
    const body = { 'filtroConsulta': this.filtroConsulta };
    this.http.post(url, body).subscribe(data => {
      this.cenarios = <Array<Cenario>>data;
    });
  }

  excluir(cenario) {
    var index = this.cenarios.indexOf(cenario);
    this.cenarios.splice(index,1);
  }

  ativarInativar(cenario) {
    var index = this.cenarios.indexOf(cenario);
    var cenarioSel = this.cenarios[index];
    if (cenarioSel.situacao == SituacaoCenario.Ativo) {
      cenarioSel.situacao = SituacaoCenario.Inativo;
    } else {
      cenarioSel.situacao = SituacaoCenario.Ativo;
    }
  }

  alterar(cenario) {

    this.cenarioSelecionada = clone(cenario);

    this.openDialog();
  }

  incluir() {

    this.cenarioSelecionada = new Cenario();

    this.openDialog();
  }

  openDialog() {

    let dialogRef = this.dialog.open(DialogCenarioComponent, {
      width: '1000px', height: '350px',
      data: this.cenarioSelecionada
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {

        var cenario = findCenario(this.cenarios, result);
        if (cenario) {
          cenario.nomeCenario = result.nomeCenario;
          cenario.dataInicioVigencia = result.dataInicioVigencia;
          cenario.dataFimVigencia = result.dataFimVigencia;
          cenario.justificativa = result.justificativa;
        } else {
          cenario = result;
          cenario.id = Guid.newGuid();
          cenario.situacao = SituacaoCenario.Ativo;
          this.cenarios.push(cenario);
        }
        this.cenarioSelecionada = cenario;
      }
    });
  }
 
}

function findCenario(cenarios: Array<Cenario>, cenario: Cenario) {
  var retorno: Cenario;
  if (cenario && cenario.id) {
    cenarios.forEach((it) => {
      if (it.id == cenario.id) {
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
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}