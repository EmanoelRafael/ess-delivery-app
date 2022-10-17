export class Card {
    number: string;
    cardholderName: string;
    flag: string;
    expDate: string;
    valid: boolean;

    constructor(){
        this.number = "number";
        this.cardholderName = "cardholderName";
        this.flag = "flag";
        this.expDate = "expDate";
        this.valid = false;
    }
}