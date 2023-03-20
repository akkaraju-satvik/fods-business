import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { MenuItemsComponent } from './views/menu-items/menu-items.component';
import { OrderDetailsComponent } from './views/order-details/order-details.component';
import { OrdersComponent } from './views/orders/orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], children: []},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: 'orders/:id/order-details', component: OrderDetailsComponent, canActivate: [AuthGuard]},
  { path: 'menu-items', component: MenuItemsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
