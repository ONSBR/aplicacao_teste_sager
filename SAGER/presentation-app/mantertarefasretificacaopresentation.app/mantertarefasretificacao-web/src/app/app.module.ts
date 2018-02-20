import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MantertarefaComponent } from './mantertarefa/mantertarefa.component';


@NgModule({
  declarations: [
    AppComponent,
    MantertarefaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
