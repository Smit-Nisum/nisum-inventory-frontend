import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from 'src/shared/services/authguard.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewPageComponent } from './product-view-page/product-view-page.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductViewPageComponent,
    canActivate: [AuthguardGuard],
  },
  { path: 'login-page', component: LoginPageComponent },
  { path: '', redirectTo: 'login-page', pathMatch: 'full' },
];
//, canActivate: [AuthGuardService]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
