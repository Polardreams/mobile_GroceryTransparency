import { ShoppingListProducts} from "./shopping-list";

export class Shoppinglist {
    id:number = -1;
    name:string = "Meine neue Einkaufsliste";
    accountid:number = -1;
    products:ShoppingListProducts[] = [];
}
