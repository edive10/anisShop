import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminOrders } from './admin-orders/admin-orders';

@NgModule({
  declarations: [AdminOrders],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
