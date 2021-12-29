/**
 * SubModel for filterNpolicy, store all nessessary datas for search
 *  search_result_count (how many results displaying)
*   and decided keyword searching within all product (database) or only in weekly offers
 */

export class Searchfilter {
    search_result_count:number=15;
    allweeks:boolean=false;
    currentweeks:boolean=true;

}
