import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Alllists } from '../_models/alllists';
import { Favorits } from '../_models/favorits';
import { Product } from '../_models/Product';
import { Shoppinglist } from '../_models/shoppinglists';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';
import { FetchProductdetailsService } from '../_Services/fetch-productdetails.service';
import { ManagingFavoritsService } from '../_Services/managing-favorits.service';
import { ManagingShoppinglistService } from '../_Services/managing-shoppinglist.service';

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

  constructor( _service:ManagingShoppinglistService) { 
    this.service = _service;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.shoppinglists = this.alllists.Shop;
  }

  ngAfterViewInit(): void {
    document.getElementById('btn')?.setAttribute('id', 'btn'+this.id);
    document.getElementById('btn'+this.id)?.setAttribute('data-bs-target', '#target'+this.id);
    document.getElementById('target')?.setAttribute('id', 'target'+this.id);

    document.getElementById("addShop")?.setAttribute("id", "addShop"+this.id);
    document.getElementById("addShop"+this.id)?.setAttribute("data-bs-target", "#modal"+this.id);
    document.getElementById("modal")?.setAttribute("id", "modal"+this.id);
  }

  removeProductFromFavoris () {
    this.service_Favorits.removeProductfromFavorits(this.id);
    this.service_Favorits.getAllLists().subscribe((datas) => {
      this.alllists = datas;
    });

  }
  
  addProductToShoppingList(sid:number) {
    this.service.setAlllist(this.alllists);
    this.service.addProductToShoppingList(sid, this.id);
  }

}
