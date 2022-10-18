import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcompedidosComponent } from './acompedidos/acompedidos.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
  {path: 'acompedidos', component: AcompedidosComponent},
  {path: 'cart', component: CartComponent},
  {path: 'confirm', component: ConfirmComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }