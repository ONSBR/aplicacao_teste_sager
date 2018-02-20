import { Component, OnInit } from '@angular/core';
import { FiltroEvento } from '../model/FiltroEvento';
import { TarefaRetificacao } from '../model/TarefaRetificacao';

@Component({
  selector: 'app-mantertarefa',
  templateUrl: './mantertarefa.component.html',
  styleUrls: ['./mantertarefa.component.css']
})
export class MantertarefaComponent implements OnInit {

  public filtroEvento: FiltroEvento;
  public numeroTarefa: string;
  public tarefas: Array<TarefaRetificacao>;

  constructor() {
    this.filtroEvento = new FiltroEvento();
  }

  ngOnInit() {
    this.tarefas = [{ 'id': '1', 'nome': 'teste' }, { 'id': '2', 'nome': 'teste 2' }, { 'id': '3', 'nome': 'teste 3' }];
  }

}
