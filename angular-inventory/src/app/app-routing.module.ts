import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'form', component: ProductFormComponent },
  { path: 'form/:upc', component: ProductFormComponent },
  { path: 'product-detail/:upc', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  // upc: String;
}
