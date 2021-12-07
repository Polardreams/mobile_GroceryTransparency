export class Favorits {
    accountid:number = -1;
    grocerie:number = -1;//variablen name wegen APi falsch

    constructor(accountid:number, grocerie:number) {
        this.accountid = accountid;
        this.grocerie = grocerie;
    }
}
