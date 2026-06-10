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
      '../../assets/1.jpg',
      [
        new Ingredient('تعداد عروسک‌ها', '27'),
        new Ingredient('تعداد صفحات', '86'),
        new Ingredient('سایز عروسک‌ها', '1 تا 25 سانتی‌متر'),
        new Ingredient('سال انتشار', '1376'),
        new Ingredient('قیمت', '400.000 تومان'),
      ],
      [
        'assets/tasvirDakhel/2.jpg',
        'assets/tasvirDakhel/3.jpg',
      ]
    ),
    new Recipe(
      'جلد دوم عروسک های بافتنی',
      'این جلد شامل 19 عدد عروسک بوده که با اسستفاده از 2 میل بافته شده و قابلیت شست و شو دارند',
      '../../assets/2.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '19'),
        new Ingredient('تعداد صفحات', '56'),
        new Ingredient('سایز عروسک‌ها', '18 سانتی متر'),
        new Ingredient('سال انتشار', '1377'),
        new Ingredient('قیمت', '500.000 تومان'),


      ], [
      'assets/tasvirDakhel/5.jpg',
      'assets/tasvirDakhel/6.jpg',

    ]),
    new Recipe(
      'جلد سوم عروسک های بافتنی',
      'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
      '../../assets/3.jpg'
      , [

        new Ingredient('تعداد عروسک‌ها', '6'),
        new Ingredient('تعداد صفحات', '60'),
        new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
        new Ingredient('سال انتشار', '1378'),
        new Ingredient('قیمت', '500.000 تومان'),


      ],
      [
        'assets/tasvirDakhel/8.jpg',
      ],
    ),
    // new Recipe(
    //   'جلد چهارم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/4.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ],
    //   [
    //     'assets/tasvirDakhel/10.jpg',
    //   ]),
    // new Recipe(
    //   'جلد پنجم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/5.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //   'assets/tasvirDakhel/12.jpg',
    //   'assets/tasvirDakhel/13.jpg'
    // ]),
    // new Recipe(
    //   'جلد ششم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/6.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //   'assets/tasvirDakhel/15.jpg',
    // ]),
    // new Recipe(
    //   'جلد هفتم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/7.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //   'assets/tasvirDakhel/17.jpg',
    // ]),
    // new Recipe(
    //   'جلد هشتم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/8.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //   'assets/tasvirDakhel/19.jpg'
    // ]),
    // new Recipe(
    //   'جلد نهم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/9.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //   'assets/tasvirDakhel/21.jpg'
    // ]),
    // new Recipe(
    //   'جلد دهم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/10.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //   'assets/tasvirDakhel/22-1.jpg'
    // ]),
    // new Recipe(
    //   'جلد یازدهم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/11.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //   'assets/tasvirDakhel/24.jpg'
    // ]),
    // new Recipe(
    //   'جلد دوازدهم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/12.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //   'assets/tasvirDakhel/26.jpg'
    // ]),
    // new Recipe(
    //   'جلد سیزدهم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/13.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //   'assets/tasvirDakhel/28.jpg',
    //   'assets/tasvirDakhel/29.jpg'
    // ]),
    // new Recipe(
    //   'جلد چهاردهم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/14.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //         'assets/tasvirDakhel/31.jpg'
    //   ]),
    // new Recipe(
    //   'جلد پانزدهم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/15.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //         'assets/tasvirDakhel/33.jpg'
    //   ]),
    // new Recipe(
    //   'جلد شانزدهم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/16.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //         'assets/tasvirDakhel/35.jpg'
    //   ]),
    // new Recipe(
    //   'جلد هفدهم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/18.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //         'assets/tasvirDakhel/37.jpg'
    //   ]),
    // new Recipe(
    //   'جلد هجدهم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/17.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //         'assets/tasvirDakhel/39.jpg'
    //   ]),
    // new Recipe(
    //   'جلد نانزدهم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/19.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //         'assets/tasvirDakhel/41.jpg',
    //         'assets/tasvirDakhel/42.jpg',
    //   ]),
    // new Recipe(
    //   'جلد بیستم عروسک های بافتنی',
    //   'آموزش بافت 7 عروسک به نام های سبلان، سپیده، مادربزرگ، پدربزرگ با قد تقریبی 34 سانت',
    //   '../../assets/20.jpg'
    //   , [

    //     new Ingredient('تعداد عروسک‌ها', '6'),
    //     new Ingredient('تعداد صفحات', '60'),
    //     new Ingredient('سایز عروسک‌ها', '17 تا 32 سانتی‌متر'),
    //     new Ingredient('سال انتشار', '1378')

    //   ], [
    //         'assets/tasvirDakhel/44.jpg'
    //   ]),
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