import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonItem, IonButton, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, ReactiveFormsModule, IonItem, IonButton, IonInput],
})
export class LoginPage {
  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
  ) {}

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  submit() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.auth.login(username!, password!).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: () => {
        alert('Login gagal');
      },
    });
  }
}
