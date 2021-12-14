import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateProduct } from '../_models/create-product';
import { GT_Response_CreateProduct, GT_Response_Resonse } from '../_models/Response';
import { ManagingFavoritsService } from '../_Services/managing-favorits.service';
import * as globals from '../../global';
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

  constructor(_http:HttpClient, private _router:Router, _service_Favorits:ManagingFavoritsService) { 
    this.owner = 0;
    this.http = _http;
    this.router = _router;
    this.service_Favorits = _service_Favorits;
  }
  ngAfterViewInit(): void {
    this.owner = globals.account.prototype.id;
  }

  preview(event:any) {

    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc = reader.result?.toString() || "";
      };
    }
  }

  postForm() {
    
    const sel_cid = document.querySelector("#cid") as HTMLSelectElement;
    const sel_suffix = document.querySelector("amount_suffix") as HTMLSelectElement;
    
    var obj = new CreateProduct();
    obj.title = document.querySelector("#title")?.getAttribute("value") || "";
    obj.description = document.querySelector("#description")?.getAttribute("value") || "";
    obj.hint = document.querySelector("#hint")?.getAttribute("value") || "";
    obj.amount = document.querySelector("#amount")?.getAttribute("value") || "" +" "+ sel_suffix.value;
    obj.price_per_amount = document.querySelector("#price_per_amount")?.getAttribute("value") || "";
    obj.new_price = parseFloat(document.querySelector("#price")?.getAttribute("value") || "");
    obj.cid = parseInt(sel_cid.value);
    obj.pic = this.imageSrc;
    obj.owner = globals.account.prototype.id;
    
    var formData = new FormData();
    formData.append("body", JSON.stringify(obj));
    formData.append("filename", this.file.name);
    this.http.post<GT_Response_CreateProduct>(environment.backendUrl+"createProduct.php?",formData).subscribe((res) => {
      this.service_Favorits.addProductToFavorits(res.responseCreateProduct.id);
      this.router.navigate(["favorits"]);
    });

  }

}
