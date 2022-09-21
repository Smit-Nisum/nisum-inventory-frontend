import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [AppComponent, ProductListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatTableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
