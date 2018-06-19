import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cenario, TipoRegra, RegraCritica, UnidadeGeradora, Usina } from '../../model/model';
import { environment } from '../../../environments/environment';
import { ClassificacaoOrigem, EstadoOperativo, CondicaoOperativa } from '../constants';
import { log } from 'util';

@Component({
  selector: 'app-dialog-cenario',
  templateUrl: './dialog-cenario.component.html',
  styleUrls: ['./dialog-cenario.component.css']
})
export class DialogCenarioComponent implements OnInit {

  tiposRegras: TipoRegra[] = Object.values(TipoRegra);

  uges: UnidadeGeradora[] = [];

  usinas: Usina[] = [];

  origens_type: string[] = Object.values(ClassificacaoOrigem);
  estados_type: string[] = Object.values(EstadoOperativo);
  condicoes_type: string[] = Object.values(CondicaoOperativa);

  getOrigens(tipoRegra): string[] {
    let retorno = [];
    if (tipoRegra == this.tiposRegras[2]) {
      retorno = this.origens_type;
    } else if (tipoRegra == this.tiposRegras[3]) {
      retorno = this.estados_type;
    } else if (tipoRegra == this.tiposRegras[4]) {
      retorno = this.condicoes_type;
    }
    return retorno;
  }

  get idUsina() {
    return this.data.idUsina;
  }

  set idUsina(value) {
    this.data.idUsina = value;
    this.listarUges();
  }

  constructor(private dialogRef: MatDialogRef<DialogCenarioComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Cenario, private http: HttpClient) {
    this.data = data;
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.listarUsinas();
    this.listarUges();
  }

  getUge(idUge) {
    let retorno = {};
    this.uges.forEach(it => {
      if (it.idUge == idUge) {
        retorno = it;
      }
    });
    return retorno;
  }

  listarUsinas() {
    this.http.get(environment.urlServerPresentation + environment.listarUsinas).subscribe(data => {
      this.usinas = <Usina[]>data;
    });
  }

  listarUges() {
    console.log('listar uges');
    console.log(this.data);
    if (this.data && this.data.idUsina) {
      const url = environment.urlServerPresentation + environment.listarUnidadesGeradoras +
        '?idUsina=' + this.data.idUsina;
      console.log(url);
      this.http.get(url).subscribe(data => {
        this.uges = <UnidadeGeradora[]>data;
      });
    } else {
      this.uges = [];
    }
  }

  confirmar(): void {

    if (this.data.nomeCenario && this.data.dataInicioVigencia && this.data.justificativa) {

      if (this.validarRegras()) {
        this.dialogRef.close(this.data);
      }

    } else {
      alert('Informe os campos: Nome do Cenário, Data Inicial, Data Final e Justificativa!');
    }

  }

  validarRegras() {
    let retorno = true;
    if (this.data.regras && this.data.regras.length > 0) {
      this.data.regras.forEach(it => {
        if (!it.nomeRegra || !it.tipoRegra || !it.regraDe || !it.regraPara) {
          alert('Informe os dados da regra!');
          retorno = false;
        }
      });
    } else {
      alert('Informe pelo menos uma regra crítica para ser aplicada ao cenário!');
      retorno = false;
    }

    return retorno;
  }

  excluirRegra(regra) {
    const index = this.data.regras.indexOf(regra);
    this.data.regras.splice(index, 1);
  }

  incluirRegra() {
    const regra = new RegraCritica();
    regra.idCenario = this.data.idCenario;
    this.data.regras.push(regra);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
