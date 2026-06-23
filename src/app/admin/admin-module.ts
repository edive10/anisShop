import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminOrders } from './admin-orders/admin-orders';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminOrders],
  imports: [CommonModule, AdminRoutingModule, RouterModule.forChild([
    { path: 'orders', component: AdminOrders }
  ])],
})
export class AdminModule { }
