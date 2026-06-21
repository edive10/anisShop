import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { EditBook } from './edit-book/edit-book';

const routes: Routes = [

  { path: '', component: AdminDashboard },

  { path: 'edit/:id', component: EditBook }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
