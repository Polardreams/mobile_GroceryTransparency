import { Component, OnInit } from '@angular/core';
import {FetchCurrentOffersService} from '../_Services/fetch-current-offers.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  products:any;

  constructor(private _service_getCurrentProduct:FetchCurrentOffersService) { 
    //this.products = "Test";
    
    _service_getCurrentProduct.getcurrentProduct().subscribe((response) => {
      this.products = response;
    });
    
  }

  ngOnInit(): void {
    console.log("Routine startet");
    this.products.list.forEach((element: { title: string; }) => {
      console.log("el: " + element.title);
    });
  }


}
