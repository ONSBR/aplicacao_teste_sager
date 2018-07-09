import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListaReprocessamentosPendentesComponent } from './lista-reprocessamentos-pendentes/lista-reprocessamentos-pendentes.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaReprocessamentosPendentesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
