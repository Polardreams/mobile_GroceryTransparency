import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Alllists } from '../_models/alllists';
import { Favorits } from '../_models/favorits';
import { FetchAllListsService } from '../_Services/fetch-all-lists.service';
import { ManagingFavoritsService } from '../_Services/managing-favorits.service';

@Component({
  selector: 'app-favorits-screen',
  templateUrl: './favorits-screen.component.html',
  styleUrls: ['./favorits-screen.component.css']
})
export class FavoritsScreenComponent implements AfterViewInit, OnChanges {
  favorits!:Favorits[];
  alllists!:Alllists;
  service_managingFavorits!:ManagingFavoritsService;
  service_fetchAllLists!:FetchAllListsService;

  constructor(_service_managingFavorits:ManagingFavoritsService, _service_fetchAllLists:FetchAllListsService) { 
    this.service_managingFavorits = _service_managingFavorits;
    this.service_fetchAllLists = _service_fetchAllLists;
    this.service_fetchAllLists.fetchNwriteintoSession(1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    this.service_fetchAllLists.getAlllists().subscribe((datas) => {
      this.alllists = datas;
      this.alllists.Fav.forEach((items, index, arr) => {
        this.favorits = arr;
              
      });
    });
  }

  ngAfterViewInit(): void {
    this.service_fetchAllLists.getAlllists().subscribe((datas) => {
      this.alllists = datas;
      this.alllists.Fav.forEach((items, index, arr) => {
        this.favorits = arr;
      });
    });
  }


}
