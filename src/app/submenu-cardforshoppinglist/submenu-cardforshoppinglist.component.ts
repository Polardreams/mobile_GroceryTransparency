import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ManagingShoppinglistService } from '../_Services/managing-shoppinglist.service';

/**
 * ParentComponent contain:
 * none
 * Main Features are:
 *  copy shoppingList
 *  delete shoppingList (include all products references (not products in table groceries themselfe))
 *  (future plan is to implement sharing function)
 *  
 * Dataflow:
 *  Component between following Services:
 * 
 *  Parent between Child
 *    none
 * 
 * Hooks
 *  life cycles:
 *    - constructor 
 *    - AfterViewInit
 */

@Component({
  selector: 'app-submenu-cardforshoppinglist',
  templateUrl: './submenu-cardforshoppinglist.component.html',
  styleUrls: ['./submenu-cardforshoppinglist.component.css']
})
export class SubmenuCardforshoppinglistComponent implements AfterViewInit {

  @Input() id!:number;
  idtarget!:string;
  idbutton!:string;
  isopen:boolean = false;
  service:ManagingShoppinglistService;

  /**
   * register:
   * @param _service ManagingShoppinglistService
   */
  constructor(_service:ManagingShoppinglistService) { 
    this.service = _service;
  }

  /**
   * set individual id for Submenu-button
   */
  ngAfterViewInit(): void {
    document.getElementById("btn")?.setAttribute("data-bs-target", "#target"+this.id);
    document.getElementById("btn")?.setAttribute("id", "btn"+this.id);
    
    document.getElementById("target")?.setAttribute("id", "target"+this.id);
  }

  /**
   * delete ShoppingList (include all productreferences)
   * @param id account id
   */
  deleteShoppingList (id:number) {
    this.closeCollpase();
    this.service.removeShoppingListfromDBNSession(id);
  }

  /**
   * copy shoppinglist (include all productreferences)
   * @param id shoppinglist id
   */
  copyShoppingList(id:number) {
    this.closeCollpase();
    this.service.copyShoppingListintoDBNSession(id);
  }

  closeCollpase() {
    document.getElementById('target'+this.id)?.setAttribute("class", "collapse mt-2");
  }

}
