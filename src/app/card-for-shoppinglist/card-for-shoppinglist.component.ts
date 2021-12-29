import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Alllists } from '../_models/alllists';
import { Shoppinglist } from '../_models/shoppinglists';
import { ManagingShoppinglistService } from '../_Services/managing-shoppinglist.service';

/**
 * ParentComponent contain:
 * submenu card for shoppinglist
 * 
 * Main Features are:
    displaying Title of ShoppingLIst
    rename ShoppingList
    contain submenu
    open shoppinglist details
 * 
 * Dataflow:
 *  Component between following Services:
 * 
 *  Parent between Child
 *    submenu card for shoppinglist ([id]="card.id)
 * 
 * Hooks
 *  life cycles:
 *    - constructor 
 *    - OnChanges
 */

@Component({
  selector: 'app-card-for-shoppinglist',
  templateUrl: './card-for-shoppinglist.component.html',
  styleUrls: ['./card-for-shoppinglist.component.css']
})
export class CardForShoppinglistComponent implements OnChanges {

  @Input() _alllists!: Alllists;
  shoppinglists!:Shoppinglist[];
  service!:ManagingShoppinglistService;
  router!:Router;

  /**
   * register: 
   * @param _service ManagingShoppinglistService
   * @param _router Router
   */
  constructor(_service:ManagingShoppinglistService, private _router:Router) { 
    this.service = _service;
    this.router = _router;
  }
  
  /**
   * exe createcards()
   * get Alllists Observable
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.createCards();
    
    this.service.getAllLists().subscribe((datas) => {
      this._alllists = datas;
      this.createCards();
    });
  }

  /**
   * create cards with Alllists.shoppinglist
   * pass them to param shoppinglists
   */
  createCards() {
    this.service.iniSessionNModel(this._alllists);
    if (this._alllists!=undefined) {
      this.shoppinglists = this._alllists.Shop;  
    }
  }

  /**
   * rename shoppinglist
   * @param id account id
   */
  renameShoppingListNwriteIntoSession (id:number) {
    this.service.postShoppingListNameintoDB(id);
  }

  /**
   * create new shoppinglist
   */
  createShoppingList() {
    this.service.createShoppingListintoDBNSession();
  }

  /**
   * navigate to shoppinglist details and open current shoppinglist
   * @param id shoppinglist id
   */
  navigateToDetails (id:number) {
    this.router.navigate(["shoppinglist-details"], {state: {data:id}});
  }

}
