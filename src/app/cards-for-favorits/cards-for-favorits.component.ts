import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Companiepictures } from '../companiepictures';
import { Alllists } from '../_models/alllists';
import { Favorits } from '../_models/favorits';
import { Product } from '../_models/Product';
import { FetchProductdetailsService } from '../_Services/fetch-productdetails.service';
import { ManagingFavoritsService } from '../_Services/managing-favorits.service';

/**
 * ParentComponent contain:
 * submenu cardforfavorits
 * 
 * Main Features are:
 *  display Favorit informations
 *  navigate to product details view
 * 
 * Dataflow:
 *  Component between following Services:
 *       FetchProductdetailsService
 * 
 *  Parent between Child
 *    submenu cardforfavorits ([id]="favorit.id" [alllists]="alllists" [service_Favorits]="service_managingFavorits")
 * 
 * Hooks
 *  life cycles:
 *    - constructor 
 *    - OnChanges
 */

@Component({
  selector: 'app-cards-for-favorits',
  templateUrl: './cards-for-favorits.component.html',
  styleUrls: ['./cards-for-favorits.component.css']
})

export class CardsForFavoritsComponent implements OnChanges {
  @Input() favorits!:Favorits[];
  @Input() alllists!:Alllists;
  @Input() service_managingFavorits!:ManagingFavoritsService;

  service!:FetchProductdetailsService;
  router!:Router;
  products:Product[] = [];
  flag:boolean = true;

  test:number = 0;

  /**
   * register following services:
   * @param _service FetchProductdetailsService
   * @param _router Router
   */
  constructor(_service:FetchProductdetailsService, _router:Router) { 
    this.service = _service;
    this.router = _router;
  }

  /**
   * get array of all Favorits and fetch products details
   * also fetch Allists as Observable
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges): void {  
    if (this.favorits && this.flag) {
      this.products = [];
      this.flag = false;
      this.favorits.forEach((items, index, arr) => {
        this.service.getcurrentProduct(items.grocerie).subscribe((datas) => {
          this.products.push(datas.response);
        });
      });
    }

    this.service_managingFavorits.getAllLists().subscribe((lists) => {
      window.location.reload();//Es ist weiterhin unklar, warum hier nicht ordnungsgemäßg geladen wird
    });
  
  }

  /**
   * 
   * @param id navigate to product details view
   */
  public getDetails(id:number) {
    this.router.navigate(["productdetail"], {state: {data:id}});
  }

  /**
   * get comnpanie icon
   * @param cid companie id
   * @returns 
   */
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

}
