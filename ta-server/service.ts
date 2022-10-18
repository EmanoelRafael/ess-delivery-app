import { Client } from "../common/client";
import { Product } from "../common/product";

export class Service {
    
    clients: Array<Client>;
    products: Array<Product>;
    

    constructor() {
        this.clients = new Array<Client> ();
        this.products = new Array<Product> ();

        const fs = require('fs');
        
        var clientsData = fs.readFileSync("./db/clients.json");
        this.clients = <Array<Client>> JSON.parse(clientsData);

        var productsData = fs.readFileSync("./db/products.json");
        this.products = <Array<Product>> JSON.parse(productsData);
    }

    public addClient (nome: string, cpf: string, tel: string, email: string, nasc: string): number{
        var id = this.clients.push(new Client(nome, cpf, tel, email, nasc));
        this.updateDB("c");
        
        return id-1;
    }

    public getClient (id: number): Client{
        if(id<this.clients.length){
            return this.clients[id];
        }else{
            return new Client("","","","","");
        }
    }

    public updateDB(flag: string){
        const fs = require('fs');
        if(flag == "c"){
            fs.writeFileSync("./db/clients.json", JSON.stringify(this.clients));
        }else if(flag == "p"){
            fs.writeFileSync("./db/products.json", JSON.stringify(this.products));
        }
    }

    public addProduct(name: string, price: number, description: string, pictureName: string): number{
        var id = this.products.push(new Product(name, price, description, pictureName));
        this.updateDB("p");

        return id-1;
    }

    public getProduct(id: number): Product{
        if(id<this.products.length){
            return this.products[id];
        }else{
            return new Product("",0,"","");
        }
        
    }

    public addProductClient(clientId: number, productId: number, qtd: number): void{
        this.getClient(clientId).getCart().addProduct(this.getProduct(productId),qtd);
        this.updateDB("c");
        //Obs: Itens para efatoraçao -> Adicionar verificacoes de retorno para cliente e produto
        //Obs: Para a refatoracao -> Adicionar a quantidade de produtos no estoque
    }
}