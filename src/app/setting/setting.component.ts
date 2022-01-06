import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FilterNpolicy } from '../_models/filter-npolicy';
import * as globals from '../../global';
import { ManagingFiltersNPolicyService } from '../_Services/managing-filters-npolicy.service';
import { Kauflandstores } from '../_models/kauflandstores';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements AfterViewInit {
  privacyTextflag:boolean = false;
  filterPnp:FilterNpolicy = new FilterNpolicy();
  http!:HttpClient;
  service_managingFilterNPolicy!:ManagingFiltersNPolicyService;

  coords = {latitude: 0, longitude: 0};
  kauflandstores:Kauflandstores[] = [];
  stores:any[] = [];
  nextStores:number[] = [];
  kauflandID:number = -1;

  constructor(_http:HttpClient, private _serviceManagingFilterNPolicy:ManagingFiltersNPolicyService) { 
    this.http = _http;
    this.service_managingFilterNPolicy = _serviceManagingFilterNPolicy;
    this.service_managingFilterNPolicy = _serviceManagingFilterNPolicy;
    this.service_managingFilterNPolicy.fetchNwriteFilterNPolicyintoSession(globals.account.prototype.id);
  }
  
  ngAfterViewInit(): void {
    this.service_managingFilterNPolicy.getFiltersNPolicy().subscribe((fpnp) => {
      this.filterPnp = fpnp;
      if (this.filterPnp.permissionNpolicy.localisation) {
        this.checkNUpdateGpsPermission();
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
 * set all permissions and policy true 
 * and save thios into localStorage and database
 */
  acceptAllTerms () {
    this.filterPnp.permissionNpolicy.camera = true;
    this.filterPnp.permissionNpolicy.localisation = true;
    this.filterPnp.permissionNpolicy.storage = true;
    this.filterPnp.permissionNpolicy.policy = true;
    this.checkNUpdateGpsPermission();
    this.saveFilterNPolicyintoSessionNDB();
  }

  /**
   * post policy into localStorage and database
   */
   saveFilterNPolicyintoSessionNDB() {   

      var temp = null; 
      temp = document.getElementById("allweeks") as HTMLInputElement;
      if (temp.checked) this.filterPnp.searchfilter.allweeks=true; else this.filterPnp.searchfilter.allweeks=false;
      temp = document.getElementById("currentweeks") as HTMLInputElement;
      if (temp.checked) this.filterPnp.searchfilter.currentweeks=true; else this.filterPnp.searchfilter.currentweeks=false;

      if (this.filterPnp.permissionNpolicy.localisation) {
        this.checkNUpdateGpsPermission();
      }
      this.service_managingFilterNPolicy.writeFilterNPolicyintoSession(this.filterPnp);
      this.service_managingFilterNPolicy.readNpostFilterintoDB(globals.account.prototype.id);
      this.service_managingFilterNPolicy.readNpostPolicyintoDB(globals.account.prototype.id);

      document.getElementById('collapsePnP')?.setAttribute("class", "accordion-collapse collapse");
      document.getElementById('collapseDiscounter')?.setAttribute("class", "accordion-collapse collapse");
      document.getElementById('collapseSearch')?.setAttribute("class", "accordion-collapse collapse");
      
  }

  /**
   * send request to browser navigator API
   * browser will ask for permission
   */
   checkNUpdateGpsPermission () {
    navigator.geolocation.getCurrentPosition(
      () => {
        this.updateGpsPosition();
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
      if (!(temp.latitude==pos.coords.latitude && temp.longitude==pos.coords.longitude)) {
        localStorage.setItem("storePos", JSON.stringify({latitude: pos.coords.latitude, longitude: pos.coords.longitude}));
      }
      this.loadNmatchKauflandStores();
    });
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


}
