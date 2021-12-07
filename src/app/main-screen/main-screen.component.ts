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

  

  constructor(private _service:FetchCurrentOffersService, private _serviceManagingFilterNPolicy:ManagingFiltersNPolicyService, _service_search:FetchSearchResultsService, _service_alllists:FetchAllListsService) { 
    this.service_managingFilterNPolicy = _serviceManagingFilterNPolicy;
    this.service_managingFilterNPolicy.fetchNwriteFilterNPolicyintoSession(1);
    this.service = _service;
    this.service_search = _service_search;
    this.service_alllists = _service_alllists;
    this.service_alllists.fetchNwriteintoSession(1);
  }

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

  resetProductList() {
    this.productlist = [];
    this.temp_datas.forEach((item, index, array) => {
        this.productlist.push(item);
    });
  }

  sort_price_asc () {
    var temp = this.productlist;
    temp.sort((a:Product, b:Product) => a.new_price - b.new_price);
    this.productlist = [];
    temp.forEach((item, index, array) => {
      this.productlist.push(item);
    });
  }
  sort_price_desc () {
    var temp = this.productlist;
    temp.sort((a:Product, b:Product) => a.new_price + b.new_price);
    this.productlist = [];
    temp.forEach((item, index, array) => {
      this.productlist.push(item);
    });
  }
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

  setproductLimit () {
    var temp = this.productlist;
    this.productlist = [];
    temp.forEach((item, index, arr) => {
      if (index <= this.filterPnp.searchfilter.search_result_count) {
        this.productlist.push(item);
      }
    });
  }

  ngAfterViewInit(): void {
   this.service_managingFilterNPolicy.getFiltersNPolicy().subscribe((fpnp) => {
   this.filterPnp = fpnp;
   this.getcurrentProducts(this.filterPnp.discounterfilter.discount_kaufland_storeid);
   
   this.service_alllists.getAlllists().subscribe((datas) => {
    this.alllists = datas;
   });
   });

   setTimeout(() => {
    if (!this.filterPnp.permissionNpolicy.policy) { 
      //let modal = new bootstrap.Modal(document.getElementById("pnpModal") as HTMLInputElement);
      //modal.show();
    } else {
      if (this.filterPnp.permissionNpolicy.localisation) {
        this.checkNUpdateGpsPermission();
      }
    }
   }, 2000);
  }

 
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

  saveFilterNPolicyintoSessionNDB() {
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
    this.service_managingFilterNPolicy.updatePermissionNpolicyintoSession();
    this.service_managingFilterNPolicy.readNpostFilterintoDB(1);
    this.service_managingFilterNPolicy.readNpostPolicyintoDB(1);
  }

  acceptAllTerms () {
    this.filterPnp.permissionNpolicy.camera = true;
    this.filterPnp.permissionNpolicy.localisation = true;
    this.filterPnp.permissionNpolicy.storage = true;
    this.filterPnp.permissionNpolicy.policy = true;
    this.updateProductList();
    this.checkNUpdateGpsPermission();
    this.saveFilterNPolicyintoSessionNDB();
  }

  checkNUpdateGpsPermission () {
      navigator.geolocation.getCurrentPosition(
        () => {
          this.updateGpsPosition()
        }, 
        () => {
          console.error("Polardreams [error]: navigator.geolocation hat ein Problem festgestellt. Es gibt keine GPS-Freigabe.");
        });      
  }

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

  clickPrivacyText() {
    this.privacyTextflag = !this.privacyTextflag;
  }

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

  searchForProducts() {
    this.service_search.getSearchResults(
      1, 
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

  getDiscounter():string {

    var arr = [];
    if (this.filterPnp.discounterfilter.discount_aldin) arr.push(Discounter.AldiN);
    if (this.filterPnp.discounterfilter.discount_aldis) arr.push(Discounter.AldiS);
    if (this.filterPnp.discounterfilter.discount_rewe) arr.push(Discounter.Rewe);
    if (this.filterPnp.discounterfilter.discount_lidl) arr.push(Discounter.Lidl);
    if (this.filterPnp.discounterfilter.discount_kaufland) arr.push(Discounter.Kaufland);

    return arr.join(',');
  }

  getSid():string|null {

    if (this.filterPnp.discounterfilter.discount_kaufland && this.filterPnp.discounterfilter.discount_kaufland_storeid!="") 
    return this.filterPnp.discounterfilter.discount_kaufland_storeid;
    else return null;
  }

}

enum Discounter {
  Lidl=1, 
  Rewe=2,
  Kaufland=3, 
  AldiN=4,
  AldiS=5
}