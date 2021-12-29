/**
 * Discounterfilter are a Model for creating JSON-Objetcs to write into localStorage or send
 * these Filteroptions to backend with http get method.
 * 
 */
export class Discounterfilter {
    discount_aldin:boolean=false;
    discount_aldis:boolean=false;
    discount_kaufland:boolean=false;
    discount_kaufland_storeid:string="";
    discount_rewe:boolean=false;
    discount_lidl:boolean=true;
    categorie:number=1;
}
