import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // This guard is activated whenever a route is activated
    // Get the roles that can access the route
    const roles = route.data['roles'] as Array<string>;

    // Check if the user is stored in the local storage
    if (localStorage.getItem('currentUser')) {
      // If true, the user is logged
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // Check if the current user role can access the component
      for (const role of roles) {
        if (currentUser.role === role) {
          return true;
        }
      }
    }
    // If false, redirect to the login page
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
