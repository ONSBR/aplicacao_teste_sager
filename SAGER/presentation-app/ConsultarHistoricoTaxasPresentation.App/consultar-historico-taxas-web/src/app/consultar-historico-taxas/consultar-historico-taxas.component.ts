import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroConsulta } from '../filtro/FiltroConsulta.model';
import { Usina } from '../model/usina';
import { environment } from '../../environments/environment';
import * as FileSaver from 'file-saver';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';

const EXCEL_TYPE = 'charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-consultar-historico-taxas',
  templateUrl: './consultar-historico-taxas.component.html',
  styleUrls: ['./consultar-historico-taxas.component.css']
})
export class ConsultarHistoricoTaxasComponent implements OnInit {

  public filtroConsulta;
  public tiposTaxa;
  public usinas: Array<Usina>;
  public execucoes;
  public execucaoSelecionada;
  public taxas;
  public fechamentoMensal;
  public environment;

  constructor(private http: HttpClient) {
    this.filtroConsulta = new FiltroConsulta(null, null, null, null);
    this.environment = environment;
  }

  ngOnInit() {
    this.listarUsinas();
    this.execucaoSelecionada = { 'protocolo': '' };
    this.fechamentoMensal = { 'mes': '', 'ano': '' };
    this.listarTipoTaxa();
  }

  pesquisar() {
    const url = environment.urlServerPresentation + environment.pesquisarHistorico;
    const body = { 'filtroConsulta': this.filtroConsulta };
    this.http.post(url, body).subscribe(data => {
      this.execucoes = data;
      this.taxas = [];
      this.fechamentoMensal = {};
    });
  }

  listarUsinas() {
    this.http.get(environment.urlServerPresentation + environment.listarUsinas).subscribe(data => {
      this.usinas = <Usina[]>data;
    });
  }

  listarTipoTaxa() {
    this.http.get(environment.urlServerPresentation + environment.listarTipoTaxa).subscribe(data => {
      this.tiposTaxa = data;
    });
  }

  expandirExecucao(execucaoSelecionada) {
    this.execucaoSelecionada = execucaoSelecionada;
    const body = { 'idFechamentoMensal': this.execucaoSelecionada.idFechamento, 'filtroConsulta': this.filtroConsulta };
    this.http.post(
      environment.urlServerPresentation + environment.pesquisarFechamentoMensalPorId, body).
      toPromise().then(fechamentoMensal => {
        this.fechamentoMensal = fechamentoMensal[0];
      });
    this.http.post(environment.urlServerPresentation + environment.pesquisarTaxaPorId, body).
      toPromise().then(taxas => {
        this.taxas = taxas;
      });
  }

  exportarMemoriaProcessamento(taxa) {
    this.http.get(this.getUrlDownloadMemoriaDeProcessamento(taxa)).toPromise().then(request => {
        console.log('Export com sucesso');
      });
  }

  getUrlDownloadMemoriaDeProcessamento(taxa) {
    return environment.urlServerPresentation + environment.downloadMemoriaProcessamentoXlsx +
      '?idinstance=' + taxa._metadata.instance_id + '&idtaxa=' + taxa.id;
  }

}
