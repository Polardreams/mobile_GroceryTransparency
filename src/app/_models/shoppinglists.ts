import { ShoppingListProducts} from "./shopping-list";

/**
 * ShoppingList datas like 
 *  name
 *  id
 *  accountid (user reference)
 *  list of products
 */

export class Shoppinglist {
    id:number = -1;
    name:string = "Meine neue Einkaufsliste";
    accountid:number = -1;
    products:ShoppingListProducts[] = [];
}
