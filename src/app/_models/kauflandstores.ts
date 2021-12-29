/**
 * Model for reading Kaufland-Stores from file "kaufland_stores.json" (find on "www.vergleichsdiscounter.de")
 * it stores all current stores from Kaufland in germany
 */
export class Kauflandstores {
    index:number = -1;
    name:string = "";

    constructor(index:number, name:string) {
        this.index = index;
        this.name = name;
    }
}
