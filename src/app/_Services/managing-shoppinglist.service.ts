import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Alllists } from '../_models/alllists';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shoppinglist } from '../_models/shoppinglists';
import { ShoppingListProducts } from '../_models/shopping-list';
import { GT_Response_Resonse, GT_Response_ShoppingList, GT_Response_ShoppingListAddToProducts } from '../_models/Response';
import { FetchAllListsService } from './fetch-all-lists.service';
import { Product } from '../_models/Product';



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

  postShoppingListNameintoDB (id:number) {
    var temp = this.alllists.Shop.filter((datas) => {
      return (datas.id==id)? datas: null;
    });
    if (temp.length<=1) {
      this.updateShoppingListsIntoSession();
      this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateShoppingList.php?id="+1+"&func=2&shlid="+id+"&name="+temp[0].name).subscribe((data) => {
        console.log(`Polardreams [server]: ${JSON.stringify(data)}`);
      });
    } else {
      console.error('Polardreams [postShoppingListNameintoDB]: alllists Elemente sind nicht eindeutig. Doppelte ShoppingList-ID');
    }
  }

  removeShoppingListfromDBNSession(id:number) {
    this.removeAllProductsFromShoppingList(id);
  }

  private removeAllProductsFromShoppingList(id:number) {
    var shoppinglist = this.alllists.Shop.filter((datas) => {
      if (datas.id ==  id) {
        this.responseCount = 0;
        if (datas.products.length>0) {
          datas.products.forEach((item, index, arr) => {
            this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateShoppingList.php?id="+1+"&func=4&pid="+item.id).subscribe((data) => {
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

  removeShoppingListFromDB(id:number) {
    this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateShoppingList.php?id="+1+"&func=1&shlid="+id).subscribe((data) => {
      console.log(`Polardreams [server]: ${JSON.stringify(data)}`);
          var temp = this.alllists.Shop.filter((datas) => {
      return datas.id != id;
    });
    this.alllists.Shop = temp;
    this.updateShoppingListsIntoSession();
    });
  }

  createShoppingListintoDBNSession () {
    this.http.get<GT_Response_ShoppingList>(environment.backendUrl+"updateShoppingList.php?id="+1+'&func=0&name=meine Einkaufsliste').subscribe((data) => {
      console.log(`Polardreams [server]: ${JSON.stringify(data)}`);
      data.responseShoppinglist.products = [];
      this.alllists.Shop.push(data.responseShoppinglist);
      this.updateShoppingListsIntoSession();
    });
  }

  copyShoppingListintoDBNSession (id:number) {
    var temp = this.alllists.Shop.filter((shoppinglist) => {
      return (shoppinglist.id==id)? shoppinglist:null;
    });
    if (temp.length<=1) {
      this.http.get<GT_Response_ShoppingList>(environment.backendUrl+"updateShoppingList.php?id="+1+'&func=0&name='+temp[0].name).subscribe((data) => {
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
              console.log("test: Speicherung");
              
              this.alllists.Shop.push(data.responseShoppinglist);
              console.log("test list ID : " + data.responseShoppinglist.id);
              this.postShoppingListCheckNAmountIntoDB(data.responseShoppinglist.id);
            }
          });
        });
      });
  
    } else {
      console.error(`Polardreams [copyShoppingListintoDBNSession]: ShoppingList ID ist nicht eindeutig. ${JSON.stringify(temp)}`);
    }
  }
  
  copyProductToShoppingList(id:number, pid:number) {
    return this.http.get<GT_Response_ShoppingListAddToProducts>(environment.backendUrl+"updateShoppingList.php?id="+1+"&func=3&shlid="+id+"&gid="+pid);
  }
  addProductToShoppingList(id:number, pid:number) {
    
    this.http.get<GT_Response_ShoppingListAddToProducts>(environment.backendUrl+"updateShoppingList.php?id="+1+"&func=3&shlid="+id+"&gid="+pid).subscribe((data) => {
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

  postShoppingListCheckNAmountIntoDB(id:number) {
    this.updateShoppingListsIntoSession();
    var temp = this.alllists.Shop.filter((lists) => {
      console.log("lists before update: " + lists.id + " serach for: "+id);
      return (lists.id == id)? lists:null;
    });
    console.log("found: " + JSON.stringify(temp[0]));
    if (temp.length==1) {
      temp[0].products.forEach((item, index, arr) => {
        console.log("test post: " +item.id+" "+ item.amount+" "+item.ischeck);
        this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateShoppingList.php?id="+1+"&func=5&pid="+item.id+"&amount="+item.amount).subscribe((datas) => {
          console.log(`Polardreams [server]: ${JSON.stringify(datas)}`);
        });
        this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateShoppingList.php?id="+1+"&func=6&pid="+item.id+"&ischeck="+this.convertBoolToTinyint(item.ischeck)).subscribe((datas) => {
          console.log(`Polardreams [server]: ${JSON.stringify(datas)}`);
        });
         
      });
    } else {
      console.error(`Polardreams[postShoppingListCheckNAmountIntoDB]: alllists ID sind nicht eindeutig oder nicht vorhanden.`);
    }
  }

  removeShoppingListProductsfromSessionNDB(id:number) {

    var temp = this.alllists.Shop.filter((lists) => {
      return (lists.id == id)? lists:null;
    });

    if (temp.length==1) {
      temp[0].products.filter((item) => {
        
        if (item.ischeck) {
          this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateShoppingList.php?id="+1+"&func=4&pid="+item.id).subscribe((datas) => {
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

  getTest ():Alllists {
    return this.alllists;
  }
  
  convertBoolToTinyint (param:boolean) {
    if (param) {
      return 1;
    } else {
      return 0;
    }
  }
  
}
