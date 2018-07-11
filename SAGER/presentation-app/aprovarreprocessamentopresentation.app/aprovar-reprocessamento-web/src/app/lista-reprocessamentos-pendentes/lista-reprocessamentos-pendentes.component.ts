import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../../model/evento';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-lista-reprocessamentos-pendentes',
  templateUrl: './lista-reprocessamentos-pendentes.component.html',
  styleUrls: ['./lista-reprocessamentos-pendentes.component.css']
})
export class ListaReprocessamentosPendentesComponent implements OnInit {

  public eventos: Evento[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.listarEventosPendentes();
  }

  listarEventosPendentes() {
    this.http.get(environment.urlServerPresentation + environment.listarReprocessamentosPendentes).subscribe(data => {
      this.eventos = <Evento[]>data;
    });
  }

  aprovar(evento: Evento) {
    this.http.post(environment.urlServerPresentation + environment.aprovarReprocessamentoPendente, {evento}).toPromise().then(result => {
      alert('Reprocessamento aprovado com sucesso!');
      this.listarEventosPendentes();
    });
  }

}
