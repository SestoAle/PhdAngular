import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { routes } from './routes';

import { map } from 'rxjs/operators';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${ routes.uri }/${ routes.auth }`, {username: username, password: password}).pipe(
      map(response => {
        const user = response.user;
        user.token = response.token;
        console.log(user);
        // Login successfully if there's a jwt token in the response
        if (user && user.token) {
          // Store user detail and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
    );
  }

  logout() {
    // Remove user from local storage to log out
    localStorage.clear();
  }
}
