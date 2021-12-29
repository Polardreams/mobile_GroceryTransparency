import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Alllists } from '../_models/alllists';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingListProducts } from '../_models/shopping-list';
import { GT_Response_Resonse, GT_Response_ShoppingList, GT_Response_ShoppingListAddToProducts } from '../_models/Response';
import * as globals from '../../global';

/**
 * Service wich handle all ShoppingList functions
 * use Observable to make a Callback for executing instance
 * Observable pass Alllists
 * 
 * param func:
 * 0 = add
 * 1 = remove
 * 2 = rename
 * 3 = addProduct
 * 4 = removeProduct
 * 5 = setAmtount
 * 6 = checkProduct
 */
 

@Injectable({
  providedIn: 'root'
})

export class ManagingShoppinglistService {
  private http!:HttpClient;
  private alllists:Alllists = new Alllists();
  private subject = new Subject<Alllists>();
  private responseCount:number = 0;


  constructor(private _http:HttpClient) { 
    this.http = _http;
  }

  /**
   * 
   * @param alllists alllists is tag for localStorage
   */
  iniSessionNModel (alllists:Alllists) {
    if (localStorage.getItem("alllists")==null) {
      localStorage.setItem("alllists", JSON.stringify(new Alllists()));
    }
    this.alllists = alllists;
  }

    /**
   * part of Observable Callback
   * @returns Alllists
   */
  getAllLists() {
    return this.subject.asObservable();
  }

  /**
   * set Alllists in Service from 
   * @param param Alllists
   */
  setAlllist(param:Alllists) {
    this.alllists = param;
  }
  
  /**
   * write Allliste from Model into localStorage
   */

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
   * post ShoppingList Name into DB and execute updateShoppingListsIntoSession()
   * @param id account id
   */

  postShoppingListNameintoDB (id:number) {
    var temp = this.alllists.Shop.filter((datas) => {
      return (datas.id==id)? datas: null;
    });
    if (temp.length<=1) {
      this.updateShoppingListsIntoSession();
      this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateShoppingList.php?id="+globals.account.prototype.id+"&func=2&shlid="+id+"&name="+temp[0].name).subscribe((data) => {
        console.log(`Polardreams [server]: ${JSON.stringify(data)}`);
      });
    } else {
      console.error('Polardreams [postShoppingListNameintoDB]: alllists Elemente sind nicht eindeutig. Doppelte ShoppingList-ID');
    }
  }

  /**
   * remove ShoppingList from DB and localStorage
   * before removing ShoppingList, there must be delete all Products from ShoppingList
   * @param id account id
   * 
   * execute updateShoppingListsIntoSession() in sub function
   */
  removeShoppingListfromDBNSession(id:number) {
    this.removeAllProductsFromShoppingList(id);
  }

  /**
   * delete all Products from products (table) and Model
   * -> remove all ShoppingList-products from ShoppingList
   * 
   * execute updateShoppingListsIntoSession after delete 
   * @param id account id
   */
  private removeAllProductsFromShoppingList(id:number) {
    var shoppinglist = this.alllists.Shop.filter((datas) => {
      if (datas.id ==  id) {
        this.responseCount = 0;
        if (datas.products.length>0) {
          datas.products.forEach((item, index, arr) => {
            this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateShoppingList.php?id="+globals.account.prototype.id+"&func=4&pid="+item.id).subscribe((data) => {
              this.responseCount++;
              console.log(`Polardreams [server]: ${JSON.stringify(data)} | Antwort: ${this.responseCount} von ${datas.products.length}`);
              if (this.responseCount==datas.products.length) {
                datas.products = [];                
                this.removeShoppingListFromDB(id);
              }
            });
          });
        } else {
          this.removeShoppingListFromDB(id);
        }
      }
      return datas;
    });
    this.alllists.Shop = shoppinglist;
    this.updateShoppingListsIntoSession();
  }

  /**
   * remove shoppinglist from db
   * @param id shoppinglist id
   * 
   * execute updateShoppingListsIntoSession()
   */

  removeShoppingListFromDB(id:number) {
    this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateShoppingList.php?id="+globals.account.prototype.id+"&func=1&shlid="+id).subscribe((data) => {
      console.log(`Polardreams [server]: ${JSON.stringify(data)}`);
          var temp = this.alllists.Shop.filter((datas) => {
      return datas.id != id;
    });
    this.alllists.Shop = temp;
    this.updateShoppingListsIntoSession();
    });
  }
