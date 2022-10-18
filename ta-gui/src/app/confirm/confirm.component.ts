import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";

import { Cart } from "../../../../common/cart";
import { StoreService } from "./../store.service";

@Component({
    selector: 'confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit{
    constructor(private storeService: StoreService) {};

    cart: Cart = new Cart();
    value: string = this.cart.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    shipping: string = this.cart.shipping.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    ngOnInit(): void {
        this.storeService.getCart().subscribe(res => {
            this.cart = res
            console.log(JSON.stringify(res));
            this.value = this.cart.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            this.shipping = this.cart.shipping.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        })
    }
}