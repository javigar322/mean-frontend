import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isDarkTheme = false;
  constructor(public authService: AuthService) {}
  toggleTheme() {
    const body = document.body;

    if (this.isDarkTheme) {
      body.setAttribute('data-bs-theme', 'light');
    } else {
      body.setAttribute('data-bs-theme', 'dark');
    }

    this.isDarkTheme = !this.isDarkTheme;
  }
}
