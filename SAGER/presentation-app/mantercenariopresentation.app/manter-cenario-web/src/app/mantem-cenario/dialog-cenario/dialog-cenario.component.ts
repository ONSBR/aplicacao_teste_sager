import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Cenario, TipoRegra, RegraCritica, UnidadeGeradora, Usina } from '../../model/model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dialog-cenario',
  templateUrl: './dialog-cenario.component.html',
  styleUrls: ['./dialog-cenario.component.css']
})
export class DialogCenarioComponent implements OnInit {

  tiposRegras: TipoRegra[] = [TipoRegra.PotenciaDisponivel, TipoRegra.Franquia, TipoRegra.OrigemEvento];

  uges: UnidadeGeradora[] = [];

  usinas: Usina[] = [];

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
    this.uges.forEach(it => {
      if (it.idUge == idUge) {
        return it;
      }
    });
    return {};
  }

  get titulo() {
    return this.data.id ? "Alterar" : "Incluir";
  }

  listarUsinas() {
    this.http.get(environment.urlServerPresentation + environment.listarUsinas).subscribe(data => {
      this.usinas = <Usina[]>data;
    });
  }

  listarUges() {
    
    if (this.data && this.data.idUsina) {

      var url = environment.urlServerPresentation + environment.listarUnidadesGeradoras +
       '&idUsina=' + this.data.idUsina;
      
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

    this.data.regras.push(new RegraCritica());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
