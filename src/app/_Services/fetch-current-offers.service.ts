import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

import { GT_Response_List } from '../_models/Response';


@Injectable({
  providedIn: 'root'
})
export class FetchCurrentOffersService {
  private http:HttpClient;
  
  constructor(private _http:HttpClient) { 
    this.http = _http;
  }

  getcurrentProduct(sid:string|null) {
    if (sid!=null) {
      return this.http.get<GT_Response_List>(environment.backendUrl+'getCurrentProducts.php?sid='+sid);
    } else {
      return this.http.get<GT_Response_List>(environment.backendUrl+"getCurrentProducts.php?");
    }
    
  }

}
