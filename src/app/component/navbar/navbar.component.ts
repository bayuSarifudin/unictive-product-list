import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Auth } from 'src/app/services/auth';
import { IonHeader, IonButtons, IonTitle, IonToolbar, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonButton
],
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private auth = inject(Auth);

  title = '';

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let current = this.route.root;
        while (current.firstChild) {
          current = current.firstChild;
        }

        this.title = current.snapshot.data['title'] || '';
      });
  }

  logout() {
    this.auth.logout();
  }
}
