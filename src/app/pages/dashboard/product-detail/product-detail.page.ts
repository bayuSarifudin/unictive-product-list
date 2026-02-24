import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSpinner, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/services/product';
import { NavbarComponent } from 'src/app/component/navbar/navbar.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonSpinner,
    IonButton,
    NavbarComponent,
  ],
})
export class ProductDetailPage implements OnInit {
  product: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: Product,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.getProductById(id!).subscribe({
      next: (res) => {
        this.product = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
