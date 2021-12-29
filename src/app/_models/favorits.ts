/**
 * It is a sub Model for alllists.
 * it represent table structure from table Favorits in the database.
 */
export class Favorits {
    accountid:number = -1;
    grocerie:number = -1;//variablen name its wrong through API

    constructor(accountid:number, grocerie:number) {
        this.accountid = accountid;
        this.grocerie = grocerie;
    }
}
