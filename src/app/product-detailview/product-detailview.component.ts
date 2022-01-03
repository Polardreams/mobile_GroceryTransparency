import { AfterViewInit, Component } from '@angular/core';
import { Companiepictures } from '../companiepictures';
import { Product } from '../_models/Product';
import { FetchProductdetailsService } from '../_Services/fetch-productdetails.service';

/**
 * ParentComponent contain:
 * none
 * 
 * Main Features are:
 *  view product details
 * 
 * Dataflow:
 *  Component between following Services:
 *    + FetchProductdetailsService
 * 
 *  Parent between Child
 * none
 * 
 * Hooks
 *  life cycles:
 *    - constructor 
 *    - AfterViewInit
 */

@Component({
  selector: 'app-product-detailview',
  templateUrl: './product-detailview.component.html',
  styleUrls: ['./product-detailview.component.css']
})
export class ProductDetailviewComponent implements AfterViewInit{
  product!:Product;
  service_productDetails:FetchProductdetailsService;

  /**
   * register :
   * @param _service_getProductDetails FetchProductdetailsService
   * and ini Product Object
   */
  constructor(private _service_getProductDetails:FetchProductdetailsService) {
    this.service_productDetails = _service_getProductDetails;
    this.product = new Product();
  }

/**
 * get Product details with pic url
 */
  ngAfterViewInit(): void {
    this.service_productDetails.getcurrentProduct(history.state.data).subscribe((response) => {
      let pic_url_arr:any = [];
      
      if (response.response.pic_url.split(',').length>1) {
        response.response.pic_url.split(',').forEach((item) => {
          pic_url_arr.push(item.slice(0, item.indexOf(' ')));//es wird immer die erste Pic-URL geladen vom pic-url array (diff. Auflösungen)
        });
      } else {
        pic_url_arr.push(response.response.pic_url);
      }
      response.response.pic_url = pic_url_arr[0];
      this.product = response.response;
    });
  }

  
  /**
   * load companie icons
   * @param cid  companie id
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
