import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3000/user';

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get<any>(this.url);
  }

  updateUser(user: User) {
    return this.httpClient.put(this.url + `/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.httpClient.delete(this.url + `/${_id}`);
  }

  getUser(_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + `/${_id}`);
  }

  getUserByToken() {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = token.split('.')[1];
        const payloadDecoded = atob(payload);
        return JSON.parse(payloadDecoded);
      }
    }
    return null;
  }
}
