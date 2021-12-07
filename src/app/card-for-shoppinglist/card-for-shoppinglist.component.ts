import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Alllists } from '../_models/alllists';
import { Shoppinglist } from '../_models/shoppinglists';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';
import { ManagingShoppinglistService } from '../_Services/managing-shoppinglist.service';



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

  constructor(_service:ManagingShoppinglistService, private _router:Router) { 
    this.service = _service;
    this.router = _router;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.createCards();
    
    this.service.getAllLists().subscribe((datas) => {
      this._alllists = datas;
      this.createCards();
    });
  }

  createCards() {
    this.service.iniSessionNModel(this._alllists);
    if (this._alllists!=undefined) {
      this.shoppinglists = this._alllists.Shop;  
    }
  }

  renameShoppingListNwriteIntoSession (id:number) {
    this.service.postShoppingListNameintoDB(id);
  }

  createShoppingList() {
    this.service.createShoppingListintoDBNSession();
  }

  navigateToDetails (id:number) {
    this.router.navigate(["shoppinglist-details"], {state: {data:id}});
  }

}
