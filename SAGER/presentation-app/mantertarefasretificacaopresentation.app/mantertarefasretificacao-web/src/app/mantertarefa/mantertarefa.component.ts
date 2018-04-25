import { Component, OnInit } from '@angular/core';
import { FiltroEvento } from '../model/FiltroEvento';
import { Usina } from '../model/Usina';
import { TarefaRetificacao } from '../model/TarefaRetificacao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseContentType } from '@angular/http';
import { RequestOptions } from '@angular/http/src/base_request_options';

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
  public mensagemUploadPlanilha: string;

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
    this.http.get(environment.urlServerPresentation + environment.listarUsinas).subscribe(data => {
      this.usinas = <Usina[]>data;
    });
  }

  listarTarefas() {
    this.nomeTarefa = "";
    this.http.get(environment.urlServerPresentation + environment.listarTarefas).subscribe(data => {
      this.tarefas = <TarefaRetificacao[]>data;
    });
  }

  inserirTarefa() {
    this.limparMensagens();
    if (this.validarTarefa()) {
      const body = { 'nomeTarefa': this.nomeTarefa };
      this.http.post(environment.urlServerPresentation + environment.inserirTarefa, body).subscribe(
        data => {
          this.mensagemUploadPlanilha = 'Tarefa inserida com sucesso!';
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
    this.mensagemUploadPlanilha = undefined;
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
    const urlUploadPlanilha = environment.urlServerPresentation + environment.uploadPlanilha;
    const formData: FormData = new FormData();
    formData.append('planilha', tarefa.planilha, tarefa.planilha.name);
    formData.append('nomeTarefa', tarefa.nome);
    const headers = new HttpHeaders();
    this.http.post(urlUploadPlanilha, formData, { 'headers': headers }).subscribe(data => {
      console.log(data);
      this.mensagemUploadPlanilha = 'Upload executado com sucesso';
    }, error => {
      console.log(`Erro ao realizar upload da planilha: ${error}`);
    });
  }

  downloadPlanilha(tarefa: TarefaRetificacao) {
    const url = this.getUrlDownloadPlanilha(tarefa.nome);
    window.location.href = url;
  }

  getUrlDownloadPlanilha(nomeTarefa) {
    return `${environment.urlServerPresentation}${environment.downloadplanilha}?nomeTarefa=${nomeTarefa}`;
  }

  getUrlPesquisarEventos() {
    return `${environment.urlServerPresentation}${environment.pesquisarEventos}?idsUsinas=${this.filtroEvento.usinas.join(';')}&dataInicial=${this.filtroEvento.dataInicial}&dataFinal=${this.filtroEvento.dataFinal}`;
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
    this.http.post(environment.urlServerPresentation + environment.excluirTarefa, body).subscribe(
      data => {
        this.mensagemUploadPlanilha = 'Tarefa excluída com sucesso!';
        this.listarTarefas();
      }
    );
  }

  aplicar(tarefa) {
    this.limparMensagens();
    const url = environment.urlServerPresentation + environment.aplicarTarefa + '?nomeTarefa=' + tarefa.nome;
    this.http.get(url).subscribe(
      data => {
        this.mensagemUploadPlanilha = 'Retificação aplicada com sucesso!';
        this.listarTarefas();
      }
    );
  }

}
