import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComparacionComponent } from './components/comparacion/comparacion.component';
import { FormsModule } from "@angular/forms";
import { ResultadoComponent } from './components/resultado/resultado.component';

@NgModule({
  declarations: [
    AppComponent,
    ComparacionComponent,
    ResultadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
