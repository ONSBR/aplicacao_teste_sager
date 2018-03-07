import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Cenario, TipoRegra, RegraCritica } from '../../model/model';

@Component({
  selector: 'app-dialog-cenario',
  templateUrl: './dialog-cenario.component.html',
  styleUrls: ['./dialog-cenario.component.css']
})
export class DialogCenarioComponent implements OnInit {

  tiposRegras: Array<TipoRegra> = [TipoRegra.PotenciaDisponivel];

  constructor(private dialogRef: MatDialogRef<DialogCenarioComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Cenario) { }

  ngOnInit() {

  }

  get titulo() {
    return this.data.id ? "Alterar" : "Incluir";
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
    }

    return retorno;
  }

  excluir(regra) {
    var index = this.data.regras.indexOf(regra);
    this.data.regras.splice(index,1);
  }

  incluir() {

    this.data.regras.push(new RegraCritica());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
