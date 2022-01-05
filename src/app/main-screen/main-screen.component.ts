import { AfterViewInit, Component} from '@angular/core';
import {FetchCurrentOffersService} from '../_Services/fetch-current-offers.service';
import {Product} from '../_models/Product';
import { ManagingFiltersNPolicyService } from '../_Services/managing-filters-npolicy.service';
import { FilterNpolicy } from '../_models/filter-npolicy';
import { FormsModule } from '@angular/forms';
import { Categories } from '../_models/categories';
import { Kauflandstores } from '../_models/kauflandstores';
import { FetchSearchResultsService } from '../_Services/fetch-search-results.service';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';
import { Alllists } from '../_models/alllists';
import * as globals from '../../global';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenerateAccountService } from '../_Services/generate-account.service';

/**
 * ParentComponent contain:
 *  card-for-main
 *  submenu-cardformain
 * 
 * Main Features are:
 *  Permission and private policy dialogue
 *  Sort dialogue
 *  Discounter dialogue
 *  Search dialogue
 *  Select categories
 *  Search form
 *  List layout for weekly offers and searchresulte
 *  click one card to get product detail view
 *  include Methods for handling ShoppingList and Favorits
 * 
 * Dataflow:
 *  Component between following Services:
 *    - FetchCurrentOffersService
 *    - ManagingFiltersNPolicyService
 *    - FetchSearchResultsService
 *    - FetchAllListsService
 * 
 *  Parent between Child
 *    card-for-main ([_productlist]="productlist" [alllists]="alllists")
 * 
 * Hooks
 *  life cycles:
 *    - constructor 
 *    - AfterViewInit
 */

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements AfterViewInit{
  service_managingFilterNPolicy!:ManagingFiltersNPolicyService;
  service!:FetchCurrentOffersService;
  service_search!:FetchSearchResultsService;
  service_alllists!:FetchAllListsService;
  productlist!:Product[];
  filterPnp:FilterNpolicy = new FilterNpolicy();
  categories:Categories = new Categories();
  privacyTextflag:boolean = false;
  coords = {latitude: 0, longitude: 0};
  kauflandstores:Kauflandstores[] = [];
  stores:any[] = [];
  nextStores:number[] = [];
  kauflandID:number = -1;
  temp_datas!:Product[];
  searchterm:string="";
  alllists!:Alllists;
  http!:HttpClient;
  searchScopeText:string="";
  
/**
 * pass the following Libs and services
 * @param _http 
 * @param _service 
 * @param _serviceManagingFilterNPolicy 
 * @param _service_search 
 * @param _service_alllists 
 * 
 * fetch and write Filter and Policy into Session from user account
 * fetch and write Alllists into Session
 */
  constructor(private _http:HttpClient, private _service:FetchCurrentOffersService, private _serviceManagingFilterNPolicy:ManagingFiltersNPolicyService, _service_search:FetchSearchResultsService, _service_alllists:FetchAllListsService) { 
    this.service_managingFilterNPolicy = _serviceManagingFilterNPolicy;
    this.service_managingFilterNPolicy.fetchNwriteFilterNPolicyintoSession(globals.account.prototype.id);
    this.service = _service;
    this.service_search = _service_search;
    this.service_alllists = _service_alllists;
    this.service_alllists.fetchNwriteintoSession(globals.account.prototype.id);
    this.http = _http;
  }


  /**
   * check if sid is load and execute getcurrentProduct
   * @param sid Kauflandstore
   */
  getcurrentProducts (sid:string|null) {
    if (sid!=null) {
      this._service.getcurrentProduct(sid).subscribe((datas) => {
        if (datas.iserror == true) {
          console.log(`Polardreams Error - fetch-curent-offers-service: ${datas.error}`);
        } else {
          console.log(`Polardreams main-screen - fetch-curent-offers done`);
          let arr:Product[] = [];
          this.productlist = [];
          this.temp_datas = datas.list;
          
          datas.list.forEach((item, index, array) => {
            if (index <= this.filterPnp.searchfilter.search_result_count) {
              this.productlist.push(item);
            }
          });
          this.updateProductList();
        }
      });
    } else {
      this._service.getcurrentProduct(null).subscribe((datas) => {
        if (datas.iserror == true) {
          console.log(`Polardreams Error - fetch-curent-offers-service: ${datas.error}`);
        } else {
          console.log(`Polardreams main-screen - fetch-curent-offers done`);
          let arr:Product[] = [];
          this.productlist = [];
          this.temp_datas = datas.list;
          datas.list.forEach((item, index, array) => {
            if (index <= this.filterPnp.searchfilter.search_result_count) {
              this.productlist.push(item);
            }
          });
          this.updateProductList();
        }
      });
    }
  }

  /**
   * reset current productlist back to received weekly offers from getCurrentProducts()
   */
  resetProductList() {
    this.productlist = [];
    this.temp_datas.forEach((item, index, array) => {
        this.productlist.push(item);
    });
  }

  /**
   * sort productlist 
   *  based on price asc
   */
  sort_price_asc () {
    var temp = this.productlist;
    temp.sort((a:Product, b:Product) => a.new_price - b.new_price);
    this.productlist = [];
    temp.forEach((item, index, array) => {
      this.productlist.push(item);
    });
  }

  /**
   * sort productlist 
   *  based on price desc
   */
  sort_price_desc () {
    var temp = this.productlist;
    temp.sort((a:Product, b:Product) => a.new_price + b.new_price);
    this.productlist = [];
    temp.forEach((item, index, array) => {
      this.productlist.push(item);
    });
  }

  /**
   * sort productlist 
   *  based on discount asc
   */
  sort_discount_asc () {
    var temp = this.productlist;
    temp.sort(function(a,b) {
      if (a.discount<b.discount) {
        return -1;
      }
      if (a.discount>b.discount) {
        return 1;
      }
      return 0;
    });
    this.productlist = [];
    temp.forEach((item, index, array) => {
      if (item.discount!="") this.productlist.push(item);
    });
  }

  /**
   * sort productlist 
   *  based on discount desc
   */
  sort_discount_desc () {
    var temp = this.productlist;
    temp.sort(function(a,b) {
      if (a.discount>b.discount) {
        return -1;
      }
      if (a.discount<b.discount) {
        return 1;
      }
      return 0;
    });
    this.productlist = [];
    temp.forEach((item, index, array) => {
      if (item.discount!="") this.productlist.push(item);
    });
  }

  /**
   * group productlist 
   *  based on discounter 
   */
  sort_group () {
    var temp = this.productlist;
    temp.sort(function(a,b) {
      if (a.companie>b.companie) {
        return -1;
      }
      if (a.companie<b.companie) {
        return 1;
      }
      return 0;
    });
    this.productlist = [];
    temp.forEach((item, index, array) => {
      this.productlist.push(item);
    });
  }

  /**
   * reset productlist based on discounter filter
   */
  setcompanies() {
    var temp = this.productlist;
    this.productlist = [];
    temp.forEach((item, index, arr) => {
      if (item.companie==1 && this.filterPnp.discounterfilter.discount_lidl && (this.filterPnp.discounterfilter.categorie==item.categorie)) this.productlist.push(item);
      if (item.companie==2 && this.filterPnp.discounterfilter.discount_rewe && (this.filterPnp.discounterfilter.categorie==item.categorie)) this.productlist.push(item);
      if (item.companie==3 && this.filterPnp.discounterfilter.discount_kaufland && (this.filterPnp.discounterfilter.categorie==item.categorie)) this.productlist.push(item);
      if (item.companie==4 && this.filterPnp.discounterfilter.discount_aldin && (this.filterPnp.discounterfilter.categorie==item.categorie)) this.productlist.push(item);
      if (item.companie==5 && this.filterPnp.discounterfilter.discount_aldis && (this.filterPnp.discounterfilter.categorie==item.categorie)) this.productlist.push(item);
    });
  }

  /**
   * bounds displaying products
   */
  setproductLimit () {
    var temp = this.productlist;
    this.productlist = [];
    temp.forEach((item, index, arr) => {
      if (index <= this.filterPnp.searchfilter.search_result_count) {
        this.productlist.push(item);
      }
    });
  }

  /**
   * set label for searchScope Toggle Button
   */
  lableForsearchScopeText() {
    if (this.filterPnp.searchfilter.currentweeks) this.searchScopeText="Es werden aktuelle Angebote angezeigt."; else  this.searchScopeText="Es werden alle Angebote angezeigt.";
  }


  /**
   * get Filter and Polcy from database (service_managingFilterNPolicy.getFiltersNPolicy())
   * getCurrentProducts()
   * fetch Alllists
   */
  ngAfterViewInit(): void {
   this.service_managingFilterNPolicy.getFiltersNPolicy().subscribe((fpnp) => {
   this.filterPnp = fpnp;
   
    this.service_alllists.getAlllists().subscribe((datas) => {
      this.alllists = datas;
      this.lableForsearchScopeText();
      this.searchScopeChange();
    });
   });



   setTimeout(() => {
    var btn = document.getElementById("btnpnp") as HTMLButtonElement;
    if (this.filterPnp.permissionNpolicy.policy==null) { 
      this.filterPnp = new FilterNpolicy();
      btn.click();
    } else {
      if (this.filterPnp.permissionNpolicy.localisation) {
        this.checkNUpdateGpsPermission();
      }
    }
   }, 2000);//display after 2 secounds
  }

 /**
  * bind all nessessary methods to update UI for displaying products
  */
  updateProductList () {
    this.resetProductList();
    this.setcompanies();
    if (this.filterPnp.sortfilter.sort_discount_asc) this.sort_discount_asc(); 
    if (this.filterPnp.sortfilter.sort_discount_desc) this.sort_discount_desc();
    if (this.filterPnp.sortfilter.sort_price_asc) this.sort_price_asc();
    if (this.filterPnp.sortfilter.sort_price_desc) this.sort_price_desc();
    if (this.filterPnp.sortfilter.group_discounter) this.sort_group();
    this.setproductLimit();
     
  }

  /**
   * post filters and policy into localStorage and database
   */
  saveFilterNPolicyintoSessionNDB() {
    
    this.http.get(environment.backendUrl+"updatefilters.php?id="+globals.account.prototype.id).subscribe(() => {     
        this.http.get(environment.backendUrl+"updatepnp.php?id="+globals.account.prototype.id).subscribe(() => {
          var temp = null; 
          temp = document.getElementById("sort_price_asc") as HTMLInputElement;
          if (temp.checked) this.filterPnp.sortfilter.sort_price_asc=true; else this.filterPnp.sortfilter.sort_price_asc=false;
          temp = document.getElementById("sort_price_desc") as HTMLInputElement;
          if (temp.checked) this.filterPnp.sortfilter.sort_price_desc=true; else this.filterPnp.sortfilter.sort_price_desc=false;
          temp = document.getElementById("sort_discount_asc") as HTMLInputElement;
          if (temp.checked) this.filterPnp.sortfilter.sort_discount_asc=true; else this.filterPnp.sortfilter.sort_discount_asc=false;
           temp = document.getElementById("sort_discount_desc") as HTMLInputElement;
          if (temp.checked) this.filterPnp.sortfilter.sort_discount_desc=true; else this.filterPnp.sortfilter.sort_discount_desc=false;
           temp = document.getElementById("group_discounter") as HTMLInputElement;
          if (temp.checked) this.filterPnp.sortfilter.group_discounter=true; else this.filterPnp.sortfilter.group_discounter=false;
      
          temp = document.getElementById("allweeks") as HTMLInputElement;
          if (temp.checked) this.filterPnp.searchfilter.allweeks=true; else this.filterPnp.searchfilter.allweeks=false;
          temp = document.getElementById("currentweeks") as HTMLInputElement;
          if (temp.checked) this.filterPnp.searchfilter.currentweeks=true; else this.filterPnp.searchfilter.currentweeks=false;
      
          if (this.filterPnp.permissionNpolicy.localisation) {
            this.checkNUpdateGpsPermission();
          }
          this.updateProductList();
          this.service_managingFilterNPolicy.writeFilterNPolicyintoSession(this.filterPnp);
          this.service_managingFilterNPolicy.readNpostFilterintoDB(globals.account.prototype.id);
          this.service_managingFilterNPolicy.readNpostPolicyintoDB(globals.account.prototype.id);
      
          //Suche ohne Keyword
          this.displaySearchResultWithoutKeyowrd();

        });
      });
  }

  /**
   * switch mode between display current weekly offers and all products
   */
  searchScopeChange() {
    var toggle = document.getElementById('searchScope') as HTMLInputElement;
    if (toggle.checked) {
      this.filterPnp.searchfilter.currentweeks = true;
      this.filterPnp.searchfilter.allweeks = false;
      if (this.filterPnp.discounterfilter.discount_kaufland_storeid=="") this.getcurrentProducts(null); else this.getcurrentProducts(this.filterPnp.discounterfilter.discount_kaufland_storeid);
      this.filterPnp.discounterfilter.categorie=1;
    } else {
      this.filterPnp.searchfilter.currentweeks = false;
      this.filterPnp.searchfilter.allweeks = true;
      this.searchForProducts();
    }
    this.lableForsearchScopeText();
  }

/**
 * preview for search results
 * instead of keywords, there use filter options (categories)
 * or use getcurrentProducts() (when demande weekly offers)
 */

  displaySearchResultWithoutKeyowrd () {
    if (this.filterPnp.searchfilter.allweeks) {
      this.searchForProducts();
    } else {
      this.getcurrentProducts(this.filterPnp.discounterfilter.discount_kaufland_storeid);
    }
  }

/**
 * set all permissions and policy true 
 * and save thios into localStorage and database
 */
  acceptAllTerms () {
    this.filterPnp.permissionNpolicy.camera = true;
    this.filterPnp.permissionNpolicy.localisation = true;
    this.filterPnp.permissionNpolicy.storage = true;
    this.filterPnp.permissionNpolicy.policy = true;
    this.updateProductList();
    this.checkNUpdateGpsPermission();
    this.saveFilterNPolicyintoSessionNDB();
  }

  /**
   * send request to browser navigator API
   * browser will ask for permission
   */
  checkNUpdateGpsPermission () {
      navigator.geolocation.getCurrentPosition(
        () => {
          this.updateGpsPosition()
        }, 
        () => {
          console.error("Polardreams [error]: navigator.geolocation hat ein Problem festgestellt. Es gibt keine GPS-Freigabe.");
        });      
  }

  /**
   * save current location to localeStorage
   */
  updateGpsPosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
      var temp;
      if (!this.positionFromStorageExist()) {
        temp = {latitude: 0, longitude: 0};
      } else {
        temp = JSON.parse(localStorage.getItem("storePos") || "");
      }
      if (!(temp.latitude==pos.coords.latitude && temp.longitude==pos.coords.longitude) || this.kauflandstores.length==0) {
        localStorage.setItem("storePos", JSON.stringify({latitude: pos.coords.latitude, longitude: pos.coords.longitude}));
        this.loadNmatchKauflandStores();
      }
    });
  }

  /**
   * show privacy text
   */
  clickPrivacyText() {
    this.privacyTextflag = !this.privacyTextflag;
  }

  /**
   * check if location ist exist on localeStorage
   * @returns boolean
   */
  positionFromStorageExist ():boolean {
		let flag;
		if (typeof(Storage) !== "undefined") {
			  if (localStorage.getItem("storePos")!=null) {
				  flag = true;
			  } else {
				  flag = false;
			  }
		} else {
			  flag = false;
		}
		return flag;
	}

  /**
   * calculate distance between two locations
   * @param lat1 
   * @param lon1 
   * @param lat2 
   * @param lon2 
   * @param unit 
   * @returns 
   */
  distance(lat1:number, lon1:number, lat2:number, lon2:number, unit:string):number {
		/**
		https://www.geodatasource.com/developers/javascript
		*/
		if ((lat1 == lat2) && (lon1 == lon2)) {
			return 0;
		}
		else {
			var radlat1 = Math.PI * lat1/180;
			var radlat2 = Math.PI * lat2/180;
			var theta = lon1-lon2;
			var radtheta = Math.PI * theta/180;
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist);
			dist = dist * 180/Math.PI;
			dist = dist * 60 * 1.1515;
			if (unit=="K") { dist = dist * 1.609344 }
			if (unit=="N") { dist = dist * 0.8684 }
			return dist;
		}
	}
	
  /**
   * find nearest Kaufland store based on location (GPS)
   */
	loadNmatchKauflandStores() {
		//lade alle Stores von Kaufland
		
		if (!this.positionFromStorageExist()) {
			fetch('https://www.vergleichdiscounter.de/Stores/kaufland_stores.json')//production
	  			.then(response => response.json())
			 	.then(result => {
			 		this.stores = result;
					//lese die Client-Position
					if (navigator.geolocation)  {
						navigator.geolocation.getCurrentPosition(this.matchingStoresNPosition);
					}
			 	})
		} else {
			fetch('https://www.vergleichdiscounter.de/Stores/kaufland_stores.json')//production
  			.then(response => response.json())
		 	.then(result => {
        this.stores = result;
				//lese die Client-Position
		 		this.matchingStoresNPosition(null);
		 	})
		}
	}

  /**
   * 
   * @param pos get all Kauflandstores in distance of 30 km
   */
  matchingStoresNPosition (pos:any | null) {
		//setze pos in storage
		
		if (pos != null) {	
			pos = pos.coords;
		} else {
			this.coords = JSON.parse(localStorage.getItem("storePos")||"");
			pos = {latitude:this.coords.latitude, longitude:this.coords.longitude}
		}

		//Finde ein Match
	  let dis = -1;
		let i = -1;
		this.nextStores = [];
    var currentDis = -1;
 		this.stores.forEach((item, index, array) =>{
 			if (i == null || dis == null) {
 				i = index;
 				dis = this.distance(pos.latitude, pos.longitude, item.lat, item.lng, "K");
 				
 				
 			} else {
 				currentDis = this.distance(pos.latitude, pos.longitude, item.lat, item.lng, "K"); 
 				if (currentDis < dis) {
 					i = index;
 	 				dis = currentDis; 
 				}
 			}
 			
 			let tmp_dis = this.distance(pos.latitude, pos.longitude, item.lat, item.lng, "K");
 			if (tmp_dis < 30) {//30 KM
        this.nextStores.push(index);
			}
 		});
 	
    this.nextStores.forEach ((item, index, array) => {
	 		/**
        * n = id
        * cn = Ortsname der Kaufglandfiliale
        */
      
      if (i != item) {
			  console.log(`Mögliche Kauflandfiliale mit der ID: ${this.stores[item].n}, befindet sich in ${this.stores[item].cn}`);
        this.kauflandstores.push(new Kauflandstores(this.stores[item].n, this.stores[item].cn));
      }	
 		});
	}

  /**
   * search for products with keyword
   */
  searchForProducts() {
    this.service_search.getSearchResults(
      globals.account.prototype.id, 
      this.searchterm, 
      this.getMode(), 
      this.filterPnp.discounterfilter.categorie, 
      this.getDiscounter(), 
      this.filterPnp.searchfilter.search_result_count, 
      this.getSid()).subscribe((datas) => {
        
        if (datas.iserror == true) {
          console.log(`Polardreams Error - fetch-curent-offers-service: ${datas.error}`);
        } else {
          console.log(`Polardreams main-screen - fetch-curent-offers done`);
          let arr:Product[] = [];
          this.productlist = [];
          this.temp_datas = datas.list;
          datas.list.forEach((item, index, array) => {
            if (index <= this.filterPnp.searchfilter.search_result_count) {
              this.productlist.push(item);
            }
          });
          this.updateProductList();
        }
    });
    
  }

  /**
   * filterPnp.searchfilter.allweeks = 1
   * filterPnp.searchfilter.currentweeks = 0
   * @returns 
   */
  getMode():number {
    if (this.filterPnp.searchfilter.allweeks==true) {
      return 1;
    } else {
      if (this.filterPnp.searchfilter.currentweeks==true) {
        return 0;
      } else {
       console.error("Polardreams[getMode]: Der Mode konnte nicht eindeutig indetifizeirt werden."); 
       return -1;//error code
      }  
    }
  }

  /**
   * 
   * @returns array of selected discounter
   */
  getDiscounter():string {

    var arr = [];
    if (this.filterPnp.discounterfilter.discount_aldin) arr.push(Discounter.AldiN);
    if (this.filterPnp.discounterfilter.discount_aldis) arr.push(Discounter.AldiS);
    if (this.filterPnp.discounterfilter.discount_rewe) arr.push(Discounter.Rewe);
    if (this.filterPnp.discounterfilter.discount_lidl) arr.push(Discounter.Lidl);
    if (this.filterPnp.discounterfilter.discount_kaufland) arr.push(Discounter.Kaufland);

    return arr.join(',');
  }

  /**
   * 
   * @returns get current Kauflandstore
   */
  getSid():string|null {

    if (this.filterPnp.discounterfilter.discount_kaufland && this.filterPnp.discounterfilter.discount_kaufland_storeid!="") 
    return this.filterPnp.discounterfilter.discount_kaufland_storeid;
    else return null;
  }

}

/**
 * Enumeration of 
 * all Companies in WebApp
 */
enum Discounter {
  Lidl=1, 
  Rewe=2,
  Kaufland=3, 
  AldiN=4,
  AldiS=5
}