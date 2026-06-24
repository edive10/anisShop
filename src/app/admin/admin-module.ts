import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminOrders } from './admin-orders/admin-orders';
import { AdminDashboard } from './admin-dashboard/admin-dashboard'; // ۱. این را اضافه کن

@NgModule({
  declarations: [
    AdminDashboard, // ۲. حتماً داشبورد باید اینجا باشد
    AdminOrders
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule // مدیریت مسیرها را به این فایل بسپار
  ],
})
export class AdminModule { }
