import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Alllists } from '../_models/alllists';
import { Shoppinglist } from '../_models/shoppinglists';
import { ManagingFavoritsService } from '../_Services/managing-favorits.service';
import { ManagingShoppinglistService } from '../_Services/managing-shoppinglist.service';

/**
 * ParentComponent contain:
 *  none 
 * 
 * Main Features are:
 *  add Favorit to ShippignList
 *  remove Favorit from favorits
 *  (future plan share Favorit)
 * 
 * Dataflow:
 *  Component between following Services:
 *    ManagingShoppinglistService
 * 
 *  Parent between Child
 *    none
 * 
 * Hooks
 *  life cycles:
 *    - constructor 
 *    - AfterViewInit
 *    -OnChanges
 */

@Component({
  selector: 'app-submenu-cardforfavorits',
  templateUrl: './submenu-cardforfavorits.component.html',
  styleUrls: ['./submenu-cardforfavorits.component.css']
})
export class SubmenuCardforfavoritsComponent implements AfterViewInit, OnChanges {
  @Input() id!:number;
  @Input() alllists!:Alllists;
  @Input() service_Favorits!:ManagingFavoritsService;

  service!:ManagingShoppinglistService;
  shoppinglists:Shoppinglist[] = [];

  /**
   * register:
   * @param _service ManagingShoppinglistService
   */
  constructor( _service:ManagingShoppinglistService) { 
    this.service = _service;
  }

  /**
   * 
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.shoppinglists = this.alllists.Shop;//kann das funktioneren???
  }

    /**
   * set individual id for Submenu-button
   */
  ngAfterViewInit(): void {
    document.getElementById('btn')?.setAttribute('data-bs-target', '#target'+this.id);
    document.getElementById('btn')?.setAttribute('id', 'btn'+this.id);
    
    document.getElementById('target')?.setAttribute('id', 'target'+this.id);

    document.getElementById("addShop")?.setAttribute("id", "addShop"+this.id);
    document.getElementById("addShop"+this.id)?.setAttribute("data-bs-target", "#modal"+this.id);
    document.getElementById("modal")?.setAttribute("id", "modal"+this.id);
  }

  /**
   * remove Favorit from Favorits
   */
  removeProductFromFavoris () {
    this.service_Favorits.removeProductfromFavorits(this.id);
    this.service_Favorits.getAllLists().subscribe((datas) => {
      this.alllists = datas;
    });

  }
  
  /**
   * add Favorit to ShoppingList
   * @param sid shoppingList id
   */
  addProductToShoppingList(sid:number) {
    this.service.setAlllist(this.alllists);
    this.service.addProductToShoppingList(sid, this.id);
  }

}
