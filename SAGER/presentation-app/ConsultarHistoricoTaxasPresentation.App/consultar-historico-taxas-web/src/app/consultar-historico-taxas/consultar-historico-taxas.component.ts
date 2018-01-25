import { Component, OnInit } from '@angular/core';
import { FiltroTaxa } from '../model/filtrotaxa';

@Component({
  selector: 'app-consultar-historico-taxas',
  templateUrl: './consultar-historico-taxas.component.html',
  styleUrls: ['./consultar-historico-taxas.component.css']
})
export class ConsultarHistoricoTaxasComponent implements OnInit {

  filtroTaxa: FiltroTaxa;

  constructor() { }

  ngOnInit() {
  }

}
