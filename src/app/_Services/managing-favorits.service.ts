import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alllists } from '../_models/alllists';
import { Favorits } from '../_models/favorits';
import { GT_Response_Resonse } from '../_models/Response';

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

  addProductToFavorits (pid:number) {
    this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateFavorits.php?id="+1+"&func=0&gid="+pid).subscribe((response) => {
      if (!response.iserror) {
        console.log(`Polardreams [Server]: ${response.response}`);
        this.alllists.Fav.push(new Favorits(1, pid));
        this.subject.next(this.alllists);
        this.updateShoppingListsIntoSession();
      } else {
        console.error(`Polardreams [Server-Error]: ${response.error}`);
      }
    });
  }

  removeProductfromFavorits (pid:number) {
    this.http.get<GT_Response_Resonse>(environment.backendUrl+"updateFavorits.php?id="+1+"&func=1&gid="+pid).subscribe((response) => {
      var tmp;
      if (!response.iserror) {
        tmp = this.alllists.Fav.filter((item) => {
          return (item.grocerie!=pid)? item : null;
        });
        this.alllists.Fav = tmp;
        this.updateShoppingListsIntoSession();
      } else {
        console.error(`Polardreams [Server-Error]: ${response.error}`);
      }
    });
  }

}
