import { Discounterfilter } from "./discounterfilter";
import { PermissionNpolicy } from "./permission-npolicy";
import { Searchfilter } from "./searchfilter";
import { Sortfilter } from "./sortfilter";

export class FilterNpolicy {
    public sortfilter = new Sortfilter();
    public discounterfilter = new Discounterfilter();
    public searchfilter = new Searchfilter();
    public permissionNpolicy = new PermissionNpolicy();
}
