import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcompedidosComponent } from './acompedidos/acompedidos.component';
import { HistoricoComponent } from './historico/historico.component';

const routes: Routes = [
  {
    path: 'acompedidos',
    component: AcompedidosComponent
  },
  {
    path: 'historico',
    component: HistoricoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }