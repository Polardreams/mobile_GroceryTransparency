import { AfterViewInit, Component } from '@angular/core';
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


}
