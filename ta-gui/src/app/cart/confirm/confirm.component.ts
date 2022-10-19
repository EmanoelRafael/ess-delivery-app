import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import { Cart } from '../../../../../common/cart';
import { Client } from '../../../../../common/client';
import { Order } from '../../../../../common/order';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  cart: Cart  = new Cart();
  client: Client = new Client("","","","","");
  orderMade: boolean = false;
  orderConfirmed: boolean = false;
  order: Order = new Order(this.client.cart, "Credit Card", "A gosto de Deus")


  public makeOrder(): boolean{
    this.orderMade = !this.orderMade;
    console.log(!this.orderMade);

    this.orderConfirmed = false;
    this.order.setCode("AOPA95X");
    return this.orderMade;
  }

  ngOnInit(): void {
    this.storeService.getClient(0).subscribe(
      res=> {
        this.client = res;
        this.cart = this.client.cart;
        console.log(res)
      }
    )
  }

}
