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

  maxViewReproduction = 10;
  maxViewBusinessEvents = 20;

  filterEvts = { horas: 1, qtd: 20};

  public filtroConsulta;
  public tiposTaxa;
  public usinas: Array<Usina>;
  public execucoes;
  public execucaoSelecionada;
  public taxas;
  public fechamentoMensal;
  public environment;
  public meses;

  public fechamentoParaCalculo = { 'mes': '', 'ano': '', 'mesIntervalo': '', 'anoIntervalo': '' };

  public reproducoes: Reproducao[] = [];
  public businessEvents = [];

  constructor(private http: HttpClient) {
    this.filtroConsulta = new FiltroConsulta(null, null, null, null, null, null);
    this.environment = environment;
  }

  get urlServerPresentation() {
    var url = window.location.href;
    if (!url.endsWith("/")) {
      url += "/";
    }
    return url;
  }

  ngOnInit() {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.listarUsinas();
    this.execucaoSelecionada = { 'protocolo': '' };
    this.fechamentoMensal = { 'mes': '', 'ano': '', 'mesIntervalo': '', 'anoIntervalo': '' };
    this.listarTipoTaxa();
    var self = this;
    this.pollingConsultaReproducao(self);
    this.pollingConsultaBusinessEvents(self);
  }

  pollingConsultaBusinessEvents(self) {
    var listarBusinessEvents = this.listarBusinessEvents;
    listarBusinessEvents(self);
    setInterval(function () { listarBusinessEvents(self) }, 10000);
  }

  pollingConsultaReproducao(self) {
    var listarReproducoes = this.listarReproducoes;
    listarReproducoes(self);
    setInterval(function () { listarReproducoes(self) }, 10000);
  }

  descBusinessEvent(businessEvent) {
    
    var retorno = { data: new Date(businessEvent.timestamp), msg: '' };

    if (businessEvent.name == "calculate.tax.request") {
      retorno.msg = "Solicitação de cálculo de " + 
        "taxas do fechamento (" + businessEvent.payload.mesFechamento + "/" + 
        businessEvent.payload.anoFechamento + ") recebida.";
    } 
    else if (businessEvent.name == "calculate.tax.by.usina" ) {
      retorno.msg = "Solicitação de cálculo de " + 
        "taxas " + (businessEvent.payload.acumulada ? "acumuladas" :"") + " da usina (" + 
        businessEvent.payload.idUsina + ") realizada.";
    }
    else if (businessEvent.name == "calculate.tax.done" ) {
      retorno.msg = "Solicitado cálculo de taxas do fechamento.";
    }
    else if (businessEvent.name == "calculate.tax.by.usina.done" ) {
      retorno.msg = "Cálculo de taxas da usina realizado com sucesso.";
    }
    else if (businessEvent.name == "calculate.tax.error" ) {
      retorno.msg = "Error na solicitação de cálculo de " + 
        "taxas, error: " + businessEvent.payload.message;
    }
    else if (businessEvent.name == "calculate.tax.by.usina.error" ) {
      retorno.msg = "Error na solicitação de cálculo de " + 
        "taxas da usina, error: " + businessEvent.payload.message;
    }
    
    return retorno;
  
  }

  pesquisar() {
    if (!this.filtroConsulta.usina || !this.filtroConsulta.mesInicial || !this.filtroConsulta.anoInicial 
        || !this.filtroConsulta.mesFinal || !this.filtroConsulta.anoFinal || !this.filtroConsulta.tipoTaxa) {
      alert("Informe todos os filtros da pesquisa!");
      return;
    }
    const url = this.urlServerPresentation + environment.pesquisarHistorico;
    const body = { 'filtroConsulta': this.filtroConsulta };
    this.http.post(url, body).subscribe(data => {
      this.execucoes = data;
      this.taxas = [];
      this.fechamentoMensal = {};
    });
  }

  isLeapYear(year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
  };

  getDaysInMonth(year, month) {
      return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  };

  private addMonths(data: Date, value) {
    var n = data.getDate();
    data.setDate(1);
    data.setMonth(data.getMonth() + value);
    data.setDate(Math.min(n, this.getDaysInMonth(data.getFullYear(), data.getMonth())));
    return data;
  }

  gerarMesAnoIntervalo(mes, ano, mesIntervalo, anoIntervalo) {
    
    var mesAno = new Date(ano, mes-1, 1);
    var mesAnoIntervalo = null;
    
    if (mesIntervalo > 0 && mesIntervalo <= 12 && anoIntervalo >= 2000) {
      mesAnoIntervalo = new Date(anoIntervalo, mesIntervalo-1, 1);
    }

    var retorno = [];
    do {
      retorno.push(new Date(mesAno));
      mesAno = this.addMonths(mesAno, 1);
    } while(mesAnoIntervalo && mesAno.getTime() <= mesAnoIntervalo.getTime());
    
    return retorno;
  }

  validarMesAnoCalculoTaxas(mes, ano, contemMesIntervalo, contemAnoIntervalo, mesIntervalo, anoIntervalo) {
  
    var valido = true;
    if (mes <= 0 || mes > 12 || ano < 2000) {
      valido = false;
    }
    else if (contemMesIntervalo && contemAnoIntervalo && (mesIntervalo <= 0 || mesIntervalo > 12 || anoIntervalo < 2000)) {
      valido = false;
    }

    return valido;
  }

  converterInt(valor) {
    var retorno = 0;
    try {
      retorno = parseInt(valor);
    } catch (error) { }
    return retorno;
  }

  enviarSolicitacaoCalculoTaxa(mes, ano) {
    const url = this.urlServerPresentation + environment.calcularTaxas;
    const body = { presentationId: this.presentationId, mesFechamento: mes, anoFechamento: ano };

    return this.http.post(url, body).toPromise();
  }

  calcularTaxas() {

    var mesFechamento = this.converterInt(this.fechamentoParaCalculo.mes);
    var anoFechamento = this.converterInt(this.fechamentoParaCalculo.ano);

    var mesIntervalo = this.converterInt(this.fechamentoParaCalculo.mesIntervalo);
    var anoIntervalo = this.converterInt(this.fechamentoParaCalculo.anoIntervalo);

    if (this.validarMesAnoCalculoTaxas(
          mesFechamento, anoFechamento, this.fechamentoParaCalculo.mesIntervalo, 
          this.fechamentoParaCalculo.anoIntervalo, mesIntervalo, anoIntervalo)) {

      var intervaloCalculo = this.gerarMesAnoIntervalo(mesFechamento, anoFechamento, mesIntervalo, anoIntervalo);

      var solicitacoesCalculo = [];
      var listaMesAno = "";
      intervaloCalculo.forEach(it => {
        
        var mes = it.getMonth() + 1;
        var ano = it.getFullYear();

        if (listaMesAno) {
          listaMesAno += ", ";
        }
        listaMesAno +=  mes + "/" + ano;
        
        solicitacoesCalculo.push(this.enviarSolicitacaoCalculoTaxa(mes, ano));
      });

      Promise.all(solicitacoesCalculo).then(result => {
        var msg = 'Solicitação de cálculo(s) de taxa(s) enviado(s) com sucesso. Fechamento(s): ' + listaMesAno;
        console.log(msg);
        alert(msg);
      });
    }
    else {
      alert("Inválido mês ou ano informados para execução de cálculo.");
    }

  }

  linkMemoriaTaxa(taxa) {
    return this.urlServerPresentation + environment.downloadMemoriaProcessamentoXlsx +
      '?idinstance=' + taxa._metadata.instance_id + '&idtaxa=' + taxa.id;
  }

  linkResultadoReproducao(reproducao) {
    return this.urlServerPresentation + environment.downloadComparacaoReproducaoXlsx +
      '?instance_id=' + reproducao.instanceId +
      '&original_id=' + reproducao.originalId +
      '&taxa_id=' + reproducao.externalId;
  }

  reproduzirCalculoTaxa(taxa) {
    this.http.post(
      this.urlServerPresentation + environment.reproduzirCalculoTaxa,
      { instance_id: taxa._metadata.instance_id, presentationId: this.presentationId, taxa_id: taxa.id }
    ).subscribe(data => {
      alert('Solicitação de reprodução do cálculo da taxa realizada com sucesso.');
    });
  }

  printIdentify(ident) {
    return ident && ident.length > 20? ident.substring(0,20)+"...": ident;
  }

  listarReproducoes(self) {

    self.http.get(self.urlServerPresentation + environment.listarReproducoes).subscribe(data => {
      
      var reprods = <Reproducao[]>data;
      
      var newlist: Reproducao[] = [];
      for (var i = reprods.length - 1; i >= reprods.length - self.maxViewReproduction && i >= 0; i--) {
        newlist.push(reprods[i]);
      }
      
      self.reproducoes = newlist;
    });
  }

  listarBusinessEvents(self) {

    var url = self.urlServerPresentation + environment.listarBusinessEvents;
    url += "?horas=" + self.filterEvts.horas;

    var qtd = self.converterInt(self.filterEvts.qtd);
    if (qtd <= 0) {
      qtd = self.maxViewBusinessEvents;
    }

    self.http.get(url).subscribe(data => {
      
      var newlist = [];
      if (data && data.length > 0) {
        for (var i = data.length - 1; i >= data.length - qtd && i >= 0; i--) {
          newlist.push( self.descBusinessEvent(data[i]));
        }
      }
      
      self.businessEvents = newlist;
    });
  }

  listarUsinas() {
    this.http.get(this.urlServerPresentation + environment.listarUsinas).subscribe(data => {
      this.usinas = <Usina[]>data;
    });
  }

  showValor(val, round) {
    if (!val) return '0';
    if (!round) round = 2;
    val = parseFloat(val.toFixed(round));
    return (""+val).replace('.', ',');
  }
  
  listarTipoTaxa() {
    this.http.get(this.urlServerPresentation + environment.listarTipoTaxa).subscribe(data => {
      this.tiposTaxa = data;
    });
  }

  expandirExecucao(execucaoSelecionada) {
    this.execucaoSelecionada = execucaoSelecionada;
    const body = { 'idFechamentoMensal': this.execucaoSelecionada.idFechamento, 'filtroConsulta': this.filtroConsulta };
    this.http.post(
      this.urlServerPresentation + environment.pesquisarFechamentoMensalPorId, body).
      toPromise().then(fechamentoMensal => {
        this.fechamentoMensal = fechamentoMensal[0];
      });
    this.http.post(this.urlServerPresentation + environment.pesquisarTaxaPorId, body).
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
    return this.urlServerPresentation + environment.downloadMemoriaProcessamentoXlsx +
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
