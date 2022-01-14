import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparacionComponent } from './components/comparacion/comparacion.component';
import { ResultadoComponent } from './components/resultado/resultado.component';

const routes: Routes = [
  {path: '', component: ComparacionComponent},
  {path: 'resultado', component: ResultadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
