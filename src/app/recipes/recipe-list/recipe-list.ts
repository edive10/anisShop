import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList implements OnInit, OnDestroy {
  recipes!: Recipe[];
  subscription!: Subscription;

  // --- تنظیمات صفحه‌بندی ---
  currentPage: number = 1;
  itemsPerPage: number = 5; // می‌توانید این عدد را به 10 یا هر مقدار دیگری تغییر دهید

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        // وقتی لیست تغییر می‌کند (مثلاً حذفی صورت می‌گیرد)، بهتر است به صفحه اول برگردیم
        this.currentPage = 1; 
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  // محاسبه کل صفحات بر اساس تعداد کل کتاب‌ها
  get totalPages(): number {
    return Math.ceil(this.recipes.length / this.itemsPerPage);
  }

  // ایجاد آرایه‌ای از شماره صفحات برای نمایش در HTML
  get pages(): number[] {
    const total = this.totalPages;
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // متد تغییر صفحه
  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
