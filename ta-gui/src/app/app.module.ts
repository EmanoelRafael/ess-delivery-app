import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreService } from './store.service';
import { CartModule } from './cart/cart.module';
import { HistoricoModule } from "./historico/historico.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CartModule,
    HistoricoModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
