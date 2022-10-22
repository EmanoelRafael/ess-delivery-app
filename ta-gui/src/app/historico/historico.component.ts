import { Component, OnInit } from '@angular/core'
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { Address } from '../../../../common/address';
import { Cart } from '../../../../common/cart';

import { Order } from '../../../../common/order';
import { StoreService } from './../store.service';

@Component({
    selector: 'historico',
    templateUrl: './historico.component.html',
    styleUrls: ['./historico.component.css']
})

export class HistoricoComponent implements OnInit {
    constructor(private storeService: StoreService) { };
    cart: Cart = new Cart(new Address);
    order: Order = new Order(this.cart, "", "");
    ngOnInit(): void {
        this.storeService.getOrder().subscribe(res => {
            this.order = res
        })
    }
}