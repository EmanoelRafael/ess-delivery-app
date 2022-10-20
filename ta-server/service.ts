import { Client } from "../common/client";
import { Order } from "../common/order";
import { Product } from "../common/product";

import * as nodemailer from "nodemailer";

export class Service {

    clients: Array<Client>;
    products: Array<Product>;
    orders: Array<Order>;

    COMPANY_EMAIL: string = 'fastandship@gmail.com';
    COMPANY_PASS: string = "pczs efkf xotv huzl";

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
        //Obs: Itens para refatoraçao -> Adicionar verificacoes de retorno para cliente e produto
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
            this.sendMail(client, "realizado");
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

    public sendMail(client:Client, type: string): boolean{

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.COMPANY_EMAIL,
                pass: this.COMPANY_PASS
            }
        });
        
        var mailOptions = {
            from: this.COMPANY_EMAIL,
            to: client.getEmail(),
            subject: type=="realizado"?'Fast&Ship - Comprovante de Compra':'Fast&Ship - Comprovante de Cancelamento',
            text: type=="realizado"?this.makeEmailMsgOrdered(client):this.makeEmailMsgCancelled(client),
            context: {id:client.getEmail()}
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

    public makeEmailMsgOrdered(client: Client): string{
        const code: string = client.getLastOrder();
        const order: Order = this.getOrderByCode(code);
        var msg: string = "";
        
        msg += `Ola, ${client.name}\n`;
        msg += `Entramos em contato para confirmar o pedido de Cod ${code}:\n`

        for (let index = 0; index < order.cart.getProducts().length; index++) {
            const element = order.cart.getProducts()[index];
            
            msg += `${element[1]}X${element[0].getName()}...........${element[0].priceString}\n`;

        }

        msg += `Frete: ${order.cart.stringShipping}\n`;
        msg += `Total: ${order.cart.stringValue}\n\n`;

        msg += `Método de Pagamento:\n    ${order.paymentMethod}\n`;
        msg += `Endereço de Entrega:\n    ${order.cart.deliveryAddress.getStringAddress()}\n`;
        msg += `Data Estimada para Entrega:\n    ${order.deliveryDate}\n\n`;

        msg += 'Obrigado por escolher a Fast&Ship 🚀';

        return msg;
    }

    public makeEmailMsgCancelled(client: Client): string{
        return "";
    }

    public getOrderByCode(cod: string): Order{

        var order: Order = this.orders.find(({code}) => code == cod)

        return order;
    }
}