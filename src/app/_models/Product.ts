/**
 * Model for fetching product-information from table groceries.
 * These Wrapper will still use in a lot of components:
 * 
 */
export class Product {
    id:number=0;
    title:string="";
    pic_url:string="";
    new_price:number=0;
    old_price:number=0;
    description:string="";
    amount:string="";
    price_per_amount:string="";
    companie:number=0;
    hint:string="";
    discount:string="";
    validity:string="";
    memberflag:boolean=false;
    date:Date=new Date();
    categorie:number=1;
    favCount:number=0;

}
