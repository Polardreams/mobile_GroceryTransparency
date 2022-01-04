import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Companiepictures } from '../companiepictures';
import { Alllists } from '../_models/alllists';
import { Product } from '../_models/Product';
import { ShoppingListProducts } from '../_models/shopping-list';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';
import { ManagingShoppinglistService } from '../_Services/managing-shoppinglist.service';
import * as globals from '../../global';

/**
 * ParentComponent contain:
 *  none 
 * 
 * Main Features are:
 *  show shoppinglist with all listed products
 *  set amount for every product
 *  set check for every product (check mean mark for bought)
 *  navigate to favorits or ShoppingLIst to add Products
 *  remove Products from ShoppingLIst
 * 
 * Dataflow:
 *  Component between following Services:
 *    FetchAllListsService
 *    ManagingShoppinglistService
 * 
 *  Parent between Child
 *    none
 * 
 * Hooks
 *  life cycles:
 *    - constructor 
 *    - AfterViewInit
 *    - OnDestroy
 */

@Component({
  selector: 'app-shoppinglist-details',
  templateUrl: './shoppinglist-details.component.html',
  styleUrls: ['./shoppinglist-details.component.css']
})
export class ShoppinglistDetailsComponent implements AfterViewInit, OnDestroy {

  alllists!:Alllists;
  service_fetchalllists:FetchAllListsService;
  service_ManageingShoppinglist:ManagingShoppinglistService;
  router!:Router;
  id!:number;
  products!:ShoppingListProducts[];
  customText:string="";

  /**
   * register: 
   * @param _service_fetchalllists FetchAllListsService
   * @param _service_ManageingShoppinglist ManagingShoppinglistService
   * @param _router Router
   * 
   * fetch and write Allists into localStorage
   */
  constructor(_service_fetchalllists:FetchAllListsService, _service_ManageingShoppinglist:ManagingShoppinglistService, _router:Router) { 
    this.service_fetchalllists = _service_fetchalllists;
    this.service_fetchalllists.fetchNwriteintoSession(globals.account.prototype.id);
    this.service_ManageingShoppinglist = _service_ManageingShoppinglist;
    this.router = _router;
  }
/**
 * set Alllists after close this Component
 * and 
 * postr Check and Amount changes into database
 */
  
  ngOnDestroy(): void {
      this.service_ManageingShoppinglist.setAlllist(this.alllists);//ist das an der Stelle sinnvoll??? Weil der Service stirbt auch mit der Componente. Er wird auch nicht weitergereicht durch das ParentComponent
      this.service_ManageingShoppinglist.postShoppingListCheckNAmountIntoDB(this.id);
  }

  /**
   * select first entry in pic_url 
   * @param pic_url pic_url from products
   * @returns first pic_url
   */
  selectFirstPicturefromPucURL(pic_url:string):string {
    let pic_url_arr:any = [];
    if (pic_url.split(',').length>1) {
      pic_url.split(',').forEach((item) => {
        pic_url_arr.push(item.slice(0, item.indexOf(' ')));//aus zeitgründen immer für das erste Element entscheiden. eigentlich müsste eine Prüfung erfolgen.
      });
    } else {
      pic_url_arr.push(pic_url);
    }

    return pic_url_arr[0];
  }

  /**
   * fetch alllists as Observable
   * pass user id
   * get product informations
   */
  ngAfterViewInit(): void {
    this.service_fetchalllists.getAlllists().subscribe((datas) => {
      this.alllists = datas;
      this.service_ManageingShoppinglist.setAlllist(this.alllists);
      this.service_ManageingShoppinglist.setAlllist(this.alllists);
      this.id = history.state.data;
      
      this.alllists.Shop.filter((item) => {
        if (item.id == this.id) {
          this.products = item.products;
        }
      });
    });
  }

  /**
   * get companie icon
   * @param cid companie id
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
   * navigate back to shoppinglist-screen
   */ 
  goBack (){
    this.router.navigate(["shoppinglist"]);
  }

  /**
   * remove selected products from shoppinglistz
   */
  deleteSelectedProducts() {
    this.service_ManageingShoppinglist.removeShoppingListProductsfromSessionNDB(this.id);
    
    this.alllists.Shop.forEach((element) => {
      if (element.id == this.id) {
        this.products = element.products;
      }
    });
  }

  addCustomEntry(note:string) {
    this.service_ManageingShoppinglist.addCustomEntryToShoppingList(this.id, note);

    this.alllists.Shop.forEach((element) => {
      if (element.id == this.id) {
        this.products = element.products;
      }
    });
  }

}
