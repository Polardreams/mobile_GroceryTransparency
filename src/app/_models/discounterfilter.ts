/**
 * Discounterfilter are a Model for creating JSON-Objetcs to write into localStorage or send
 * these Filteroptions to backend with http get method.
 * 
 */
export class Discounterfilter {
    discount_aldin:boolean=true;
    discount_aldis:boolean=true;
    discount_kaufland:boolean=false;
    discount_kaufland_storeid:string="";
    discount_rewe:boolean=true;
    discount_lidl:boolean=true;
    categorie:number=1;
}
