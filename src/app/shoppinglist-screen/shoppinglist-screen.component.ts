import { AfterViewInit, Component } from '@angular/core';
import { Alllists } from '../_models/alllists';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';
import * as globals from '../../global';

/**
 * ParentComponent contain:
 *  card for shoppinglist
 *  submenu cardforshoppinglist
 * 
 * Main Features are:
 * create shoppingList
 * rename ShoppingList
 * Copy ShoppingList
 * delete shoppingList (including deleting all products)
 * (future plan implement sharing from ShoppingLists)
 * open ShoppingListdetails
 * 
 * Dataflow:
 *  Component between following Services:
 *    FetchAllListsService
 * 
 *  Parent between Child
 *    card-for-main ([_alllists]="alllists")
 * 
 * Hooks
 *  life cycles:
 *    - constructor 
 *    - AfterViewInit
 */

@Component({
  selector: 'app-shoppinglist-screen',
  templateUrl: './shoppinglist-screen.component.html',
  styleUrls: ['./shoppinglist-screen.component.css']
})
export class ShoppinglistScreenComponent implements AfterViewInit {
  
  alllists!:Alllists;
  service_fetchalllists:FetchAllListsService;

/**
 * register:
 * @param _service_fetchalllists FetchAllListsService
 * and fetch and write Alllists into localStorage
 */

  constructor(_service_fetchalllists:FetchAllListsService) { 
    this.service_fetchalllists = _service_fetchalllists;
    this.service_fetchalllists.fetchNwriteintoSession(globals.account.prototype.id);
  }

  /**
   * get Alllists Observable
   */
  ngAfterViewInit(): void {
    this.service_fetchalllists.getAlllists().subscribe((datas) => {
      this.alllists = datas;
    });
  }


}
