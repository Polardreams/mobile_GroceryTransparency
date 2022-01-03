import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GT_Response_Resonse } from '../_models/Response';
import { Alllists } from '../_models/alllists';
import { Shoppinglist } from '../_models/shoppinglists';
import { ShoppingListProducts } from '../_models/shopping-list';
import { Subject } from 'rxjs';


/**
 * Service fetch the following lists for user account:
 *  Favorits
 *  ShoppingLists with all products per ShoppingList
 */


@Injectable({
  providedIn: 'root'
})

export class FetchAllListsService {
  
  private http!:HttpClient;
  private alllists:Alllists = new Alllists();
  private subject = new Subject<Alllists>();

  constructor(private _http:HttpClient) { 
    this.http = _http;
  }

  private getAllLists(id:number) {
    return this.http.get<GT_Response_Resonse>(environment.backendUrl+"fetchingAllLists.php?id="+id);
  }

  /**
   * 
   * @param id is id from user account
   * use this function as public
   * it will fetch all Lists for user account and write them into model AND localStorgae
   * 
   * this function use a Observable to make a callback for the executing instance.
   */

  fetchNwriteintoSession(id:number) {
    this.getAllLists(id).subscribe((datas) => {
      if (datas.iserror) {
        console.error(`Polardreams [fetchNwriteintoSession]: ` + datas.error);
      } else {
        this.alllists.Fav = datas.response.Fav;
        this.alllists.Shop = [];
        
        datas.response.Shop.forEach((item, index, arr) => {
          var temp = new Shoppinglist();  
          temp.id = item.id;
          temp.name = item.name;
          temp.accountid = item.accountid;
          temp.products = [];

          item.products.forEach((item, index, arr) => {
            var tmp = new ShoppingListProducts();
            tmp.id = item.id;
            tmp.groceryid = item.groceryid;
            tmp.shoppingid = item.shoppingid;
            tmp.amount = item.amount;
            tmp.pic_url = item.pic_url;
            tmp.title = item.title;
            tmp.new_price = item.new_price;
            tmp.discount = item.discount;
            tmp.cid = item.cid;
            tmp.ischeck = this.tinyintToBool(item.ischeck);
            tmp.customentry = item.customentry;

            temp.products.push(tmp);
          });
          this.alllists.Shop.push(temp);  
        });
        
      }
      this.subject.next(this.alllists);
      
      if (localStorage.getItem("alllists")==null) {
        this.iniSessionFilterNPolicy();
      } 
      localStorage.removeItem("alllists");
      localStorage.setItem("alllists", JSON.stringify(this.alllists));  

    });
  }

  private iniSessionFilterNPolicy () {
    if (localStorage.getItem("alllists")==null) {
      this.alllists = new Alllists();
      localStorage.setItem("alllists", JSON.stringify(this.alllists));
    }
  }

  /**
   * 
   * @param int 
   * @returns boolean
   * 
   * convert mysql tinyint into typescript boolean
   */

  tinyintToBool(int:any):boolean {
    if (int==0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 
   * @returns Allists
   * it's part of Callback from fetchNwriteintoSession
   */

  getAlllists() {
    return this.subject.asObservable();
  }

}