/**
 * create ShoppingList in DB and add them to Model
 * 
 * execute updateShoppingListsIntoSession()
 */
  createShoppingListintoDBNSession () {
    this.http.get<GT_Response_ShoppingList>(environment.backendUrl+"updateShoppingList.php?id="+globals.account.prototype.id+'&func=0&name=meine Einkaufsliste').subscribe((data) => {
      console.log(`Polardreams [server]: ${JSON.stringify(data)}`);
      data.responseShoppinglist.products = [];
      this.alllists.Shop.push(data.responseShoppinglist);
      this.updateShoppingListsIntoSession();
    });
  }

  /**
   * copy ShoppingList into db and Model
   * @param id shoppingLIst id
   * 
   * execute updateShoppingListsIntoSession() in subfunction
   */
  copyShoppingListintoDBNSession (id:number) {
    var temp = this.alllists.Shop.filter((shoppinglist) => {
      return (shoppinglist.id==id)? shoppinglist:null;
    });
    if (temp.length<=1) {
      this.http.get<GT_Response_ShoppingList>(environment.backendUrl+"updateShoppingList.php?id="+globals.account.prototype.id+'&func=0&name='+temp[0].name).subscribe((data) => {
        console.log(`Polardreams [server]: ${JSON.stringify(data)}`);
        data.responseShoppinglist.products = [];
        let resCount = temp[0].products.length;
        let n = 0;
        temp[0].products.forEach(products => {
          this.copyProductToShoppingList(data.responseShoppinglist.id, products.groceryid).subscribe((res) => {
            n++;
            res.responseShoppinglist.ischeck = products.ischeck;
            res.responseShoppinglist.amount = products.amount;
            data.responseShoppinglist.products.push(res.responseShoppinglist);
            if (resCount==n) {
              this.alllists.Shop.push(data.responseShoppinglist);
              this.postShoppingListCheckNAmountIntoDB(data.responseShoppinglist.id);
            }
          });
        });
      });
  
    } else {
      console.error(`Polardreams [copyShoppingListintoDBNSession]: ShoppingList ID ist nicht eindeutig. ${JSON.stringify(temp)}`);
    }
  }
  
  /**
   add Product to  productids
   * @param id shoppinglist id
   * @param pid is product id (pid = gid)
   * @returns 
   */
  copyProductToShoppingList(id:number, pid:number) {
    return this.http.get<GT_Response_ShoppingListAddToProducts>(environment.backendUrl+"updateShoppingList.php?id="+globals.account.prototype.id+"&func=3&shlid="+id+"&gid="+pid);
  }

  /**
   * add Prodict to shoppingList
   * @param id shoppingList id
   * @param pid product id (pid = gid)
   * 
   * execute updateShoppingListsIntoSession()
   */
  addProductToShoppingList(id:number, pid:number) {
    
    this.http.get<GT_Response_ShoppingListAddToProducts>(environment.backendUrl+"updateShoppingList.php?id="+globals.account.prototype.id+"&func=3&shlid="+id+"&gid="+pid).subscribe((data) => {
      console.log(`Polardreams [server]: ${JSON.stringify(data)}`);
      
      this.alllists.Shop.filter((list) => {
      
        if (id == list.id) {
          var temp = new ShoppingListProducts();
          temp.groceryid = pid;
          temp.shoppingid = data.responseShoppinglist.shoppingid;
          list.products.push(temp); 
        }
      });
       
      this.updateShoppingListsIntoSession();
    });
  }

/**
 * update all datas Check and Amount 
 * first save Model into localStiorage
 * secound post Model into db
 
hint: * execute updateShoppingListsIntoSession(); before executing script
 * @param id shoppinglist id
 */

  postShoppingListCheckNAmountIntoDB(id:number) {
    this.updateShoppingListsIntoSession();// was soll das hier???
    var temp = this.alllists.Shop.filter((lists) => {
      return (lists.id == id)? lists:null;
    });
    if (temp.length==1) {
      temp[0].products.forEach((item, index, arr) => {
        this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateShoppingList.php?id="+globals.account.prototype.id+"&func=5&pid="+item.id+"&amount="+item.amount).subscribe((datas) => {
          console.log(`Polardreams [server]: ${JSON.stringify(datas)}`);
        });
        this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateShoppingList.php?id="+globals.account.prototype.id+"&func=6&pid="+item.id+"&ischeck="+this.convertBoolToTinyint(item.ischeck)).subscribe((datas) => {
          console.log(`Polardreams [server]: ${JSON.stringify(datas)}`);
        });
      });
    } else {
      console.error(`Polardreams[postShoppingListCheckNAmountIntoDB]: alllists ID sind nicht eindeutig oder nicht vorhanden.`);
    }
  }

  /**
   * remove single Productentry from ShoppingList Database and localStorage
   * @param id shoppingList id
   * 
   * executing updateShoppingListsIntoSession()
   */
  removeShoppingListProductsfromSessionNDB(id:number) {

    var temp = this.alllists.Shop.filter((lists) => {
      return (lists.id == id)? lists:null;
    });

    if (temp.length==1) {
      temp[0].products.filter((item) => {
        
        if (item.ischeck) {
          this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateShoppingList.php?id="+globals.account.prototype.id+"&func=4&pid="+item.id).subscribe((datas) => {
            console.log(`Polardreams [server]: ${JSON.stringify(datas)}`);
          });
          return null;
        }   
        return item;
      });

      var new_temp = temp[0].products.filter((item) => {
        
        if (item.ischeck) {
          return null;
        }   
        return item;
      });
      
      this.alllists.Shop.filter((lists) => {
        if (lists.id == id) {
          lists.products = new_temp;
        }
        return lists;
      });
      
      this.updateShoppingListsIntoSession();

    } else {
      console.error(`Polardreams[postShoppingListCheckNAmountIntoDB]: alllists ID sind nicht eindeutig oder nicht vorhanden.`);
    }
  }

  /**
   * get Alllists directly as property without 
   * @returns Alllists
   */
  getTest ():Alllists {
    return this.alllists;
  }

  /**
 * convert WebApp boolean into database (mysql) tinyint
 * @param boolean
 * @returns number
 */
  convertBoolToTinyint (param:boolean) {
    if (param) {
      return 1;
    } else {
      return 0;
    }
  }
  
}
