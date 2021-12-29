import { Favorits } from "./favorits";

import { Product } from "./Product";
import { Sortfilter } from "./sortfilter";
import { Searchfilter } from "./searchfilter";
import { Discounterfilter } from "./discounterfilter";
import { PermissionNpolicy } from "./permission-npolicy";
import { Shoppinglist } from "./shoppinglists";
import { CreateProduct } from "./create-product";
import { ShoppingListProducts } from "./shopping-list";

/**
 * it is a Response Wrapper for reading Server Callback
 * it calls when Server has noticed a error (include message) and 
 * response different kinds of lists (list of products)
 */
export interface GT_Response_List {
    iserror:boolean;
    error:string;
    list:any[];
}
/**
 * it is a Response Wrapper for reading Server Callback
 * it calls when Server has noticed a error (include message) and 
 * response alllists
 */
export interface GT_Response_Resonse {
    iserror:boolean;
    error:string;
    response:{Fav:Favorits[], Shop:Shoppinglist[]};
}


/**
 * it is a Response Wrapper for reading Server Callback
 * it calls when Server has noticed a error (include message) and 
 * response single product (use Wrapper Product)
 */
export interface GT_Response_Product {
    iserror:boolean;
    error:string;
    response:Product;
}

/**
 * it is a Response Wrapper for reading Server Callback
 * it calls when Server has noticed a error (include message) and 
 * response all user account settings like sort, discount, searchfilters and permission and policy declarations.
 */
export interface GT_Response_filterNpolicy {
    iserror:boolean;
    error:string;
    response:{
        sortfilter:Sortfilter;
        searchfilter:Searchfilter;
        discounterfilter:Discounterfilter;
        permissionNpolicy:PermissionNpolicy;
    };
}

/**
 * it is a Response Wrapper for reading Server Callback
 * it calls when Server has noticed a error (include message) and 
 * response a single shoppinglist
 */
export interface GT_Response_ShoppingList {
    iserror:boolean;
    error:string;
    responseShoppinglist:Shoppinglist;
}

/**
 * it is a Response Wrapper for reading Server Callback
 * it calls when Server has noticed a error (include message) and 
 * response new ShoppingLIst after updating theme
 */
export interface GT_Response_ShoppingListAddToProducts {
    iserror:boolean;
    error:string;
    responseShoppinglist:ShoppingListProducts;
}

/**
 * it is a Response Wrapper for reading Server Callback
 * it calls when Server has noticed a error (include message) and 
 * response new Product after add product to groceries (table)
 */
export interface GT_Response_CreateProduct {
    iserror:boolean;
    error:string;
    responseCreateProduct:CreateProduct;
}

/**
 * it is a Response Wrapper for reading Server Callback
 * it calls when Server has noticed a error (include message) and 
 * response account-id after create account
 * Attention!!! currently WebApp use temporary account wich save nessessary informaionts into localStorage 
 */
export interface GT_Response_Account {
    iserror:boolean;
    error:string;
    response:number;
}