import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/auth/login', {username: username, password: password}).pipe(
      map(response => {
        let user = { username: username, password: password, token: response.access_token, role: response.role};
        //login succesfully if there's a jwt token in the response
        if (user && user.token) {
          //store user detail and jwt token in local storage to keep user logged in between page refreshes
          console.log(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
    );
  }

  logout() {
    //remove user from local storage to log out
    localStorage.removeItem('currentUser');
  }
}
