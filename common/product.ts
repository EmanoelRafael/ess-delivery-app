export class Product {
    name: string;
    value: Number;
    description: String;
    pictureName: String;
    
    constructor(name: string, value: Number, description: string, pictureName: string) {
        this.name = name;
        this.value = value;
        this.description = description;
        this.pictureName = pictureName;
    }
}