import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from './user/user.model';

@Injectable()
export class AuthService {
  public user: User;
  protected storage = window.localStorage;

  constructor(private http: HttpClient) {}

  fetchUserById(userId): Observable<User> {
    return this.http
      .get(`http://5b681bf7629e280014570cad.mockapi.io/users/${userId}`)
      .map((response: any) => {
        return new User(response);
      });
  }
}
