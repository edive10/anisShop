import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {
  recipe!: Recipe;
  id!: number
  selectedImage: string = '';
  showModal: boolean = false;
  showImages: boolean = false;
  selectedIndex = 0;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute
    , private router: Router) {

  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    })

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
    this.router.navigate(['edit'], { relativeTo: this.route })
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route })
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes'])
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
}

