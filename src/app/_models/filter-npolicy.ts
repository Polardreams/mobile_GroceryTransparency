import { Discounterfilter } from "./discounterfilter";
import { PermissionNpolicy } from "./permission-npolicy";
import { Searchfilter } from "./searchfilter";
import { Sortfilter } from "./sortfilter";

/**
 * it is a Model for fetching, posting and writing all user settings into databse, localStorge and the current Models (during runtime)
 * 
 * it include the following user settings:
 *  sortfilter (sort productlist on the base of price, discount or group by discounter)
 *  discountfilter  (sort productlist on the base of companie)
 *  searchgfilter (searchResults within all-products or only current products of the week and define count of results)
 *  permissionNpolicy (save user permission localisation, storage and private policy)
 * 
 * attention!!! 
 *  categories is a part of discounterfilter although it will displayed directly in front of main-screen (out of discounterfilter - dialogue)
 */

export class FilterNpolicy {
    public sortfilter = new Sortfilter();
    public discounterfilter = new Discounterfilter();
    public searchfilter = new Searchfilter();
    public permissionNpolicy = new PermissionNpolicy();
}
