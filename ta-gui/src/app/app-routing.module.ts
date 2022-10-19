import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcompedidosComponent } from './acompedidos/acompedidos.component';

const routes: Routes = [
  {
    path: 'acompedidos', 
    component: AcompedidosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }