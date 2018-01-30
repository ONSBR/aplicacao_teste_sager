import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroConsulta } from '../filtro/FiltroConsulta.model';
import { TipoTaxa } from '../model/tipotaxa';
import { Usina } from '../model/usina';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consultar-historico-taxas',
  templateUrl: './consultar-historico-taxas.component.html',
  styleUrls: ['./consultar-historico-taxas.component.css']
})
export class ConsultarHistoricoTaxasComponent implements OnInit {

  public filtroConsulta;
  public tiposTaxa;
  public usinas: Array<Usina>;
  public historicoTaxas: Array<Object>;
  public cenarioSelecionado;

  constructor(private http: HttpClient) {
    this.filtroConsulta = new FiltroConsulta(null, null, null, null);
  }

  ngOnInit() {
    this.listarUsinas();
    this.cenarioSelecionado = { 'nome': '' };
    this.tiposTaxa = Object.keys(TipoTaxa);
    this.preencherFiltroInicial();
  }

  pesquisar() {
    const url = environment.urlServerPresentation + environment.pesquisarHistorico;
    const body = {'filtroConsulta': this.filtroConsulta};
    this.http.post(url, body).subscribe(data => {
      this.historicoTaxas = [{ 'id': 1, 'nome': 'Principal vigente' },
      { 'id': 2, 'nome': 'Cenário 1' }, { 'id': 3, 'nome': 'Cenário 2' }];
    });
  }

  listarUsinas() {
    this.http.get(environment.urlServerPresentation + environment.listarUsinas).subscribe(data => {
      this.usinas = <Usina[]>data;
    });
  }

  preencherFiltroInicial() {
    this.http.get(environment.urlServerPresentation + environment.consultaFiltroInicial).subscribe(data => {
      this.filtroConsulta = <FiltroConsulta>data;
    });
  }

  expandirCenario(cenario) {
    this.cenarioSelecionado = cenario;
  }

}
