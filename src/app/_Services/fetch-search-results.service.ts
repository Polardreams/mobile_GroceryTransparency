import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

import { GT_Response_List, GT_Response_Resonse } from '../_models/Response';

/**
 * Service wicht fetch Searchresults. It communicate with an Backend and need the foloowing params:
 *  id = accountid from user
 *  searchterm = Keyword from Input (form)
 *  mode = API commands (0 == search in weekly offers; 1 == search in all offers)
 *  categories = find matches in groceries (table) with this categories
 *  discounter = find matches in groceries (table) with this dicounters (one than one discounter possible)
 *  resultlength = define count of results 
 *  sid = find matches in groceries with distinction of kaufland stores (matching for one store)
 */

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
