import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart.component';
import { StoreService } from './store.service';
import { ConfirmComponent } from './confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'confirm',
        component: ConfirmComponent
      }
    ])
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
