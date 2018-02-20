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
  public numeroTarefa: string;
  public tarefas: Array<TarefaRetificacao>;
  public usinas: Array<Usina>;

  constructor(private http: HttpClient) {
    this.filtroEvento = new FiltroEvento();
  }

  ngOnInit() {
    this.listarUsinas();
    this.tarefas = [{ 'id': '1', 'nome': 'teste' }, { 'id': '2', 'nome': 'teste 2' }, { 'id': '3', 'nome': 'teste 3' }];
  }

  listarUsinas() {
    console.log(environment.urlServerPresentation + environment.listarUsinas);
    this.http.get(environment.urlServerPresentation + environment.listarUsinas).subscribe(data => {
      this.usinas = <Usina[]>data;
    });
  }

}
