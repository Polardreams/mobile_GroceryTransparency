import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateProduct } from '../_models/create-product';
import { GT_Response_CreateProduct, GT_Response_Resonse } from '../_models/Response';

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

  constructor(_http:HttpClient) { 
    this.owner = 0;
    this.http = _http;
  }
  ngAfterViewInit(): void {
    //document.getElementById("formCreate")?.setAttribute("action", environment.backendUrl+"createProduct.php?");
    document.getElementById("formCreate")?.setAttribute("action", "http://localhost/dashboard/myLocal/TransparencyGrocery/mobilebackend/"+"createProduct.php?");
   
    this.owner = 1;
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
    obj.owner = 1;
    
    console.log(JSON.stringify(obj));

    var formData = new FormData();
    formData.append("body", JSON.stringify(obj));
    formData.append("filename", this.file.name);
    console.log(formData);
    this.http.post<GT_Response_CreateProduct>(environment.backendUrl+"createProduct.php?",formData).subscribe((response) => {
      console.log(JSON.stringify(response));
    });
  }

}
