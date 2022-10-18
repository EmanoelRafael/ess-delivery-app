import { Cart } from "../common/cart";

export class Order {
    cart: Cart;
    orderedDate: string;
    deliveryDate: string;
    paymentMethod: string;
    status: string;

    constructor(cart: Cart, paymentMethod: string, deliveryDate: string) {
        this.cart = cart;
        var date = new Date();
        this.orderedDate = ""+String(date.getDay()).padStart(2,'0')+"/"+String(date.getMonth()).padStart(2,'0')+"/"+String(date.getFullYear()).padStart(2,'0');
        this.deliveryDate = deliveryDate;
        this.paymentMethod = paymentMethod;
        this.status = "In processing";
    }

    public setDeliveryDate(date: string): void{
        this.deliveryDate = date;
    }
}