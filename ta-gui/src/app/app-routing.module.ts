import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcompedidosComponent } from './acompedidos/acompedidos.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'acompedidos', component: AcompedidosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
