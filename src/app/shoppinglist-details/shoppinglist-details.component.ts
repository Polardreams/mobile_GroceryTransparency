import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Companiepictures } from '../companiepictures';
import { Alllists } from '../_models/alllists';
import { Product } from '../_models/Product';
import { ShoppingListProducts } from '../_models/shopping-list';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';
import { ManagingShoppinglistService } from '../_Services/managing-shoppinglist.service';
import * as globals from '../../global';
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

  constructor(_service_fetchalllists:FetchAllListsService, _service_ManageingShoppinglist:ManagingShoppinglistService, _router:Router) { 
    this.service_fetchalllists = _service_fetchalllists;
    this.service_fetchalllists.fetchNwriteintoSession(globals.account.prototype.id);
    this.service_ManageingShoppinglist = _service_ManageingShoppinglist;
    this.router = _router;
  }

  
  ngOnDestroy(): void {
      this.service_ManageingShoppinglist.setAlllist(this.alllists);
      this.service_ManageingShoppinglist.postShoppingListCheckNAmountIntoDB(this.id);
  }

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

  goBack (){
    this.router.navigate(["shoppinglist"]);
  }

  deleteSelectedProducts() {
    this.service_ManageingShoppinglist.removeShoppingListProductsfromSessionNDB(this.id);
    this.alllists = this.service_ManageingShoppinglist.getTest();
    this.alllists.Shop.forEach((element) => {
      if (element.id == this.id) {
        this.products = element.products;
      }
    });
  }

}
