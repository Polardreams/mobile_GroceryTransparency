import { Favorits } from "./favorits";

import { Product } from "./Product";
import { Sortfilter } from "./sortfilter";
import { Searchfilter } from "./searchfilter";
import { Discounterfilter } from "./discounterfilter";
import { PermissionNpolicy } from "./permission-npolicy";
import { Shoppinglist } from "./shoppinglists";
import { CreateProduct } from "./create-product";
import { ShoppingListProducts } from "./shopping-list";

export interface GT_Response_List {
    iserror:boolean;
    error:string;
    list:any[];
}

export interface GT_Response_Resonse {
    iserror:boolean;
    error:string;
    response:{Fav:Favorits[], Shop:Shoppinglist[]};
}

export interface GT_Response_Product {
    iserror:boolean;
    error:string;
    response:Product;
}

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

export interface GT_Response_ShoppingList {
    iserror:boolean;
    error:string;
    responseShoppinglist:Shoppinglist;
}

export interface GT_Response_ShoppingList {
    iserror:boolean;
    error:string;
    responseShoppinglist:Shoppinglist;
}

export interface GT_Response_ShoppingListAddToProducts {
    iserror:boolean;
    error:string;
    responseShoppinglist:ShoppingListProducts;
}

export interface GT_Response_CreateProduct {
    iserror:boolean;
    error:string;
    responseCreateProduct:CreateProduct;
}

export interface GT_Response_Account {
    iserror:boolean;
    error:string;
    response:number;
}