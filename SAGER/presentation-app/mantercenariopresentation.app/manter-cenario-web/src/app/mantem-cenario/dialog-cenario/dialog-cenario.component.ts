import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Cenario, TipoRegra, RegraCritica, UnidadeGeradora, Usina } from '../../model/model';
import { environment } from '../../../environments/environment';
import { ClassificacaoOrigem, EstadoOperativo, CondicaoOperativa } from '../constants';

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

  getOrigens(tipoRegra): string[]  {
    var retorno = [];
    if (tipoRegra == this.tiposRegras[2]) {
      retorno = this.origens_type;
    }
    else if (tipoRegra == this.tiposRegras[3]) {
      retorno = this.estados_type;
    }
    else if (tipoRegra == this.tiposRegras[4]) {
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
    @Inject(MAT_DIALOG_DATA) private data: Cenario, private http: HttpClient) { }

  ngOnInit() {
    this.listarUsinas();
    this.listarUges();
  }

  getUge(idUge) {
    var retorno = {};
    this.uges.forEach(it => {
      if (it.idUge == idUge) {
        retorno = it;
      }
    });
    return retorno;
  }

  get titulo() {
    return this.data.idCenario ? "Alterar" : "Incluir";
  }

  listarUsinas() {
    this.http.get(environment.urlServerPresentation + environment.listarUsinas).subscribe(data => {
      this.usinas = <Usina[]>data;
    });
  }

  listarUges() {
    
    if (this.data && this.data.idUsina) {

      var url = environment.urlServerPresentation + environment.listarUnidadesGeradoras +
       '?idUsina=' + this.data.idUsina;
      
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
    
    var retorno = true;
    
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
    var index = this.data.regras.indexOf(regra);
    this.data.regras.splice(index,1);
  }

  incluirRegra() {

    var regra = new RegraCritica()
    regra.idCenario = this.data.idCenario;
    this.data.regras.push(regra);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
