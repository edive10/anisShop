import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  standalone: false,
  templateUrl: './recipe-item.html',
  styleUrl: './recipe-item.css',
})
export class RecipeItem {
  @Input() recipe!: Recipe;
  @Input() index!:number

}
