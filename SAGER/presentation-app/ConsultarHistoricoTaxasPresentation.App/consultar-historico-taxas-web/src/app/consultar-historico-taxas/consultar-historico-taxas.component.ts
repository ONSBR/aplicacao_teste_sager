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
  public historicoTaxas: Array<Object>;
  public cenarioSelecionado;

  constructor(private http: HttpClient) {
    this.listarUsinas();
    this.cenarioSelecionado = {'nome': ''};
  }

  ngOnInit() {
    this.tiposTaxa = Object.keys(TipoTaxa);
  }

  pesquisar() {
    this.historicoTaxas = [{'id': 1, 'nome': 'Principal vigente'},
      {'id': 2, 'nome': 'Cenário 1'}, {'id': 3, 'nome': 'Cenário 2'}];
  }

  listarUsinas() {
    this.http.get(environment.urlServerPresentation).subscribe(data => {
      this.usinas = <Usina[]> data;
    });
  }

  expandirCenario(cenario) {
    this.cenarioSelecionado = cenario;
  }

}
