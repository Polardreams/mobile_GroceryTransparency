import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Companiepictures } from '../companiepictures';
import { Alllists } from '../_models/alllists';
import { Favorits } from '../_models/favorits';
import { Product } from '../_models/Product';
import { FetchProductdetailsService } from '../_Services/fetch-productdetails.service';
import { ManagingFavoritsService } from '../_Services/managing-favorits.service';

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

  constructor(_service:FetchProductdetailsService, _router:Router) { 
    this.service = _service;
    this.router = _router;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.favorits) {
      this.products = [];
      this.favorits.forEach((items, index, arr) => {
        this.service.getcurrentProduct(items.grocerie).subscribe((datas) => {
          this.products.push(datas.response);
        });
      });
    } else {
      this.service_managingFavorits.getAllLists().subscribe((datas) => {
        var temp = datas.Fav;
        this.products = [];
        temp.forEach((items, index, arr) => {
          this.service.getcurrentProduct(items.grocerie).subscribe((datas) => {
            this.products.push(datas.response);
          });
        });
      });
    }
  }

  public getDetails(id:number) {
    this.router.navigate(["productdetail"], {state: {data:id}});
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

}
