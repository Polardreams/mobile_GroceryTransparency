import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Alllists } from '../_models/alllists';
import { CardContent } from '../_models/CardContent';
import { Shoppinglist } from '../_models/shoppinglists';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';
import { ManagingFavoritsService } from '../_Services/managing-favorits.service';
import { ManagingFiltersNPolicyService } from '../_Services/managing-filters-npolicy.service';
import { ManagingShoppinglistService } from '../_Services/managing-shoppinglist.service';


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

  constructor(_service:ManagingShoppinglistService, _service_Favorits:ManagingFavoritsService) { 
    this.service = _service;
    this.service_Favorits = _service_Favorits;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.shoppinglists = this.alllists.Shop;
    this.service_Favorits.setAlllist(this.alllists);
  }

  ngAfterViewInit(): void {
    document.getElementById("btn")?.setAttribute("id", "btn"+this.id);
    document.getElementById("btn"+this.id)?.setAttribute("data-bs-target", "#target"+this.id);
    document.getElementById("target")?.setAttribute("id", "target"+this.id);

    document.getElementById("addShop")?.setAttribute("id", "addShop"+this.id);
    document.getElementById("addShop"+this.id)?.setAttribute("data-bs-target", "#modal"+this.id);
    document.getElementById("modal")?.setAttribute("id", "modal"+this.id);
  }

  addProductToShoppingList(sid:number) {
    this.service.setAlllist(this.alllists);
    this.service.addProductToShoppingList(sid, this.id);
  }

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
