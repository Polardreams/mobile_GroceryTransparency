/**
 * It's a Model for get methode to send all form datas to
 * backend to create a new product in table groceries
 * 
 * CreateProduct is located in Componentn favorits-create
 */
export class CreateProduct {
    public id:number = -1;
    public title:string = "";
    public new_price:number = 0;
    public cid:number = -1;
    public description:string ="";
    public amount:string="";
    public price_per_amount:string="";
    public hint:string = "";
    public owner:number = -1;
    public pic:string = "";
    public pic_url:string ="";
}
