import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  [x: string]: any;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public images: string[];
  public price!: number
  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[], images: string[], price: number) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.images = images;
    this.price = price
  }
}
export interface Review {
  username: string;
  comment: string;
  rating: number;
  date: Date;
}