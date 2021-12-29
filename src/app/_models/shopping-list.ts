/**
 * Model for store Productinformation for each ShoppingList entry (Product)
 */

export class ShoppingListProducts {
    id:number = -1;
    shoppingid:number = -1;   
    groceryid:number = -1;
    amount:number = 0;
    ischeck:boolean = false;
    pic_url:string = "";
    title:string = "";
    new_price:number = 0.00;
    discount:string = "";
    cid:number = -1;
}
