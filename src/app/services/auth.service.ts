import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/api';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  signUp(user: User) {
    return this.httpClient.post<any>(this.url + '/signup', user);
  }
  signIn(user: User) {
    return this.httpClient.post<any>(this.url + '/signin', user);
  }

  loggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getToken() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return '';
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      this.router.navigate(['/signin']);
    }
  }
}
