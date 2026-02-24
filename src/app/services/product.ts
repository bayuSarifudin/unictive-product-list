import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(limit: number, skip: number) {
    const params = new HttpParams()
      .set('limit', limit)
      .set('skip', skip);

    return this.http.get<any>(this.baseUrl, { params });
  }

  getProductById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}