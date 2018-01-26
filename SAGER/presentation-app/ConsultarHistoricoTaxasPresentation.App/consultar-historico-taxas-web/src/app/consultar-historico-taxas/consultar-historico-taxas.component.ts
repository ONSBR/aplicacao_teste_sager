import { Component, OnInit } from '@angular/core';
import { FiltroConsulta } from '../filtro/FiltroConsulta.model';
import { TipoTaxa } from '../model/tipotaxa';
import { Usina } from '../model/usina';

@Component({
  selector: 'app-consultar-historico-taxas',
  templateUrl: './consultar-historico-taxas.component.html',
  styleUrls: ['./consultar-historico-taxas.component.css']
})
export class ConsultarHistoricoTaxasComponent implements OnInit {

  valor : string = '!';
  public filtroConsulta = new FiltroConsulta(null, null, null);
  public tiposTaxa;
  public resultadoDePesquisaDeUsinas: Array<Usina>;
  
  constructor() {
  }
  
  ngOnInit() {
    this.tiposTaxa = Object.keys(TipoTaxa)
    this.resultadoDePesquisaDeUsinas = [];
  }

  pesquisar() {

  }

}
