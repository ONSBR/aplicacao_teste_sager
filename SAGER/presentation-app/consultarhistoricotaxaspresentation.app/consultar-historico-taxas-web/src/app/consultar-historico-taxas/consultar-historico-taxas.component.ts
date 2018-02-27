import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
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

  private presentationId: string = Guid.newGuid();

  public filtroConsulta;
  public tiposTaxa;
  public usinas: Array<Usina>;
  public execucoes;
  public execucaoSelecionada;
  public taxas;
  public fechamentoMensal;
  public environment;

  public fechamentoParaCalculo = { 'mes': '', 'ano': '' };

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

  calcularTaxas() {

    var mesFechamento = 0;
    var anoFechamento = 0;
    try {
      mesFechamento = parseInt(this.fechamentoParaCalculo.mes);
    } catch (error) { }
    try {
      anoFechamento = parseInt(this.fechamentoParaCalculo.ano);
    } catch (error) { }

    if (mesFechamento > 0 && mesFechamento <= 12 && anoFechamento >= 2000) {

      const url = environment.urlServerPresentation + environment.calcularTaxas;
      const body = { presentationId: this.presentationId, mesFechamento: mesFechamento, anoFechamento: anoFechamento };
      
      this.http.post(url, body).toPromise().then(result => {
        var msg = 'Enviada solicitação de cálculo de taxas com sucesso';
        console.log(msg);
        alert(msg);
      });
    }
    else {
      alert("Inválido mês ou ano informados para execução de cálculo.");
    }

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

class Guid {
  static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  }
}