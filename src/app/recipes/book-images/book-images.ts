import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-images',
  standalone: false,
  templateUrl: './book-images.html',
  styleUrl: './book-images.css',
})
export class BookImages {
  @Input() images: string[] = [];

  selectedImage: string = '';
  showModal: boolean = false;

  openImage(img: string) {
    this.selectedImage = img;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
