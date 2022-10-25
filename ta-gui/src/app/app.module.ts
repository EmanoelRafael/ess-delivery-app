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
import { HomeModule } from './home/home.module';
import { ComponentsModule } from './components/header/components.module';
import { CatalogComponent } from './catalog/catalog.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HomeModule,
    CartModule,
    HistoricoModule,
    ComponentsModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
