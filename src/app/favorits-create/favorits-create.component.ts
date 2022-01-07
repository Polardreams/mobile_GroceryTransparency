import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateProduct } from '../_models/create-product';
import { GT_Response_CreateProduct} from '../_models/Response';
import { ManagingFavoritsService } from '../_Services/managing-favorits.service';
import * as globals from '../../global';

/**
 * ParentComponent contain:
 * none
 * Main Features are:
 * create new Favorit nad upload picture
 * 
 * Dataflow:
 *  Component between following Services:
 *    +ManagingFavoritsService
 *  Parent between Child
  none
 * 
 * Hooks
 *  life cycles:
 *    - constructor 
 *    - AfterViewInit
 */

@Component({
  selector: 'app-favorits-create',
  templateUrl: './favorits-create.component.html',
  styleUrls: ['./favorits-create.component.css']
})
export class FavoritsCreateComponent implements AfterViewInit{
  owner!:number;
  imageSrc!: string;
  file!:File;
  http:HttpClient;
  router!:Router;
  service_Favorits!:ManagingFavoritsService;
  newProduct:CreateProduct = new CreateProduct();

  /**
   * register: 
   * @param _http 
   * @param _router 
   * @param _service_Favorits
   * and ini owner = 0 (user id = 0) 
   */
  constructor(_http:HttpClient, private _router:Router, _service_Favorits:ManagingFavoritsService) { 
    this.owner = 0;
    this.http = _http;
    this.router = _router;
    this.service_Favorits = _service_Favorits;
  }
  /**
   * define user id
   */
  ngAfterViewInit(): void {
    this.owner = globals.account.prototype.id;
  }

  /**
   * show picture for uploading
   * @param event 
   */
  preview(event:any) {
    var pic = document.getElementById("preview") as HTMLElement;
    pic.hidden = false;

    var icon = document.getElementById("preview_icon") as HTMLElement;
    icon.hidden = true;

    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc = reader.result?.toString() || "";
      };
    }
  }


  /**
   * post form data for create Favorit to backend
   */
  postForm() {
    const sel_cid = document.querySelector("#cid") as HTMLSelectElement;
    const sel_suffix = document.querySelector("#amount_suffix") as HTMLSelectElement;

    var obj = this.newProduct;
    obj.amount = obj.amount +" "+ sel_suffix.value;
    obj.cid = parseInt(sel_cid.value);
    obj.pic = this.imageSrc;
    obj.owner = globals.account.prototype.id;
    obj.new_price.toString().replace(',','.');
    var formData = new FormData();
    formData.append("body", JSON.stringify(obj));
    if (this.file) {
      formData.append("filename", this.file.name);  
      this.http.post<GT_Response_CreateProduct>(environment.backendUrl+"createProduct.php?",formData).subscribe((res) => {
        this.service_Favorits.addProductToFavorits(res.responseCreateProduct.id);
        this.router.navigate(["favorits"]);
      });
    } else {
      console.error(`Polardreams[postForm()]: Es wurde kein Bild gefunden.`);
    }    
  }

    /**
   * navigate back to shoppinglist-screen
   */ 
  goBack (){
    this.router.navigate(["favorits"]);
  }

}
