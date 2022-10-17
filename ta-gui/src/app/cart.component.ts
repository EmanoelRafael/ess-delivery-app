import { Component, OnInit} from '@angular/core'
import { Cart } from '../../../common/cart';
import { StoreService } from './store.service';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
    constructor(private storeService: StoreService) {};

    cart: Cart = new Cart();
    
    title = 'cart';

    ngOnInit(): void {
        this.storeService.getCart().subscribe(res => {this.cart = res}, msg => { alert(msg.message)})
        throw new Error('Method not implemented.');
    }
}