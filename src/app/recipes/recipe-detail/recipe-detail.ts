import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe, Review } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { CartService } from '../../cart/cart.service';
import { CartUiService } from '../../cart/cart-ui.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {
  recipe!: Recipe;
  id!: number;
  selectedImage: string = '';
  showModal: boolean = false;
  showImages: boolean = false;
  selectedIndex = 0;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private cartUiService: CartUiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  openImage(img: string, index: number) {
    this.selectedImage = img;
    this.selectedIndex = index;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  OnEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }

  toggleImages() {
    this.showImages = !this.showImages;
  }

  nextImage() {
    if (this.selectedIndex < this.recipe.images.length - 1) {
      this.selectedIndex++;
      this.selectedImage = this.recipe.images[this.selectedIndex];
    }
  }

  prevImage() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.selectedImage = this.recipe.images[this.selectedIndex];
    }
  }

  onAddToCart() {
    this.cartService.addToCart(this.recipe, this.id);
    this.cartUiService.openCart();
  }
  onAddReview(name: HTMLInputElement, rating: HTMLSelectElement, comment: HTMLTextAreaElement) {
  if (name.value && comment.value) {
    const newReview: Review = {
      username: name.value,
      rating: +rating.value,
      comment: comment.value,
      date: new Date()
    };
    
    this.recipe.reviews.push(newReview);
    
    // خالی کردن فرم
    name.value = '';
    comment.value = '';
  }
} 
}
