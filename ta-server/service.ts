import { Client } from "../common/client";
import { Order } from "../common/order";
import { Product } from "../common/product";

import * as nodemailer from "nodemailer";
import { Address } from "../common/address";
import { Cart } from "../common/cart";
import { DBService } from "./db/DBService";

export class Service {

    clients: Array<Client>;
    products: Array<Product>;
    orders: Array<Order>;
    dataBase: DBService;

    COMPANY_EMAIL: string = 'fastandship@gmail.com';
    COMPANY_PASS: string = "pczs efkf xotv huzl";

    constructor() {
        this.dataBase = new DBService();
        this.clients = this.dataBase.getClients()
        this.products = this.dataBase.getProducts()
        this.orders = this.dataBase.getOrders()

    }

    public addClient(nome: string, cpf: string, tel: string, email: string, nasc: string): number {
        var id = this.clients.push(new Client(nome, cpf, tel, email, nasc));
        this.dataBase.setClients(this.clients);
        this.dataBase.updateDB("c");

        return id - 1;
    }

    public getClient(id: number): Client {
        if (id < this.clients.length) {
            return this.clients[id];
        } else {
            return new Client("", "", "", "", "");
        }
    }


    public addProduct(name: string, price: number, description: string, pictureName: string): number {
        var id = this.products.push(new Product(name, price, description, pictureName));
        this.dataBase.setProducts(this.products);
        this.dataBase.updateDB("p");

        return id - 1;
    }

    public getProduct(id: number): Product {
        if (id < this.products.length) {
            return this.products[id];
        } else {
            return new Product("", 0, "", "");
        }

    }

    public getProducts(): Array<Product> {
        return this.products;
    }

    public addProductClient(clientId: number, productId: number, qtd: number): string {
        if(this.dataBase.addedProductCart(clientId, productId)){
            console.log(`Você já adicionou o produto ${this.products[productId].name}`);
            return `Você já adicionou o produto ${this.products[productId].name}`;
        } else {
            console.log(`${this.products[productId].name} adicionado ao carrinho`);
            this.getClient(clientId).getCart().addProduct(this.getProduct(productId), qtd);
            this.dataBase.setClients(this.clients)
            this.dataBase.updateDB("c");
            return `${this.products[productId].name} adicionado ao carrinho`;
        }
        //Obs: Itens para refatoraçao -> Adicionar verificacoes de retorno para cliente e produto
        //Obs: Para a refatoracao -> Adicionar a quantidade de produtos no estoque
    }

    public makeOrder(clientId: number): string {
        const client: Client = this.getClient(clientId);

        var validEmail: boolean = this.verifyEmail(client.email);
        var validPayment: boolean = true;
        //Verificar o Email

        if (validPayment && validEmail) {
            const code = this.generateOrderCode(client);
            const order = client.addOrder(code);

            this.orders.push(order)
            this.dataBase.setClients(this.clients);
            this.dataBase.setOrders(this.orders);
            this.dataBase.updateDB("c");
            this.dataBase.updateDB("o");

            this.sendMail(client, "placed", code);
            return code;
        } else {
            return "fail";
        }

    }


    public generateOrderCode(client: Client): string {
        var code: string = "";
        if (client.cart.getProducts().length > 0) {
            code = "" + client.name[0] + client.cart.getProducts()[0][0].name[0] + this.orders.length + "FS";

        } else {
            code = "fail"
        }
        //adicionar funcionalidade: Verificar se o codigo do pedido ja nao existe
        return code;
    }

    public cancelOrder(clientId: number, orderCode: string): string {
        const client: Client = this.getClient(clientId);
        var validEmail: boolean = this.verifyEmail(client.email);
        //Verificar o Email


        if(validEmail) {
            this.orders.find(({code}) => code == orderCode).setStatus("canceled");
            this.sendMail(this.getClient(clientId),"cancelado", orderCode);
            this.dataBase.setOrders(this.orders);
            this.dataBase.updateDB("o");

            return "canceled";

        } else {
            return "fail";
        }

    }

    public verifyEmail(email: string): boolean {
        //Funcao para ser implementada

        if(email == "emanoelrafael2020@gmail.com"){
            return true;
        }else{
            return false;
        }
    }

    public sendMail(client: Client, type: string, orderCode: string): boolean {

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
            subject: type == "placed" ? 'Fast&Ship - Comprovante de Compra' : 'Fast&Ship - Comprovante de Cancelamento',
            text: type == "placed" ? this.makeEmailMsgOrdered(client, orderCode) : this.makeEmailMsgCancelled(client, orderCode),
            context: { id: client.getEmail() }
        };

        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                false;
            } else {
                true;
            }
        })

        return true;
    }

    public makeEmailMsgOrdered(client: Client, orderCode: string): string {
        const order: Order = this.getOrderByCode(orderCode);
        var msg: string = "";

        msg += `Ola, ${client.name}\n`;
        msg += `Entramos em contato para confirmar o pedido de Cod ${orderCode}:\n`

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

    public makeEmailMsgCancelled(client: Client, orderCode: string): string {
        var msg: string = "";
        const order: Order = this.getOrderByCode(orderCode);

        msg += `Ola, ${client.name}\n\n`;

        msg += `Entramos em contato para confirmar o cancelamento do(s) produto(s):\n\n`;

        for (let index = 0; index < order.cart.getProducts().length; index++) {
            const element = order.cart.getProducts()[index];

            msg += `${element[1]}X${element[0].getName()}......${element[0].priceString}\n`;

        }

        msg += `\nMetodo de Pagamento utilizado: ${order.paymentMethod}\n
        Será enviado um email com as informacoes de devolucao.\n`;

        return msg;
    }

    public getOrderByCode(cod: string): Order {

        var order: Order = this.orders.find(({ code }) => code == cod)

        return order;
    }
}