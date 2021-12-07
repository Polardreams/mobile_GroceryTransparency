import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

import { GT_Response_List, GT_Response_Resonse } from '../_models/Response';

@Injectable({
  providedIn: 'root'
})
export class FetchSearchResultsService {

  private http:HttpClient;
  
  constructor(private _http:HttpClient) { 
    this.http = _http;
  }

  getSearchResults(id:number, searchterm:string, mode:number, categories:number, discounter:string, resultlength:number, sid:string|null) {
    console.log(environment.backendUrl+'getSearchResults.php?id='+id+'&searchterm='+searchterm+'&mode='+mode+'&categories='+categories+'&discounter='+discounter+'&resultlength='+resultlength+'&sid='+sid);
    if (sid!=null) {
      console.log("not null");
      return this.http.get<GT_Response_List>(environment.backendUrl+'getSearchResults.php?id='+id+'&searchterm='+searchterm+'&mode='+mode+'&categories='+categories+'&discounter='+discounter+'&resultlength='+resultlength+'&sid='+sid);
    } else {
      console.log("null");
      return this.http.get<GT_Response_List>(environment.backendUrl+'getSearchResults.php?id='+id+'&searchterm='+searchterm+'&mode='+mode+'&categories='+categories+'&discounter='+discounter+'&resultlength='+resultlength);
    }
   
   
  }
}
