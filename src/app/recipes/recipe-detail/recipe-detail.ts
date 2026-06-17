import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe, Review } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { CartService } from '../../cart/cart.service';
import { CartUiService } from '../../cart/cart-ui.service';

// تعریف ساختار داده‌ای هر نظر
interface Comment {
  author: string;
  text: string;
  rating: number;
  date: Date;
}
@Component({
  selector: 'app-books-detail',
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
  comments: Comment[] = [];


  // متغیرهای متصل به فرم نظرات
  newAuthor = '';
  newText = '';
  newRating = 5; // امتیاز پیش‌فرض

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private cartUiService: CartUiService
  ) { }

  ngOnInit() {
    this.loadComments();
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
  // لود کردن نظرات از LocalStorage بر اساس نام یا آی‌دی کتاب
  loadComments() {
    // اگر هنوز دیتای کتاب لود نشده، خارج شو
    if (!this.recipe) return;

    const savedComments = localStorage.getItem('comments_' + this.recipe.name);
    if (savedComments) {
      this.comments = JSON.parse(savedComments);
    } else {
      this.comments = [
        {
          author: 'سارا احمدی',
          text: 'بسیار کتاب روان و کاربردی بود.',
          rating: 5,
          date: new Date()
        }
      ];
      this.saveComments();
    }
  }

  saveComments() {
    if (!this.recipe) return;
    localStorage.setItem('comments_' + this.recipe.name, JSON.stringify(this.comments));
  }

  // ثبت امتیاز ستاره‌ای جدید
  setRating(stars: number) {
    this.newRating = stars;
  }

  // ارسال نظر جدید
  onSubmitComment() {
    if (!this.newAuthor.trim() || !this.newText.trim()) {
      alert('لطفاً نام و متن نظر خود را وارد کنید.');
      return;
    }

    const comment: Comment = {
      author: this.newAuthor,
      text: this.newText,
      rating: this.newRating,
      date: new Date()
    };

    // اضافه کردن نظر جدید به ابتدای لیست
    this.comments.unshift(comment);
    this.saveComments();

    // ریست کردن فرم پس از ارسال موفق
    this.newAuthor = '';
    this.newText = '';
    this.newRating = 5;
  }

  // محاسبه میانگین امتیاز کتاب
  getAverageRating(): number {
    if (this.comments.length === 0) return 0;
    const sum = this.comments.reduce((total, comment) => total + comment.rating, 0);
    return Math.round((sum / this.comments.length) * 10) / 10;
  }

}
