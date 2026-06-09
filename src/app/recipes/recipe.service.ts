import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping.list.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>
    ()
  private recipes: Recipe[] = [
    new Recipe(
      'جلد اول عروسک های بافتنی',
      'این جلد شامل خانواده قورباغه ها، موشها، ماهی ها، سگ و جغد هاست',
      '../../assets/JeldAval.jpg',
      [
        new Ingredient('تعداد عروسک‌ها', '27'),
        new Ingredient('تعداد صفحات', '86'),
        new Ingredient('سایز عروسک‌ها', '1 تا 25 سانتی‌متر'),
        new Ingredient('سال انتشار', '1376')
      ]
    ),
    new Recipe(
      'جلد دوم عروسک های بافتنی',
      'این جلد شامل 19 عدد عروسک بوده که با اسستفاده از 2 میل بافته شده و قابلیت شست و شو دارند',
      '../../assets/JeldDovom.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '19'),
        new Ingredient('تعداد صفحات', '56'),
        new Ingredient('سایز عروسک‌ها', '18 سانتی متر'),
        new Ingredient('سال انتشار', '1377')

      ]),
    new Recipe(
      'جلد سوم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldSevom.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد چهارم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldChahar.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد پنجم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldPanj.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد ششم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldShesh.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد هفتم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldHaft.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد هشتم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldHasht.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد نهم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldNoh.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد دهم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldDah.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد یازدهم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldYazdah.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد دوازدهم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldDavazdah.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد سیزدهم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldSizdah.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد چهاردهم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldChahardah.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد پانزدهم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldPanzdah.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد شانزدهم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldShanzdah.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد هفدهم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldHefdah.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد هجدهم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldHezhdah.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد نانزدهم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldNanzdah.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
    new Recipe(
      'جلد بیستم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/JeldBist.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378')

      ]),
  ];

  constructor(private slService: ShoppingListService) { }
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];

  }

  addIngredientToShoppingList(ingredient: Ingredient[]) {
    this.slService.addIngredients(ingredient);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());

  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}