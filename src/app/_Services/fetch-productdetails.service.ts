import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { GT_Response_Product } from '../_models/Response';

@Injectable({
  providedIn: 'root'
})
export class FetchProductdetailsService {

  private http:HttpClient;
  
  constructor(private _http:HttpClient) { 
    this.http = _http;
  }

  getcurrentProduct(id:number) {
    return this.http.get<GT_Response_Product>(environment.backendUrl+"getDetailsfromProduct.php?pid="+id);
  }

}
