import { Cart } from "../common/cart";

export class Order {
    cart: Cart;
    orderedDate: string;
    deliveryDate: string;
    paymentMethod: string;

    constructor(cart: Cart) {
        this.cart = cart;
        this.orderedDate = "";
        this.deliveryDate = "";
        this.paymentMethod = "";
    }
}