import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private url = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  getTasks() {
    return this.httpClient.get<any>(this.url + '/tasks');
  }

  getPrivateTasks() {
    return this.httpClient.get<any>(this.url + '/private-tasks');
  }
}
