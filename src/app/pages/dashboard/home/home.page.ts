import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonSpinner,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonButton
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/component/navbar/navbar.component';
import { Product } from 'src/app/services/product';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonSpinner,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonButton,
    NavbarComponent,
  ],
})
export class HomePage implements OnInit {
  products: any[] = [];
  isLoading = true;

  currentPage = 1;
  limit = 10;
  total = 0;

  constructor(
    private productService: Product,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;

    const skip = (this.currentPage - 1) * this.limit;

    this.productService.getProducts(this.limit, skip).subscribe({
      next: (res) => {
        this.products = res.products;
        this.total = res.total;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  nextPage() {
    if (this.currentPage * this.limit < this.total) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  goDetail(id: number) {
    this.router.navigate(['/product-detail', id]);
  }
}