import { AfterViewInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import { GenerateAccountService } from './_Services/generate-account.service';
import * as globals from '../global';

/**
 * Main Modul
 * 
 * all components are Child from AppComponent
 * 
 * Feature:
 *  it check for local Account (deprecated, becaus MVP version)
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activate:boolean = false;

/**
 * it check, if there is a account id in localStorage
 *  if yes, then load account id in model globals.account.prototype.id
 *  if not, generate a new account
 * 
 * its set activate = true, then *ngIf display Main-Screen
 * @param _account GenerateAccountService
 */

  constructor(_account:GenerateAccountService) {
    let id:number|null = _account.checkAccount();
    if (id==null) {
      _account.generateAccount().subscribe((data) => {
        var account = {id:data.response};
        localStorage.setItem("account", JSON.stringify(account));
        console.log("Deine Account wurde mit der ID: " + JSON.stringify(data.response)+" erstellt.");
        globals.account.prototype.id = data.response;
        this.activate = true;
      });
    } else {
      this.activate = true;
    }
    
  }
  
}
