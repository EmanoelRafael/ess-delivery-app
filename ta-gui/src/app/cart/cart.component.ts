import { Component, OnInit} from '@angular/core'
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { Address } from '../../../../common/address';

import { Cart } from '../../../../common/cart';
import { Product } from '../../../../common/product';
import { StoreService } from './../store.service';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
    constructor(private storeService: StoreService) {};

    cart: Cart = new Cart(new Address());

    ngOnInit(): void {
      // this.cart.addProduct( new Product("Echo Dot", 300, "Echo Dot", "Echo Dot.jpg"), 1);
      // this.cart.addProduct( new Product("Fire TV", 300, "Fire TV", "Fire TV.jpg"), 2);

      this.storeService.getCart().subscribe (res => {
        this.cart.cleanCart();
        // console.log(res.products);

        res.products.forEach( (item) => {
          // console.log(item[0]);
          let productRes = item[0];
          // console.log(productRes.name);

          let productAdd = new Product(
            productRes.name,
            productRes.price,
            productRes.description,
            productRes.pictureName
          );

          this.cart.addProduct(productAdd, item[1]);

        } )
      });
    }
}
