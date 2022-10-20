import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import { Address } from '../../../../../common/address';
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

  cart: Cart  = new Cart(new Address());
  client: Client = new Client("","","","","");
  orderMade: boolean = false;
  orderConfirmed: boolean = false;
  orderCode: string = "XXXXXX";


  public makeOrder(): void{
    this.orderMade = true;
    this.storeService.makeOrder().subscribe(
      res=>{
        this.orderCode = res;
        if (this.orderCode != "fail") {
          this.orderConfirmed = true
        }
      } 
    )
    
    /**this.orderMade = !this.orderMade;
    console.log(!this.orderMade);

    this.orderConfirmed = false;
    return this.orderMade;*/
  }

  ngOnInit(): void {
    this.storeService.getClient().subscribe(
      res=> {
        this.client = res;
        this.cart = this.client.cart;
        console.log(res)
      }
    )
  }

}
