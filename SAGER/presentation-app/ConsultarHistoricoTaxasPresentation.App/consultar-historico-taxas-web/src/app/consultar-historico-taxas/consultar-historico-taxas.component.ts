import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroConsulta } from '../filtro/FiltroConsulta.model';
import { Usina } from '../model/usina';
import { environment } from '../../environments/environment';
import * as FileSaver from 'file-saver';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';
import { resolve } from 'path';

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
    const body = { 'idFechamentoMensal': this.execucaoSelecionada.idFechamento };
    this.http.post(
      environment.urlServerPresentation + environment.pesquisarFechamentoMensalPorId, body).
      toPromise().then(fechamentoMensal => {
        this.fechamentoMensal = fechamentoMensal[0];
        resolve();
      });
    this.http.post(environment.urlServerPresentation + environment.pesquisarTaxaPorId, body).
      toPromise().then(taxas => {
        this.taxas = taxas;
        resolve();
      });
  }

  exportarMemoriaProcessamento(taxa) {
    const body = { 'id': taxa._metadata.instance_id };
    this.http.post(environment.urlServerPresentation +
      environment.getMemoriaDeProcessamento, body).toPromise().then(request => {
        this.exportAsExcelFile(this.getMemoriaDeProcessamento(request), 'MemoriaDeProcessamento');
        resolve();
      });
  }

  getMemoriaDeProcessamento(request) {
    const contexto = request.contexto;
    const memoriaDeProcessamento = [
      ['Taxa equivalente de indisponibilidade forçada apurada - Teifa'],
      ['Usina', contexto.payload.usina],
      ['Número de UG', contexto.payload.numeroUG],
      ['Teifa acumulada', contexto.payload.teifaAcumulada],
      ['Cenário', contexto.payload.cenario],
      ['Teifa', contexto.payload.teifa, '', '', 'Parâmetros'],
      ['Ano Referência', 'Mês', 'Teifa', '', 'UGE_ID', 'Mês', 'P',
        'HDF', 'HEDF', 'HS', 'HDCE', 'HRD', 'HDF+HEDF', 'HDF+HEDF+HS+HDCE+HRD', 'P x (HDF+HEDF)', 'P x (HDF+HEDF+HS+HDCE+HRD)']
    ];

    this.preencherFechamentos(contexto, memoriaDeProcessamento);
    this.preencherParametros(contexto, memoriaDeProcessamento);
    return memoriaDeProcessamento;
  }

  preencherFechamentos(contexto, memoriaDeProcessamento) {
    for (let i = 0; i < contexto.payload.fechamentosMensais.length; i++) {
      memoriaDeProcessamento[7 + i] = [];
      memoriaDeProcessamento[7 + i][0] = contexto.payload.fechamentosMensais[i].ano;
      memoriaDeProcessamento[7 + i][1] = contexto.payload.fechamentosMensais[i].mes;
      memoriaDeProcessamento[7 + i][2] = contexto.payload.fechamentosMensais[i].valor;
    }
  }

  preencherParametros(contexto, memoriaDeProcessamento) {
    for (let i = 0; i < contexto.payload.parametros.length; i++) {
      memoriaDeProcessamento[7 + i][4] = contexto.payload.parametros[i].UGE_ID;
      memoriaDeProcessamento[7 + i][5] = contexto.payload.parametros[i].mes;
    }
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.aoa_to_sheet(json);
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
    }
    return buf;
  }

}
