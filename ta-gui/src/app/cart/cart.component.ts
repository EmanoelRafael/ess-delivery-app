import { Component, OnInit} from '@angular/core'
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { Cart } from '../../../../common/cart';
import { StoreService } from './../store.service';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
    constructor(private storeService: StoreService) {};

    cart: Cart = new Cart();
    value: string = this.cart.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    shipping: string = this.cart.shipping.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    ngOnInit(): void {
        this.storeService.getCart().subscribe(res => {
            this.cart = res
            this.value = this.cart.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            this.shipping = this.cart.shipping.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        })
    }
}