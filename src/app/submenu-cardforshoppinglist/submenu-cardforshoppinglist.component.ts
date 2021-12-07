import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ManagingShoppinglistService } from '../_Services/managing-shoppinglist.service';


@Component({
  selector: 'app-submenu-cardforshoppinglist',
  templateUrl: './submenu-cardforshoppinglist.component.html',
  styleUrls: ['./submenu-cardforshoppinglist.component.css']
})
export class SubmenuCardforshoppinglistComponent implements AfterViewInit {

  @Input() id!:number;
  idtarget!:string;
  idbutton!:string;
  isopen:boolean = false;
  service:ManagingShoppinglistService;

  constructor(_service:ManagingShoppinglistService) { 
    this.service = _service;
  }


  ngAfterViewInit(): void {
    document.getElementById("btn")?.setAttribute("id", "btn"+this.id);
    document.getElementById("btn"+this.id)?.setAttribute("data-bs-target", "#target"+this.id);
    document.getElementById("target")?.setAttribute("id", "target"+this.id);
  }

  deleteShoppingList (id:number) {
    this.service.removeShoppingListfromDBNSession(id);
  }

  copyShoppingList(id:number) {
    this.service.copyShoppingListintoDBNSession(id);
  }

}
