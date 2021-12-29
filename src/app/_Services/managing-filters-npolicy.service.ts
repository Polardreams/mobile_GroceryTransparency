import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FilterNpolicy } from '../_models/filter-npolicy';
import { GT_Response_filterNpolicy } from '../_models/Response';
import { Subject } from 'rxjs'; 

/**
 * Service wich handle all Filters and Policy between WebApp and Backend
 * use Observable to make a Callback for executing instance
 * Observable pass FilterNpolicy 
 */


@Injectable({
  providedIn: 'root'
})
export class ManagingFiltersNPolicyService {
  private http:HttpClient;
  private session!:any;
  public FilterpermissionNpolicy!:FilterNpolicy;
  private subject = new Subject<FilterNpolicy>();

  constructor(private _http:HttpClient) { 
    this.http = _http;
  }

/**
 * 
 * @param id account id
 * @returns GT_Response_filterNpolicy
 */

  private getcurrentFiltersNPolicyfromDB(id:number) {
    return this.http.get<GT_Response_filterNpolicy>(environment.backendUrl+"getfilterNpolicy.php?id="+id);
  }

  private iniSessionFilterNPolicy () {
    if (localStorage.getItem("fpp")==null) {
      this.FilterpermissionNpolicy = new FilterNpolicy();
      console.log("iniSessionFilterNPolicy");
      localStorage.setItem("fpp", JSON.stringify(this.FilterpermissionNpolicy));
    }
  }

  /**
   * write Permissions and Policy user declaration into localStorage from browser
   */
  updatePermissionNpolicyintoSession() {
    if (localStorage.getItem("fpp")!=null) {
      localStorage.removeItem("fpp");
      localStorage.setItem("fpp", JSON.stringify(this.FilterpermissionNpolicy));
    } else {
      console.error(`Polardreams [updatePermissionNpolicyintoSession]- error: session.getItem ist null`);
      this.iniSessionFilterNPolicy();
      console.log(`Polardreams [updatePermissionNpolicyintoSession]: eine neue fpp wurde erstellt`);
    }
  }

  /**
   * fetch permissions and policy and write them into localStorage and Model
   * @param id account id
   */
  fetchNwriteFilterNPolicyintoSession(id:number) {
    this.iniSessionFilterNPolicy();
    this.getcurrentFiltersNPolicyfromDB(id).subscribe((response)=>{
      this.FilterpermissionNpolicy = this.converter_tinyint_into_boolean(response.response);
      this.subject.next(this.FilterpermissionNpolicy);
      localStorage.removeItem("fpp");
      localStorage.setItem("fpp", JSON.stringify(this.FilterpermissionNpolicy));
    });
  }

  /**
   * convert database mysql tinyint into boolean
   * @param int tinyInt
   * @returns boolean
   */

  tinyintToBool(int:number | null):boolean | null {
    if (int == null) return null;
    if (int==0) {
      return false;
    } else {
      return true;
    }
  }

/**
 * convert WebApp boolean into database (mysql) tinyint
 * @param boolean
 * @returns number
 */

  booleanToTinyint (bool:boolean):number {
    if (bool==false) {
      return 0;
    } else {
      return 1;
    }
  }

  /**
   * convert all important properties from TinyInt into boolean
   * @param filter 
   * @returns 
   */
  converter_tinyint_into_boolean(filter:any):FilterNpolicy {
    filter.discounterfilter.discount_aldin = this.tinyintToBool(filter.discounterfilter.discount_aldin);
    filter.discounterfilter.discount_aldis = this.tinyintToBool(filter.discounterfilter.discount_aldis);
    filter.discounterfilter.discount_rewe = this.tinyintToBool(filter.discounterfilter.discount_rewe);
    filter.discounterfilter.discount_lidl = this.tinyintToBool(filter.discounterfilter.discount_lidl);
    filter.discounterfilter.discount_kaufland = this.tinyintToBool(filter.discounterfilter.discount_kaufland);
    filter.sortfilter.sort_discount_asc = this.tinyintToBool(filter.sortfilter.sort_discount_asc);
    filter.sortfilter.sort_discount_desc = this.tinyintToBool(filter.sortfilter.sort_discount_desc);
    filter.sortfilter.sort_price_asc = this.tinyintToBool(filter.sortfilter.sort_price_asc);
    filter.sortfilter.sort_price_desc = this.tinyintToBool(filter.sortfilter.sort_price_desc);
    filter.sortfilter.group_discounter = this.tinyintToBool(filter.sortfilter.group_discounter);
    filter.searchfilter.allweeks = this.tinyintToBool(filter.searchfilter.allweeks);
    filter.searchfilter.currentweeks = this.tinyintToBool(filter.searchfilter.currentweeks);
    filter.permissionNpolicy.camera = this.tinyintToBool(filter.permissionNpolicy.camera);
    filter.permissionNpolicy.localisation = this.tinyintToBool(filter.permissionNpolicy.localisation);
    filter.permissionNpolicy.policy = this.tinyintToBool(filter.permissionNpolicy.policy);
    filter.permissionNpolicy.storage = this.tinyintToBool(filter.permissionNpolicy.storage);
    return filter;
  }

