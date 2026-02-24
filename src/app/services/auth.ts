import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = 'https://dummyjson.com/auth';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.baseUrl}/login`, {
        username,
        password,
        expiresInMins: 480, // 8 jam
      })
      .pipe(
        tap((res) => {
          const expiry = Date.now() + 480 * 60 * 1000;

          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('tokenExpiry', expiry.toString());
          localStorage.setItem('user', JSON.stringify(res));
        }),
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    const expiry = localStorage.getItem('tokenExpiry');

    if (!token || !expiry) return false;

    return Date.now() < Number(expiry);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
