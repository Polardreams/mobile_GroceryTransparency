import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { CardForMainComponent } from './card-for-main/card-for-main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    CardForMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
