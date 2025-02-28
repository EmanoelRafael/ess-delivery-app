import { Cart } from "../common/cart";

export class Order {
    cart: Cart;
    orderedDate: string;
    deliveryDate: string;
    paymentMethod: string;
    code: string;
    status: string;
    empty: boolean;

    constructor(cart: Cart, paymentMethod: string, code: string) {
        this.cart = cart;
        var date = new Date();
        this.orderedDate = "" + String(date.getDay()).padStart(2, '0') + "/" + String(date.getMonth()).padStart(2, '0') + "/" + String(date.getFullYear()).padStart(2, '0');
        this.deliveryDate = "deliveryDate";
        this.paymentMethod = paymentMethod;
        this.code = code;
        this.empty = true;
        this.status = "In processing";
    }

    public setDeliveryDate(date: string): void {
        this.deliveryDate = date;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public setStatus(status: string): void {
        this.status = status
    }
}