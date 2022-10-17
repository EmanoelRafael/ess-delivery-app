import { Client } from "../common/client";

export class Service {
    
    clients: Array<Client>;
    

    constructor() {
        this.clients = new Array<Client>();
    }

    public addClient (nome: string, cpf: string, tel: string, email: string, nasc: string): void{
        var id = this.clients.push(new Client(nome, cpf, tel, email, nasc));
        const fs = require('fs');
        var clientsData = fs.readFileSync("./db/clients.json");
        clientsData = JSON.parse(clientsData);
        clientsData.push(this.clients[id-1]);
        fs.writeFileSync("./db/clients.json", JSON.stringify(clientsData));
    }

    public getClient (id: number): Client{
        return this.clients[id];
    }
}