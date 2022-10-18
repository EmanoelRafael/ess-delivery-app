export class Product {
    name: string;
    price: number;
    description: string;
    pictureName: string;
    
    constructor(name: string, price: number, description: string, pictureName: string) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.pictureName = pictureName;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPictureName(): string {
        return this.pictureName;
    }
}