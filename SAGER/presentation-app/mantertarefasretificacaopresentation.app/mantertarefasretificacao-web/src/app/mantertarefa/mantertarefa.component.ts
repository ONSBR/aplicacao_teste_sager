import { Component, OnInit } from '@angular/core';
import { FiltroEvento } from '../model/FiltroEvento';
import { Usina } from '../model/Usina';
import { TarefaRetificacao } from '../model/TarefaRetificacao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseContentType } from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';
import { RequestOptions } from '@angular/http/src/base_request_options';

@Component({
  selector: 'app-mantertarefa',
  templateUrl: './mantertarefa.component.html',
  styleUrls: ['./mantertarefa.component.css']
})
export class MantertarefaComponent implements OnInit {

  public filtroEvento: FiltroEvento;
  public numeroTarefa: string;
  public tarefas: Array<TarefaRetificacao>;
  public usinas: Array<Usina>;

  constructor(private http: HttpClient) {
    this.filtroEvento = new FiltroEvento();
  }

  ngOnInit() {
    this.listarUsinas();
  }

  listarUsinas() {
    this.http.get(environment.urlServerPresentation + environment.listarUsinas).subscribe(data => {
      this.usinas = <Usina[]>data;
    });
  }

  listarTarefas() {
    this.http.get(environment.urlServerPresentation + environment.listarTarefas).subscribe(data => {
      this.tarefas = <TarefaRetificacao[]>data;
    });
  }

  pesquisarEventos() {
    const url = this.getUrlPesquisarEventos();
    window.location.href = url;
  }

  getUrlPesquisarEventos() {
    return `${environment.urlServerPresentation}${environment.pesquisarEventos}?idUsina=${this.filtroEvento.usina.idUsina}&dataInicial=${this.filtroEvento.dataInicial}&dataFinal=${this.filtroEvento.dataFinal}`;
  }

}
