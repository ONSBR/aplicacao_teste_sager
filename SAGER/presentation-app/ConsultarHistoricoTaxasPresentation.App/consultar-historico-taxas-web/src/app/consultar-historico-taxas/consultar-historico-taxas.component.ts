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

  constructor(private http: HttpClient) {
    this.filtroConsulta = new FiltroConsulta(null, null, null, null);
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
    const body = { 'idFechamentoMensal': this.execucaoSelecionada.idFechamento };
    this.http.post(environment.urlServerPresentation + environment.pesquisarFechamentoMensalPorId, body).subscribe(fechamentoMensal => {
      this.fechamentoMensal = fechamentoMensal;
    });
    this.http.post(environment.urlServerPresentation + environment.pesquisarTaxaPorId, body).subscribe(taxas => {
      this.taxas = taxas;
    });
  }

  exportarMemoriaProcessamento(taxa) {
    const memoriaDeProcessamento = {
      'Taxa equivalente de indisponibilidade forçada apurada - Teifa':
        ['usina']
    };
    this.exportAsExcelFile([memoriaDeProcessamento], 'MemoriaDeProcessamento');
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet(json);
    const ws_name = 'Memória de processo';
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    saveAs(new Blob([this.getBuffer(wbout)], { type: 'application/octet-stream' }), 'exported.xlsx');
  }

  getBuffer(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    };
    return buf;
  }

}
