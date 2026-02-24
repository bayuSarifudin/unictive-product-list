import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/dashboard/home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard],
    data: { title: 'Product List' }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'product-detail/:id',
    loadComponent: () =>
      import('./pages/dashboard/product-detail/product-detail.page').then(
        (m) => m.ProductDetailPage,
      ),
    canActivate: [AuthGuard],
    data: { title: 'Product Detail' }
  },
];
