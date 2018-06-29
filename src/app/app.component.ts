import { Component, OnChanges } from '@angular/core';
import { Input, Output } from '@angular/core';

import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toolbarTitle = "Title";
  isLogged = false;

  updateToolbar(comp) {
    if (!(comp instanceof LoginComponent)) {
      this.isLogged = true;
    } else {
        this.isLogged = false;
    }
    if (comp.toolbarTitle) {
      this.toolbarTitle = comp.toolbarTitle;
    }
  }
}
