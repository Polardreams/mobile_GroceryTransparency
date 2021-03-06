import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alllists } from '../_models/alllists';
import { Favorits } from '../_models/favorits';
import { GT_Response_Resonse } from '../_models/Response';
import * as globals from '../../global';

/**
 * Service wich handle Favorits
 *  add Products to Favorits
 *  remove Products from Favorits
 * 
 * with an Observable this Service generate a Callback to 
 * to give the executing instance a response from backend
 * The Callback pass Alllists
 * 
 * During updating something both save in localStorage and Model
 */

@Injectable({
  providedIn: 'root'
})
export class ManagingFavoritsService {
  private http!:HttpClient;
  private alllists:Alllists = new Alllists();
  private subject = new Subject<Alllists>();
  private responseCount:number = 0;


  constructor(private _http:HttpClient) { 
    this.http = _http;
  }

  iniSessionNModel (alllists:Alllists) {
    if (localStorage.getItem("alllists")==null) {
      localStorage.setItem("alllists", JSON.stringify(new Alllists()));
    }
    this.alllists = alllists;
  }

  getAllLists() {
    return this.subject.asObservable();
  }


  setAlllist(param:Alllists) {
    this.alllists = param;
  }

  get_Alllists():Alllists {
    return this.alllists;
  }
  
  updateShoppingListsIntoSession() {
    if (localStorage.getItem("alllists")!=null) {
      localStorage.removeItem("alllists");
      localStorage.setItem("alllists", JSON.stringify(this.alllists));
    } else {
      console.error(`Polardreams [updateShoppingListIntoSession]- error: session.getItem ist null`);
      this.iniSessionNModel(this.alllists);
      console.log(`Polardreams [updateShoppingListIntoSession]: eine neue alllists wurde erstellt`);
    }
    this.subject.next(this.alllists);
  }

  /**
   * 
   * @param pid productid = grocery.id
   * add Product to Favorits table
   * need following params
   *  id = account id
   *  0=addFavorits
   *  gid = pid 
   * executing updateShoppingListsIntoSession()
   */

  addProductToFavorits (pid:number) {
    this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateFavorits.php?id="+globals.account.prototype.id+"&func=0&gid="+pid).subscribe((response) => {
      if (!response.iserror) {
        console.log(`Polardreams [Server]: ${response.response}`);
        this.alllists.Fav.push(new Favorits(globals.account.prototype.id, pid));
        this.subject.next(this.alllists);
        this.updateShoppingListsIntoSession();
      } else {
        console.error(`Polardreams [Server-Error]: ${response.error}`);
      }
    });
  }
  /**
   * 
   * @param pid productid = grocery.id
   * remove Product to Favorits table
   * need following params
   *  id = account id
   *    1=removefromfavorits
   *    gid = pid
   * executing updateShoppingListsIntoSession()
   */
  removeProductfromFavorits (pid:number) {
    this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateFavorits.php?id="+globals.account.prototype.id+"&func=1&gid="+pid).subscribe((response) => {
      var tmp;
      if (!response.iserror) {
        tmp = this.alllists.Fav.filter((item) => {
          return (item.grocerie!=pid)? item : null;
        });
        this.alllists.Fav = tmp;
        this.subject.next(this.alllists);
        this.updateShoppingListsIntoSession();
      } else {
        console.error(`Polardreams [Server-Error]: ${response.error}`);
      }
    });
  }

}