  /**
   * convert all important properties from boolean to TinyInt
   * @param filter 
   * @returns 
   */
  converter_boolean_into_tinyint(filter:any):any {
    filter.discounterfilter.discount_aldin = this.booleanToTinyint(filter.discounterfilter.discount_aldin);
    filter.discounterfilter.discount_aldis = this.booleanToTinyint(filter.discounterfilter.discount_aldis);
    filter.discounterfilter.discount_rewe = this.booleanToTinyint(filter.discounterfilter.discount_rewe);
    filter.discounterfilter.discount_lidl = this.booleanToTinyint(filter.discounterfilter.discount_lidl);
    filter.discounterfilter.discount_kaufland = this.booleanToTinyint(filter.discounterfilter.discount_kaufland);
    filter.sortfilter.sort_discount_asc = this.booleanToTinyint(filter.sortfilter.sort_discount_asc);
    filter.sortfilter.sort_discount_desc = this.booleanToTinyint(filter.sortfilter.sort_discount_desc);
    filter.sortfilter.sort_price_asc = this.booleanToTinyint(filter.sortfilter.sort_price_asc);
    filter.sortfilter.sort_price_desc = this.booleanToTinyint(filter.sortfilter.sort_price_desc);
    filter.sortfilter.group_discounter = this.booleanToTinyint(filter.sortfilter.group_discounter);
    filter.searchfilter.allweeks = this.booleanToTinyint(filter.searchfilter.allweeks);
    filter.searchfilter.currentweeks = this.booleanToTinyint(filter.searchfilter.currentweeks);
    filter.permissionNpolicy.camera = this.booleanToTinyint(filter.permissionNpolicy.camera);
    filter.permissionNpolicy.localisation = this.booleanToTinyint(filter.permissionNpolicy.localisation);
    filter.permissionNpolicy.policy = this.booleanToTinyint(filter.permissionNpolicy.policy);
    filter.permissionNpolicy.storage = this.booleanToTinyint(filter.permissionNpolicy.storage);
    return filter;
  }

  /**
   * part of Observable Callback
   * @returns FilterNpolicy
   */

  getFiltersNPolicy() {
    return this.subject.asObservable();
  }

  /**
   * read from Model Filters and post into database
   * @param id account id
   */
  readNpostFilterintoDB (id:number) {
    if (localStorage.getItem("fpp")!=null) {
      this.session = localStorage.getItem("fpp");
      var session = this.converter_boolean_into_tinyint(JSON.parse(this.session));
      this.http.get<GT_Response_filterNpolicy>(environment.backendUrl+"updatefilters.php?id="+id+ '&body={"discounterfilter":'+JSON.stringify(session.discounterfilter)+',"searchfilter":'+JSON.stringify(session.searchfilter)+',"sortfilter":'+JSON.stringify(session.sortfilter)+"}").subscribe((response) => {
        console.log("Polardreams[readNpostFilterNPolicyintoDB] Server-Response: " + JSON.stringify(response));
      });    
    } else {
      console.error(`Polardreams [readNpostFilterNPolicyintoDB]- error: session.getItem ist null`);
    }
  }
  /**
   * read from Model Policy and post into database
   * fpp = filterNPermissionNPolicy tag
   * @param id account id
   */
  readNpostPolicyintoDB (id:number) {
    if (localStorage.getItem("fpp")!=null) {
      this.session = localStorage.getItem("fpp");
      var session = JSON.parse(this.session);
      var session = this.converter_boolean_into_tinyint(JSON.parse(this.session));
      this.http.get<GT_Response_filterNpolicy>(environment.backendUrl+"updatepnp.php?id="+id+"&body="+JSON.stringify(session.permissionNpolicy)).subscribe((response) => {
        console.log("Polardreams[readNpostFilterNPolicyintoDB] Server-Response: " + JSON.stringify(response));
      });
    } else {
      console.error(`Polardreams [readNpostFilterNPolicyintoDB]- error: session.getItem ist null`);
    }
  }

  /**
   * write FilterNpolicy (Model) into localStorage
   * fpp = filterNPermissionNPolicy tag
   * @param filterpermissionNpolicy (FilterNpolicy)
   */
   
  writeFilterNPolicyintoSession (filterpermissionNpolicy:FilterNpolicy) {
    if (filterpermissionNpolicy!=null) {
      localStorage.removeItem("fpp");
      localStorage.setItem("fpp", JSON.stringify(filterpermissionNpolicy));
    } else {
      console.error("Polardreams[writeFilterNPolicyintoSession] Error: filterpermissionNpolicy darf nicht null sein. Filter und Policy nicht gespeichert!");
    }
  }


}
