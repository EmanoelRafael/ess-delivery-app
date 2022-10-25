import { Address } from "../../common/address";
import { Cart } from "../../common/cart";
import { Client } from "../../common/client";
import { Order } from "../../common/order";
import { Product } from "../../common/product";

export class DBService {
    clients: Array<Client>;
    products: Array<Product>;
    orders: Array<Order>;

    constructor() {
        this.clients = new Array<Client>();
        this.products = new Array<Product>();
        this.orders = new Array<Order>();

        const fs = require('fs');
        
        var productsData = JSON.parse(fs.readFileSync("./db/products.json"));
        if(productsData.length>0)this.products = this.convertProductArray(productsData[0]);
        
        var ordersData = JSON.parse(fs.readFileSync("./db/orders.json"));
        if(ordersData.length>0)this.orders = this.convertOrderArray(ordersData[0]);
        
        var clientsData = JSON.parse(fs.readFileSync("./db/clients.json"));
        if(clientsData.length>0)this.clients = this.convertClientArray(clientsData[0]);
        
    }

    public getClients(): Array<Client>{
        return this.clients;
    }

    public getProducts(): Array<Product>{
        return this.products;
    }

    public getOrders(): Array<Order>{
        return this.orders;
    }

    public setClients(clients: Array<Client>): void{
        this.clients = clients;
    }

    public setProducts(products: Array<Product>): void{
        this.products = products;
    }

    public setOrders(orders: Array<Order>): void{
        this.orders = orders;
    }

    public updateDB(flag: string) {
        const fs = require('fs');
        if (flag == "c") {
            fs.writeFileSync("./db/clients.json", JSON.stringify(this.clients));
        } else if (flag == "p") {
            fs.writeFileSync("./db/products.json", JSON.stringify(this.products));
        }
        else if (flag == "o") {
            fs.writeFileSync("./db/orders.json", JSON.stringify(this.orders));
        }
    }

    public convertClientArray(list: Array<Client>): Array<Client>{

        var retList: Array<Client> = new Array<Client>();

        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            var client: Client = this.convertClient(element);
            retList.push(client);
        }
        
        return retList;
    }

    public convertProductArray(list: Array<Product>): Array<Product>{

        var retList: Array<Product> = new Array<Product>();
        
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            var product: Product = this.convertProduct(element);
            retList.push(product);
        }
        
        return retList;
    }

    public convertOrderArray(list: Array<Order>): Array<Order>{

        var retList: Array<Order> = new Array<Order>();

        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            var order: Order = this.convertOrder(element);
            retList.push(order);
        }
        
        return retList;
    }

    public convertProductList(list: Array<[Product, number]>): Array<[Product, number]>{

        var productList: Array<[Product, number]>;

        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            productList.push([this.convertProduct(element[0]),element[1]])
        }

        return productList;
    }

    public convertClient(client: Client): Client{
        var clientCopy: Client = new Client(client.name, client.cpf, client.tel, client.email, client.nasc);
        
        clientCopy.address = this.convertAddress(client.address);
        clientCopy.cart = this.convertCart(client.cart);
        clientCopy.orders = client.orders
        clientCopy.paymentMethod = client.paymentMethod;
        clientCopy.order = this.convertOrder(client.order);

        return clientCopy;
    }

    public convertAddress(address: Address): Address{
        var addressCopy: Address = new Address();

        addressCopy.cep = address.cep;
        addressCopy.city = address.city;
        addressCopy.complement = address.complement;
        addressCopy.number = address.number;
        addressCopy.refPoint = address.refPoint;
        addressCopy.state = address.state;
        addressCopy.street = address.street;

        return addressCopy;
    }

    public convertCart(cart: Cart): Cart{
        var cartCopy: Cart = new Cart(this.convertAddress(cart.deliveryAddress))
        cartCopy.deliveryDate = cart.deliveryDate;
        cartCopy.empty = cart.empty;
        cartCopy.products = this.convertProductList(cart.products);
        cartCopy.shipping = cart.shipping;
        cartCopy.stringShipping = cart.stringShipping;
        cartCopy.stringValue = cart.stringValue;
        cartCopy.value = cart.value;

        return cartCopy;
    }

    public convertOrder(order: Order): Order{
        var orderCopy: Order = new Order(this.convertCart(order.cart),order.paymentMethod, order.code);

        orderCopy.deliveryDate = order.deliveryDate;
        orderCopy.orderedDate = order.orderedDate;
        orderCopy.status = order.status;

        return orderCopy;
    }

    public convertProduct(product: Product): Product{
        console.log("Vou copiar", product)
        var productCopy: Product = new Product(product.name,product.price,product.description, product.pictureName);
        return productCopy;
    }
}