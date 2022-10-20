import { Address } from "../common/address";
import { Product } from "../common/product";

export class Cart {
    products: Array<[Product,number]>;
    value: number;
    stringValue: string;
    stringShipping: string;
    empty: boolean;
    shipping: number;
    deliveryAddress: Address;
    deliveryDate: string;


    constructor(deliveryAddress: Address) {
        this.products = Array<[Product,number]> ();
        this.value = 0;
        this.stringValue = "";
        this.empty = true;
        this.shipping = 0;
        this.stringShipping = this.shipping.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        this.deliveryAddress = deliveryAddress;
        this.deliveryDate = "Agosto de Deus"
    }

    public getProducts(): Array<[Product,number]>{
        return this.products;
    }

    public addProduct(product: Product, qtd: number): void{
        this.products.push([product,qtd]);
        this.value += (qtd*product.getPrice());
        this.stringValue = this.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        if (this.empty) {
            this.empty = false;
        }
    }

    public setAddress(address: Address): void{
        this.deliveryAddress = address;
    }

    public setShipping(shipping: number): void{
        this.shipping = shipping;
    }

    public getAddress(): Address{
        return this.deliveryAddress;
    }

}