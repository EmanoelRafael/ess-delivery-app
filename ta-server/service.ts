import { Client } from "../common/client";
import { Order } from "../common/order";
import { Product } from "../common/product";

import * as nodemailer from "nodemailer";

export class Service {

    clients: Array<Client>;
    products: Array<Product>;
    orders: Array<Order>;

    constructor() {
        this.clients = new Array<Client>();
        this.products = new Array<Product>();
        this.orders = new Array<Order>();

        const fs = require('fs');

        var clientsData = fs.readFileSync("./db/clients.json");
        this.clients = <Array<Client>>JSON.parse(clientsData);

        var productsData = fs.readFileSync("./db/products.json");
        this.products = <Array<Product>>JSON.parse(productsData);

        var ordersData = fs.readFileSync("./db/orders.json");
        this.orders = <Array<Order>>JSON.parse(ordersData);
    }

    public addClient(nome: string, cpf: string, tel: string, email: string, nasc: string): number {
        var id = this.clients.push(new Client(nome, cpf, tel, email, nasc));
        this.updateDB("c");

        return id - 1;
    }

    public getClient(id: number): Client {
        if (id < this.clients.length) {
            return this.clients[id];
        } else {
            return new Client("", "", "", "", "");
        }
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

    public addProduct(name: string, price: number, description: string, pictureName: string): number {
        var id = this.products.push(new Product(name, price, description, pictureName));
        this.updateDB("p");

        return id - 1;
    }

    public getProduct(id: number): Product {
        if (id < this.products.length) {
            return this.products[id];
        } else {
            return new Product("", 0, "", "");
        }

    }

    public addProductClient(clientId: number, productId: number, qtd: number): void {
        this.getClient(clientId).getCart().addProduct(this.getProduct(productId), qtd);
        this.updateDB("c");
        //Obs: Itens para efatoraçao -> Adicionar verificacoes de retorno para cliente e produto
        //Obs: Para a refatoracao -> Adicionar a quantidade de produtos no estoque
    }

    public makeOrder(clientId: number): string {
        const client: Client = this.getClient(clientId);

        if (client.paymentMethod != "" && client.email != "") {
            const code = this.generateOrderCode(client);
            const order = client.addOrder(code);
            this.orders.push(order)
            this.updateDB("c");
            this.updateDB("o");
            return code;
        } else {
            return "fail";
        }

    }


    public generateOrderCode(client: Client): string{
        var code: string = "";
        if (client.cart.getProducts().length>0) {
            code = "" + client.name[0] + client.cart.getProducts()[0][0].name[0] + this.orders.length + "FS";
        
        }else{
            code = "fail"
        }
                //adicionar funcionalidade: Verificar se o codigo do pedido ja nao existe
        return code;
    }

    public sendMail(): boolean{

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fastandship@gmail.com',
                pass: "pczs efkf xotv huzl"
            }
        });
        
        var mailOptions = {
            from: 'fastandship@gmail.com',
            to: 'emanoelrafael2020@gmail.com',
            subject: 'Email de Teste',
            text: 'o que eh template',
            context: {id:'emanoelrafael2020@gmail.com'}
        };

        transporter.sendMail(mailOptions,function (error) {
            if (error) {
                console.log("Deu Ruim", error);
                false;
            } else {
                console.log("Deu Bom");
                true;
            }
        })

        return true;
    }
}