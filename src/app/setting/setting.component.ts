import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FilterNpolicy } from '../_models/filter-npolicy';
import * as globals from '../../global';
import { ManagingFiltersNPolicyService } from '../_Services/managing-filters-npolicy.service';

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

  constructor(_http:HttpClient, private _serviceManagingFilterNPolicy:ManagingFiltersNPolicyService) { 
    this.http = _http;
    this.service_managingFilterNPolicy = _serviceManagingFilterNPolicy;
    this.service_managingFilterNPolicy = _serviceManagingFilterNPolicy;
    this.service_managingFilterNPolicy.fetchNwriteFilterNPolicyintoSession(globals.account.prototype.id);
  }
  
  ngAfterViewInit(): void {
    this.service_managingFilterNPolicy.getFiltersNPolicy().subscribe((fpnp) => {
      this.filterPnp = fpnp;
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
      this.http.get(environment.backendUrl+"updatepnp.php?id="+globals.account.prototype.id).subscribe(() => {

    
        if (this.filterPnp.permissionNpolicy.localisation) {
          this.checkNUpdateGpsPermission();
        }
        this.service_managingFilterNPolicy.writeFilterNPolicyintoSession(this.filterPnp);
        this.service_managingFilterNPolicy.readNpostFilterintoDB(globals.account.prototype.id);
        this.service_managingFilterNPolicy.readNpostPolicyintoDB(globals.account.prototype.id);
    
      });

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
      if (!(temp.latitude==pos.coords.latitude && temp.longitude==pos.coords.longitude)) {
        localStorage.setItem("storePos", JSON.stringify({latitude: pos.coords.latitude, longitude: pos.coords.longitude}));
      }
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
  

}
