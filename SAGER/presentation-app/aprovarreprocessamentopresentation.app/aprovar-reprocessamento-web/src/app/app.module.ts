import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListaReprocessamentosPendentesComponent } from './lista-reprocessamentos-pendentes/lista-reprocessamentos-pendentes.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaReprocessamentosPendentesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
