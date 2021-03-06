import { Component, OnInit } from '@angular/core';
import { FiltroEvento } from '../model/FiltroEvento';
import { Usina } from '../model/Usina';
import { TarefaRetificacao } from '../model/TarefaRetificacao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-mantertarefa',
  templateUrl: './mantertarefa.component.html',
  styleUrls: ['./mantertarefa.component.css']
})
export class MantertarefaComponent implements OnInit {

  public filtroEvento: FiltroEvento;
  public nomeTarefa: string;
  public tarefas: Array<TarefaRetificacao>;
  public usinas: Array<Usina>;
  public camposObrigatoriosPesquisaEventos: Array<string>;
  public camposObrigatoriosTarefa: Array<string>;
  public mensagemSucesso: string;
  public mensagemErro: string;

  get urlServerPresentation() {
    var url = window.location.href;
    if (!url.endsWith("/")) {
      url += "/";
    }
    return url;
  }

  constructor(private http: HttpClient) {
    this.filtroEvento = new FiltroEvento();
    this.filtroEvento.usinas = [];
    this.camposObrigatoriosPesquisaEventos = [];
    this.camposObrigatoriosTarefa = [];
  }

  ngOnInit() {
    this.listarUsinas();
    this.listarTarefas();
  }

  listarUsinas() {
    this.http.get(this.urlServerPresentation + environment.listarUsinas).subscribe(data => {
      this.usinas = <Usina[]>data;
    });
  }

  listarTarefas() {
    this.nomeTarefa = '';
    this.http.get(this.urlServerPresentation + environment.listarTarefas).subscribe(data => {
      this.tarefas = <TarefaRetificacao[]>data;
    });
  }

  inserirTarefa() {
    this.limparMensagens();
    if (this.validarTarefa()) {
      const body = { 'nomeTarefa': this.nomeTarefa };
      this.http.post(this.urlServerPresentation + environment.inserirTarefa, body).subscribe(
        data => {
          this.mensagemSucesso = 'Tarefa inserida com sucesso!';
          this.listarTarefas();
        }, error => {
          console.log(`Erro ao inserir tarefa: ${error}`);
        }
      );
    }
  }

  limparMensagens() {
    this.camposObrigatoriosPesquisaEventos = [];
    this.camposObrigatoriosTarefa = [];
    this.mensagemSucesso = undefined;
    this.mensagemErro = undefined;
  }

  validarTarefa() {
    if (!this.nomeTarefa) {
      this.camposObrigatoriosTarefa.push('Nome da tarefa');
    }

    return !(this.camposObrigatoriosTarefa.length > 0);
  }

  pesquisarEventos() {
    this.limparMensagens();
    if (this.validarFiltroPesquisaEventos()) {
      const url = this.getUrlPesquisarEventos();
      console.log('url' + url);
      window.location.href = url;
    }
  }

  validarFiltroPesquisaEventos() {
    if (this.filtroEvento.usinas.length <= 0) {
      this.camposObrigatoriosPesquisaEventos.push('Usinas');
    }
    if (!this.filtroEvento.dataInicial) {
      this.camposObrigatoriosPesquisaEventos.push('Data Inicial');
    }
    if (!this.filtroEvento.dataFinal) {
      this.camposObrigatoriosPesquisaEventos.push('Data Final');
    }

    return !(this.camposObrigatoriosPesquisaEventos.length > 0);
  }

  uploadPlanilha(tarefa: TarefaRetificacao, files: FileList) {
    this.limparMensagens();
    tarefa.planilha = files.item(0);
    const urlUploadPlanilha = this.urlServerPresentation + environment.uploadPlanilha;
    const formData: FormData = new FormData();
    formData.append('planilha', tarefa.planilha, tarefa.planilha.name);
    formData.append('nomeTarefa', tarefa.nome);
    const headers = new HttpHeaders();
    this.http.post(urlUploadPlanilha, formData, { 'headers': headers }).subscribe(data => {
      console.log(data);
      this.mensagemSucesso = 'Upload executado com sucesso';
      this.listarTarefas();
    }, error => {
      console.log(`Erro ao realizar upload da planilha: ${error}`);
    });
  }

  downloadPlanilha(tarefa: TarefaRetificacao) {
    const url = this.getUrlDownloadPlanilha(tarefa.nome);
    window.location.href = url;
  }

  getUrlDownloadPlanilha(nomeTarefa) {
    return `${this.urlServerPresentation}${environment.downloadplanilha}?nomeTarefa=${nomeTarefa}`;
  }

  getUrlPesquisarEventos() {
    return `${this.urlServerPresentation}${environment.pesquisarEventos}` +
      `?idsUsinas=${this.filtroEvento.usinas.join(';')}&dataInicial=${this.filtroEvento.dataInicial}` +
      `&dataFinal=${this.filtroEvento.dataFinal}`;
  }

  updateCheckedOptions(event, usina) {
    if (event.target.checked) {
      this.filtroEvento.usinas.push(usina.idUsina);
    } else {
      const index = this.filtroEvento.usinas.indexOf(usina.idUsina);
      this.filtroEvento.usinas.splice(index, 1);
    }
  }

  excluir(tarefa) {
    this.limparMensagens();
    const body = { 'tarefa': tarefa };
    this.http.post(this.urlServerPresentation + environment.excluirTarefa, body).subscribe(
      data => {
        this.mensagemSucesso = 'Tarefa excluída com sucesso!';
        this.listarTarefas();
      }
    );
  }

  aplicar(tarefa) {
    this.limparMensagens();
    const url = this.urlServerPresentation + environment.aplicarTarefa;
    this.http.post(url, { 'tarefa': tarefa }).subscribe(
      data => {
        const response: any = data;
        if (response.meta.status === 'commited') {
          this.mensagemSucesso = 'Retificação aplicada com sucesso!';
        } else if (response.meta.status === 'reprocessing_request') {
          this.mensagemSucesso = `Retificação pendente de aprovação. O reprocessamento ${response.meta.reprocessing.id} foi gerado e precisa ser aprovado.`;
        }

        this.listarTarefas();
      }, error => {
        console.log(`Erro ao aplicar tarefa: ${error}`);
        this.mensagemErro = error.error;
      }
    );
  }

}
