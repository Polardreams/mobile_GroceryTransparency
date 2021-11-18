import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CardContent } from '../_models/CardContent';

@Component({
  selector: 'app-card-for-main',
  templateUrl: './card-for-main.component.html',
  styleUrls: ['./card-for-main.component.css']
})
export class CardForMainComponent implements OnInit {

  @Input() temp:any;
  
  cards!:CardContent[];
  

  constructor() { 

  }

  ngOnInit(): void {
    console.log("Polardreams init: "+this.cards);
    /*
    this.temp.array.forEach((element: { cid: number; id: number; title: string; pic_url: string; new_price: number; discount: string; date: Date; }) => {
      let pic_companie = "";
      switch(element.cid) {
        case(1): pic_companie = "../assets/images/logos/lidl.svg"; break;
        case(2): pic_companie = "../assets/images/logos/rewe.svg"; break;
        case(3): pic_companie = "../assets/images/logos/kaufland.svg"; break;
        case(4): pic_companie = "../assets/images/logos/aldiN.svg"; break;
        case(5): pic_companie = "../assets/images/logos/aldiS.svg"; break;
        default: pic_companie = "";//Fragezeichen als icon
      }
      console.log(element.title);
      this.cards.push(new CardContent(
        element.id, 
        false, 
        element.title, 
        element.pic_url, 
        pic_companie, 
        element.new_price, 
        element.cid, 
        element.discount, 
        element.date
      ));  
    });
    */
  }

}
  


