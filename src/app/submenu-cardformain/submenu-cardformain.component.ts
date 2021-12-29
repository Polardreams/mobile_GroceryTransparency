import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Alllists } from '../_models/alllists';
import { CardContent } from '../_models/CardContent';
import { Shoppinglist } from '../_models/shoppinglists';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';
import { ManagingFavoritsService } from '../_Services/managing-favorits.service';
import { ManagingFiltersNPolicyService } from '../_Services/managing-filters-npolicy.service';
import { ManagingShoppinglistService } from '../_Services/managing-shoppinglist.service';

/**
 * ChildComponent contain:
 * none
 * 
 * Main Features are:
 *  submenu functions:
 *    + add to ShoppingList
 *    + add to Favoris
 *    + (future plan is to add share function)
 * 
 * Dataflow:
 *  Component between following Services:
 *    + ManagingShoppinglistService
 *    + ManagingFavoritsService
 * 
 *  Parent between Child
 *    none
 * 
 * Hooks
 *  life cycles:
 *    - constructor 
 *    - OnChanges
 *    - AfterViewInit
 */

@Component({
  selector: 'app-submenu-cardformain',
  templateUrl: './submenu-cardformain.component.html',
  styleUrls: ['./submenu-cardformain.component.css']
})
export class SubmenuCardformainComponent implements AfterViewInit, OnChanges {

  @Input() id!:number;
  @Input() alllists!:Alllists;
  @Input() cardcontent!:CardContent[];

  idtarget!:string;
  idbutton!:string;
  service!:ManagingShoppinglistService;
  service_Favorits!:ManagingFavoritsService;
  shoppinglists:Shoppinglist[] = [];

  /**
   * register the following services:
   * @param _service ManagingShoppinglistService
   * @param _service_Favorits ManagingFavoritsService
   */
  constructor(_service:ManagingShoppinglistService, _service_Favorits:ManagingFavoritsService) { 
    this.service = _service;
    this.service_Favorits = _service_Favorits;
  }

  /**
   * get ShoppingLists
   * set Allists into Favorit-Service
   * @param changes SimpleChanges
   */

  ngOnChanges(changes: SimpleChanges): void {
    this.shoppinglists = this.alllists.Shop;//kann das funktionieren? wird hier nicht ein Observable benötigt
    this.service_Favorits.setAlllist(this.alllists);
  }

  /**
   * set individual id for Submenu-button
   */
  ngAfterViewInit(): void {
    document.getElementById("btn")?.setAttribute("id", "btn"+this.id);
    document.getElementById("btn"+this.id)?.setAttribute("data-bs-target", "#target"+this.id);
    document.getElementById("target")?.setAttribute("id", "target"+this.id);

    document.getElementById("addShop")?.setAttribute("id", "addShop"+this.id);
    document.getElementById("addShop"+this.id)?.setAttribute("data-bs-target", "#modal"+this.id);
    document.getElementById("modal")?.setAttribute("id", "modal"+this.id);
  }

  /**
   * add Product To ShoppingList
   * @param sid shoppinglist id
   */
  addProductToShoppingList(sid:number) {
    this.service.setAlllist(this.alllists);
    this.service.addProductToShoppingList(sid, this.id);
  }

  /**
   * add Product to Favorits
   */
  addProductToFavorits () {
    this.service_Favorits.addProductToFavorits(this.id);
    this.cardcontent.filter((item) => {
      if (item.id == this.id) {
        item.favflag = true;
      }
      return item;
    });
    
  }

}
