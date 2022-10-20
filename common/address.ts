export class Address {
    cep: string;
    state: string;
    city: string;
    street: string;
    number: string;
    complement: string;
    refPoint: string;

    constructor() {
        this.cep = "cep";
        this.state = "state";
        this.city = "city";
        this.street = "street";
        this.number = "number";
        this.complement = "complement";
        this.refPoint = "refPoint";
    }

    public getStringAddress(): string{
        var str: string = "";

        str += `Logradouro: ${this.street}, ${this.number}, ${this.cep}\n`
        str += `${this.city}, ${this.state}`;
        return "";
    }
}