import { AfterViewInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import { GenerateAccountService } from './_Services/generate-account.service';
import * as globals from '../global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(_account:GenerateAccountService) {
    _account.checkAccount();
  }
  
}
