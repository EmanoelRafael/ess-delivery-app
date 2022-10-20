import { Product } from "../common/product";
import { Address } from "../common/address";
import { Cart } from "../common/cart";
import { Order } from "../common/order";

export class Client {
    name: string;
    cpf: string;
    tel: string;
    email: string;
    nasc: string;
    address: Address;
    paymentMethod: string;
    cart: Cart;
    orders: Array<string>;
    order: Order;

    constructor(name: string, cpf: string, tel: string, email: string, nasc: string) {
        this.name = name;
        this.cpf = cpf;
        this.tel = tel;
        this.email = email;
        this.nasc = nasc;
        this.address = new Address();
        this.paymentMethod = "Credit Card";
        this.cart = new Cart(this.address);
        this.orders = new Array<string>();
        this.order = new Order(this.cart, "", "");
    }

    public getCart(): Cart {
        return this.cart;
    }

    public getEmail(): string {
        return this.email;
    }

    public addOrder(code: string): Order {
        const order: Order = new Order(this.cart, this.paymentMethod, code)
        this.orders.push(code);
        this.cart = new Cart(this.address);

        return order;
    }

    public getOrder(): Order {
        return this.order;
    }
}