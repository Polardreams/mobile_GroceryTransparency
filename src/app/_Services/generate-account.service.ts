import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GT_Response_Account } from '../_models/Response';
import * as globals from '../../global';
import { FilterNpolicy } from '../_models/filter-npolicy';

/**
 * Attention!!!
 * this is a deprecate Service. It generate temporary a user account and
 * save him to localStorage.
 */

@Injectable({
  providedIn: 'root'
})
export class GenerateAccountService {

  http!:HttpClient;
  constructor(_http:HttpClient) { 
    this.http = _http;
  }

  /**
   * 
   * @returns accountid
   * check for existing user account in local Browser storage
   * If there are no account-credentials, this function will generate a new account and store 
   * account credentials in browser storage
   */

  checkAccount ():number|null {
    if (localStorage.getItem("account")) {
      var check = JSON.parse(localStorage.getItem("account") || "");
      globals.account.prototype.id = check.id;
      console.log("Deine Account ID lautet: " + JSON.stringify(check.id));
      return check.id;
      
    } else {
      console.error("Polardreams[error]: Du besitzt keine ID. Ein neues Account wird erstellt.");
      return null;
    }    
  }


  /**
   * 
   * @returns account id
   */

  generateAccount () {
    let code = this.generateCode();
    return this.http.get<GT_Response_Account>(environment.backendUrl+"/temp_generateAccount.php?code="+code);
  }


  /**
   * generate a code for a saver communication. In future the used pattern (line 65) must be store in a encrypt file (like passwords)
   * @returns code wich can use as param
   * Backend check validity
   */
  generateCode():string {

    let r = Math.floor(Math.random()*8);
    let e = 10 - r;
    let part1 = this.randomString(r) + "abGh48" + this.randomString(e);

    r = Math.floor(Math.random()*8);
    e = 10 - r;
    let part2 = this.randomString(r) + "abGh48" + this.randomString(e);
    return part1 + part2;
  }

  randomString (length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
    }//thanks to https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    return result;
  }

}
