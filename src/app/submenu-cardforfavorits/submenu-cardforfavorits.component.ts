import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Alllists } from '../_models/alllists';
import { Favorits } from '../_models/favorits';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';
import { ManagingFavoritsService } from '../_Services/managing-favorits.service';

@Component({
  selector: 'app-submenu-cardforfavorits',
  templateUrl: './submenu-cardforfavorits.component.html',
  styleUrls: ['./submenu-cardforfavorits.component.css']
})
export class SubmenuCardforfavoritsComponent implements AfterViewInit, OnChanges {
  @Input() id!:number;
  @Input() alllists!:Alllists;
  @Input() service_Favorits!:ManagingFavoritsService;
  

  constructor() { 
    
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit(): void {
    document.getElementById('btn')?.setAttribute('id', 'btn'+this.id);
    document.getElementById('btn'+this.id)?.setAttribute('data-bs-target', '#target'+this.id);
    document.getElementById('target')?.setAttribute('id', 'target'+this.id);
  }

  removeProductFromFavoris () {
    this.service_Favorits.removeProductfromFavorits(this.id);
    this.service_Favorits.getAllLists().subscribe((datas) => {
      this.alllists = datas;
    });
  }
  

}
