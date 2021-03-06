import {Component, Input, IterableDiffers, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Companiepictures } from '../companiepictures';
import { Alllists } from '../_models/alllists';
import { CardContent } from '../_models/CardContent';
import { Favorits } from '../_models/favorits';
import { Product } from '../_models/Product';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';

/**
 * ChildComponent contain:
 * submenu card for main
 * 
 * Main Features are:
 *  display productinformation
 *  containing submenu
 * 
 * Dataflow:
 *  Component between following Services:
 *    + FetchAllListsService
 * 
 *  Parent between Child
 *    submenu card for main
 * 
 * Hooks
 *  life cycles:
 *    - constructor 
 *    - OnChanges
 */

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
  flag:boolean = false;

  
  /**
   * register Alllist Service
   * register Router
   * 
   * @param _service FetchAllListsService
   * @param router Router
   */
  constructor(private _service:FetchAllListsService, private router:Router) { 
    this._service_getAllLists = _service;
    this._router = router;
  }

  /**
   * fetch Observable if Alllists changes their value (f.e. Favorits)
   * exe createCards()
   * 
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.fetchAllLists();
    this.createCards();
  }


  /**
   * navigate to product details view
   * save id for scolling when comming back
   * @param id product id
   */
  public getDetails(id:number) {
    sessionStorage.removeItem("anchor");
    sessionStorage.setItem("anchor", JSON.stringify({id:id}))
    this._router.navigate(["productdetail"], {state: {data:id}});
  }

  /**
   * read productlist and prepare picture url
   * load products in cardcontent array
   */
  createCards() {
    this.cardcontent = [];
    if (this._productlist!=undefined) {
      this._productlist.forEach((item, index, arr) => {              
        let pic_url_arr:any = [];
        if (item.pic_url.split(',').length>1) {
          item.pic_url.split(',').forEach((item) => {
            pic_url_arr.push(item.slice(0, item.indexOf(' ')));//aus zeitgr??nden immer f??r das erste Element entscheiden. eigentlich m??sste eine Pr??fung erfolgen.
          });
        } else {
          pic_url_arr.push(item.pic_url);
        }
        
        this.cardcontent.push(new CardContent(item.id, this.checkFavStat(item.id), item.title, pic_url_arr[0], this.getComopaniePic(item.companie), item.new_price, item.companie, item.discount, item.date));
      });
    }
  }

  /**
   * load companie icons
   * @param cid  companie id
   * @returns 
   */
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

  /**
   * check if product is an Favorit of current user
   * set gold star if user has product as Favorit
   * set grey star if is not
   * @param groceryid 
   * @returns 
   */
  checkFavStat(groceryid:number){
    
    let flag = false;
    this.fav.forEach((item, index, arr) => {
      if (item.grocerie==groceryid) {
        flag = true;
      }
    });
    return flag;

  }

  /**
   * load Observable Alllist from Service
   */
  fetchAllLists() {
    this._service_getAllLists.getAlllists().subscribe((datas) => {
      this.fav = datas.Fav;
      this.alllists = datas;
    });
  }

  /**
   * make text visible when overflow hidden
   */

  showText (id:string) {
    
    this.flag=!this.flag;
    if(this.flag) {
      document.getElementById(id)?.setAttribute("class", "col-3 fs-6 overflow-visible");      
    } else {
      document.getElementById(id)?.setAttribute("class", "col-3 fs-6 overflow-hidden");
    }    
  }
  
}
  


