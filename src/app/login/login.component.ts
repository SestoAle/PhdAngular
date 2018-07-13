import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  toolbarTitle = 'Sign in';
  model: any = {};
  loading = false;
  returnUrl: string;
  error = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    // Reset login status
    this.authService.logout();
    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password).pipe(first()).subscribe(
      data => { this.router.navigate(['/' + data.role]); },
      error => { console.log(error); this.error = error; this.loading = false; }
    );
  }
}
