import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroConsulta } from '../filtro/FiltroConsulta.model';
import { TipoTaxa } from '../model/tipotaxa';
import { Usina } from '../model/usina';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-consultar-historico-taxas',
  templateUrl: './consultar-historico-taxas.component.html',
  styleUrls: ['./consultar-historico-taxas.component.css']
})
export class ConsultarHistoricoTaxasComponent implements OnInit {

  public filtroConsulta = new FiltroConsulta(null, null, null);
  public tiposTaxa;
  public usinas: Array<Usina>;

  constructor(private http: HttpClient) {
    this.listarUsinas();
  }

  ngOnInit() {
    this.tiposTaxa = Object.keys(TipoTaxa);
  }

  pesquisar() {
  }

  listarUsinas() {
    this.http.get(environment.urlServerPresentation).subscribe(data => {
      console.log('data' + data);
      this.usinas = <Usina[]> data;
    });
  }

}
