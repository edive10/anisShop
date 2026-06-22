import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { Recipes } from "./recipes/recipes";
import { ShoppingList } from "./shopping-list/shopping-list";
import { RecipeStart } from "./recipes/recipe-start/recipe-start";
import { RecipeDetail } from "./recipes/recipe-detail/recipe-detail";
import { RecipeEdit } from "./recipes/recipe-edit/recipe-edit";
import { Cart } from "./cart/cart";
import { HomeComponent } from "./home/home.component";
import { AddBook } from './add-book/add-book';
import { AuthGuard } from './guards/auth-guard';
import { Login } from './admin/login/login';
import { Checkout } from "./checkout/checkout";
import { AdminOrders } from "./admin-orders/admin-orders";

const appRoutes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'admin/orders', component: AdminOrders },
  { path: 'checkout', component: Checkout },
  { path: 'admin/orders', component: AdminOrders, canActivate: [AuthGuard] },

  { path: 'add-book', component: AddBook },

  { path: 'login', component: Login },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin-module').then(m => m.AdminModule)
  },

  {
    path: 'recipes',
    component: Recipes,
    children: [
      { path: '', component: RecipeStart },
      { path: 'new', component: RecipeEdit },
      { path: ':id', component: RecipeDetail },
      { path: ':id/edit', component: RecipeEdit },
    ]
  },

  { path: 'shopping-list', component: ShoppingList }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
