import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ConsultarHistoricoTaxasComponent } from './consultar-historico-taxas/consultar-historico-taxas.component';
import { DateFormatPipe } from './dateformatpipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ConsultarHistoricoTaxasComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
