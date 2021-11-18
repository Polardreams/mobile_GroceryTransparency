import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchCurrentOffersService {
  private http:HttpClient;

  constructor(private _http:HttpClient) { 
    this.http = _http;
  }

  getcurrentProduct() {
    return this.http.get(environment.backendUrl+"getCurrentProducts.php?");
  }

}
