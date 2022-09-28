import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateProductBtnComponent } from './create-product-btn/create-product-btn.component';

import { MatTableModule } from '@angular/material/table';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductViewPageComponent } from './product-view-page/product-view-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditProductBtnComponent } from './edit-product-btn/edit-product-btn.component';
import { ProductNotFoundComponent } from './product-not-found/product-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductDetailModalComponent } from './product-detail-modal/product-detail-modal.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProductListComponent,
    SearchBarComponent,
    CreateProductBtnComponent,
    ProductViewPageComponent,
    DeleteDialogComponent,
    EditProductBtnComponent,
    ProductNotFoundComponent,
    NavbarComponent,
    ProductDetailModalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    ScrollingModule,
    TableVirtualScrollModule,
    MatSortModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
