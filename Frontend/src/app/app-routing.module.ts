import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'user-list', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
