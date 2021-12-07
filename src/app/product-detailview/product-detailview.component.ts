import { AfterViewInit, Component } from '@angular/core';
import { Product } from '../_models/Product';
import { FetchProductdetailsService } from '../_Services/fetch-productdetails.service';


@Component({
  selector: 'app-product-detailview',
  templateUrl: './product-detailview.component.html',
  styleUrls: ['./product-detailview.component.css']
})
export class ProductDetailviewComponent implements AfterViewInit{
  
  product!:Product;
  service_productDetails:FetchProductdetailsService;
  
  constructor(private _service_getProductDetails:FetchProductdetailsService) {
    this.service_productDetails = _service_getProductDetails;
    this.product = new Product();
  }


  ngAfterViewInit(): void {
    this.service_productDetails.getcurrentProduct(history.state.data).subscribe((response) => {
      this.product = response.response;
      console.log("test: "+JSON.stringify(this.product));
    });
    
  }


}
