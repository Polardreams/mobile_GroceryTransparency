import {Component, Input, IterableDiffers, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Companiepictures } from '../companiepictures';
import { Alllists } from '../_models/alllists';
import { CardContent } from '../_models/CardContent';
import { Favorits } from '../_models/favorits';
import { Product } from '../_models/Product';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';

@Component({
  selector: 'app-card-for-main',
  templateUrl: './card-for-main.component.html',
  styleUrls: ['./card-for-main.component.css']
})
export class CardForMainComponent implements OnChanges{

  @Input() _productlist!: Product[]; 
  @Input() alllists!:Alllists;

  cardcontent:CardContent[] = [];
  fav:Favorits[] = [];

  _service_getAllLists!:FetchAllListsService;
  _router!:Router;

  constructor(private _service:FetchAllListsService, private router:Router) { 
    this._service_getAllLists = _service;
    this._router = router;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchAllLists();
    this.createCards();
    
  }

  public getDetails(id:number) {
    this._router.navigate(["productdetail"], {state: {data:id}});
  }

  createCards() {
    this.cardcontent = [];
    if (this._productlist!=undefined) {
      this._productlist.forEach((item, index, arr) => {              
        let pic_url_arr:any = [];
        if (item.pic_url.split(',').length>1) {
          item.pic_url.split(',').forEach((item) => {
            pic_url_arr.push(item.slice(0, item.indexOf(' ')));//aus zeitgründen immer für das erste Element entscheiden. eigentlich müsste eine Prüfung erfolgen.
          });
        } else {
          pic_url_arr.push(item.pic_url);
        }
        
        this.cardcontent.push(new CardContent(item.id, this.checkFavStat(item.id), item.title, pic_url_arr[0], this.getComopaniePic(item.companie), item.new_price, item.companie, item.discount, item.date));
      });
    }
  }

  getComopaniePic (cid:number) {
    let path='';
    if (cid==Companiepictures.Lidl) {
      path = "../../assets/images/logos/lidl.svg";
    }
    if (cid==Companiepictures.Rewe) {
      path = "../../assets/images/logos/rewe.svg";
    }
    if (cid==Companiepictures.Kaufland) {
      path = "../../assets/images/logos/kaufland.svg";
    }
    if (cid==Companiepictures.AldiNord) {
      path = "../../assets/images/logos/aldiN.svg";
    }
    if (cid==Companiepictures.AldiSued) {
      path = "../../assets/images/logos/aldiS.svg"
    }
    return path;
  }

  checkFavStat(groceryid:number){
    
    let flag = false;
    this.fav.forEach((item, index, arr) => {
      if (item.grocerie==groceryid) {
        flag = true;
      }
    });
    return flag;

  }

  fetchAllLists() {
    
    this._service_getAllLists.getAlllists().subscribe((datas) => {
      this.fav = datas.Fav;
      this.alllists = datas;
    });
  }

  
}
  


