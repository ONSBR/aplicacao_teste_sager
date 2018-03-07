import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FiltroConsulta } from '../filtro/FiltroConsulta.model';
import { Usina } from '../model/usina';
import { environment } from '../../environments/environment';
import { Reproducao } from '../model/reproducao';

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

  public reproducoes: Reproducao[] = [];

  constructor(private http: HttpClient) {
    this.filtroConsulta = new FiltroConsulta(null, null, null, null);
    this.environment = environment;
  }

  ngOnInit() {
    this.listarUsinas();
    this.execucaoSelecionada = { 'protocolo': '' };
    this.fechamentoMensal = { 'mes': '', 'ano': '' };
    this.listarTipoTaxa();
    var self = this;
    var listarReproducoes = this.listarReproducoes;
    listarReproducoes(self);
    setInterval(function () { listarReproducoes(self) }, 5000);
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

  linkMemoriaTaxa(taxa) {
    return environment.urlServerPresentation + environment.downloadMemoriaProcessamentoXlsx +
      '?idinstance=' + taxa._metadata.instance_id + '&idtaxa=' + taxa.id;
  }

  linkResultadoReproducao(reproducao) {
    return environment.urlServerPresentation + environment.downloadComparacaoReproducaoXlsx +
      '?instance_id=' + reproducao.instance_id +
      '&original_id=' + reproducao.original_id +
      '&taxa_id=' + reproducao.owner;
  }

  reproduzirCalculoTaxa(taxa) {
    this.http.post(
      environment.urlServerPresentation + environment.reproduzirCalculoTaxa,
      { instance_id: taxa._metadata.instance_id, presentationId: this.presentationId, taxa_id: taxa.id }
    ).subscribe(data => {
      alert('Solicitação de reprodução do cálculo da taxa realizada com sucesso.');
    });
  }

  listarReproducoes(self) {

    self.http.get(environment.urlServerPresentation + environment.listarReproducoes).subscribe(data => {
      
      var reprods = <Reproducao[]>data;
      
      var newlist: Reproducao[] = [];
      for (var i = reprods.length - 1; i >= 0; i--) {
        newlist.push(reprods[i]);
      }
      
      self.reproducoes = newlist;
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

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}