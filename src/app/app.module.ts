import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { CardForMainComponent } from './card-for-main/card-for-main.component';
import { SubmenuCardformainComponent } from './submenu-cardformain/submenu-cardformain.component';
import { ProductDetailviewComponent } from './product-detailview/product-detailview.component';
import { FormsModule } from '@angular/forms';
import { ShoppinglistScreenComponent } from './shoppinglist-screen/shoppinglist-screen.component';
import { CardForShoppinglistComponent } from './card-for-shoppinglist/card-for-shoppinglist.component';
import { SubmenuCardforshoppinglistComponent } from './submenu-cardforshoppinglist/submenu-cardforshoppinglist.component';
import { ShoppinglistDetailsComponent } from './shoppinglist-details/shoppinglist-details.component';
import { FavoritsScreenComponent } from './favorits-screen/favorits-screen.component';
import { CardsForFavoritsComponent } from './cards-for-favorits/cards-for-favorits.component';
import { SubmenuCardforfavoritsComponent } from './submenu-cardforfavorits/submenu-cardforfavorits.component';
import { FavoritsCreateComponent } from './favorits-create/favorits-create.component';

import { ModalModule } from 'ngx-bootstrap/modal';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NavigationComponent } from './navigation/navigation.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    CardForMainComponent,
    SubmenuCardformainComponent,
    ProductDetailviewComponent,
    ShoppinglistScreenComponent,
    CardForShoppinglistComponent,
    SubmenuCardforshoppinglistComponent,
    ShoppinglistDetailsComponent,
    FavoritsScreenComponent,
    CardsForFavoritsComponent,
    SubmenuCardforfavoritsComponent,
    FavoritsCreateComponent,
    NavigationComponent,
    SettingComponent 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot()    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

