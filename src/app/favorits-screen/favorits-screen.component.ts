import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Alllists } from '../_models/alllists';
import { Favorits } from '../_models/favorits';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';
import { ManagingFavoritsService } from '../_Services/managing-favorits.service';
import * as globals from '../../global';

/**
 * ParentComponent contain:
 *  cards for Favorits
 *  submenu cards for favorits
 * 
 * Main Features are:
 *  create new Favorit
 *  remove a Favorit
 *  add favorit to ShoppingList
 *  (future plan implement a share function) 
 *  get product details view
 * 
 * Dataflow:
 *  Component between following Services:
 *    ManagingFavoritsService
 *    FetchAllListsService
 * 
 *  Parent between Child
 *    cards for favorits ([favorits]="favorits" [alllists]="alllists" [service_managingFavorits]="service_managingFavorits")
 * 
 * Hooks
 *  life cycles:
 *    - constructor 
 *    - AfterViewInit
 *    - OnChanges
 */

@Component({
  selector: 'app-favorits-screen',
  templateUrl: './favorits-screen.component.html',
  styleUrls: ['./favorits-screen.component.css']
})

export class FavoritsScreenComponent implements AfterViewInit, OnChanges {
  favorits!:Favorits[];
  alllists!:Alllists;
  service_managingFavorits!:ManagingFavoritsService;
  service_fetchAllLists!:FetchAllListsService;

  /**
   * register: 
   * @param _service_managingFavorits ManagingFavoritsService
   * @param _service_fetchAllLists FetchAllListsService
   * 
   * and fetch and write Alllists into localStorage
   */
  constructor(_service_managingFavorits:ManagingFavoritsService, _service_fetchAllLists:FetchAllListsService) { 
    this.service_managingFavorits = _service_managingFavorits;
    this.service_fetchAllLists = _service_fetchAllLists;
    this.service_fetchAllLists.fetchNwriteintoSession(globals.account.prototype.id);
  }

  /**
   * get Observable when Allist has change in service
   * @param changes SimpüleChanges
   */
  ngOnChanges(changes: SimpleChanges): void {
    
    this.service_fetchAllLists.getAlllists().subscribe((datas) => {
      this.alllists = datas;
      this.alllists.Fav.forEach((items, index, arr) => {
        this.favorits = arr;
              
      });
    });
  }

  /**
   *  get Observable when Allist has change in service
   */
  ngAfterViewInit(): void {
    this.service_fetchAllLists.getAlllists().subscribe((datas) => {
      this.alllists = datas;
      this.alllists.Fav.forEach((items, index, arr) => {
        this.favorits = arr;
      });
    });
  }


}
