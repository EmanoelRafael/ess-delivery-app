import { Product } from "../common/product";
import { Address } from "../common/address";
import { Card } from "../common/card";
import { Cart } from "../common/cart";
import { Order } from "../common/order";

export class Client {
    name: string;
    cpf: string;
    tel: string;
    email: string;
    nasc: string;
    address: Address;
    card: Card;
    cart: Cart;
    orders: Array<Order>;

    constructor(name: string, cpf: string, tel: string, email:string, nasc:string ) {
        this.name = name;
        this.cpf = cpf;
        this.tel = tel;
        this.email = email;
        this.nasc = nasc;
        this.address = new Address();
        this.card = new Card();
        this.cart = new Cart();
        this.orders = new Array<Order> ();
    }

    public getCart() : Cart {
        return this.cart;
    }

    public getEmail() : string {
        return this.email;
    }
    
    public addOrder(paymentMethod: string, deliveryDate: string) : void {
        this.orders.push(new Order(this.cart, paymentMethod, deliveryDate))
    }
}