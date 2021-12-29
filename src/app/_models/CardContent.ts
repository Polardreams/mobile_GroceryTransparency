/**
 * Model for card for main
 */
export class CardContent{
    id:number;
    favflag:boolean;
    title:string;
    pic_url:string;
    pic_companie:string;
    new_price:number;
    companie:number;
    discount:string;
    date:Date;

    /**
     * Define all nessessary datas for Component "card for main"
     * 
     * @param id 
     * @param favflag 
     * @param title 
     * @param pic_url 
     * @param pic_companie 
     * @param new_price 
     * @param companie 
     * @param discount 
     * @param date 
     */
    
    constructor(id:number, favflag:boolean, title:string, pic_url:string, pic_companie:string, new_price:number, companie:number, discount:string, date:Date) {
        this.id = id;
        this.favflag = favflag;
        this.title = title;
        this.pic_url = pic_url;
        this.new_price = new_price;
        this.companie = companie;
        this.discount = discount;
        this.date = date;
        this.pic_companie = pic_companie;
    }
 
}