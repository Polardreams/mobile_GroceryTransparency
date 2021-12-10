import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritsCreateComponent } from './favorits-create/favorits-create.component';
import { FavoritsScreenComponent } from './favorits-screen/favorits-screen.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { ProductDetailviewComponent } from './product-detailview/product-detailview.component';
import { ShoppinglistDetailsComponent } from './shoppinglist-details/shoppinglist-details.component';
import { ShoppinglistScreenComponent } from './shoppinglist-screen/shoppinglist-screen.component';
import { Favorits } from './_models/favorits';

const routes: Routes = [
  {path:'main', component:MainScreenComponent},
  {path:'productdetail', component:ProductDetailviewComponent},
  {path:'shoppinglist', component:ShoppinglistScreenComponent},
  {path:'shoppinglist-details', component:ShoppinglistDetailsComponent},
  {path:'favorits', component:FavoritsScreenComponent},
  {path:'favorits-create', component:FavoritsCreateComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
