import { AfterViewInit, Component } from '@angular/core';
import { Alllists } from '../_models/alllists';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';

@Component({
  selector: 'app-shoppinglist-screen',
  templateUrl: './shoppinglist-screen.component.html',
  styleUrls: ['./shoppinglist-screen.component.css']
})
export class ShoppinglistScreenComponent implements AfterViewInit {
  
  alllists!:Alllists;
  service_fetchalllists:FetchAllListsService;

  constructor(_service_fetchalllists:FetchAllListsService) { 
    this.service_fetchalllists = _service_fetchalllists;
    this.service_fetchalllists.fetchNwriteintoSession(1);
  }

  ngAfterViewInit(): void {
    this.service_fetchalllists.getAlllists().subscribe((datas) => {
      this.alllists = datas;
    });

  
  }


}
