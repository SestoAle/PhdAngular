import { Component, OnChanges } from '@angular/core';
import { Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { Faculty } from './model/faculty';
import { Scholar } from './model/scholar';
import { Student } from './model/student';

import { PhdProgramService } from './services/phd-program.service';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toolbarTitle = 'Title';
  isLogged = false;
  currentUser;

  constructor(
    private router: Router,
    private phdProgramService: PhdProgramService,
    private generalService: GeneralService
  ) {  }

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

  checkIfLogged() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).role;
    }
  }

  updatePage() {
    if (!localStorage.getItem('currentUser')) {
      return '';
    }
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const role = this.currentUser.role;

    switch (role) {
      case 'staff': {
        break;
      }
      case 'faculty':
      case 'coordinator': {
        this.currentUser = <Faculty> this.currentUser;
        return this.router.navigate(['/add-member',
          this.currentUser.phdProgramId, this.currentUser.cycleOfPhdId, 'faculty', this.currentUser.id]);
      }
      case 'scholar': {
        this.currentUser = <Scholar> this.currentUser;
        return this.router.navigate(['/add-member',
          this.currentUser.phdProgramId, -1, 'scholar', this.currentUser.id]);
      }
      case 'student': {
        this.currentUser = <Student> this.currentUser;
        return this.router.navigate(['/add-member',
          this.currentUser.phdProgramId, this.currentUser.cycleOfPhdId, 'student', this.currentUser.id]);
      }
      default: {
        return;
      }
    }
  }

  yeah() {
    console.log(this.generalService.getError());
    this.phdProgramService.getPhd(10).subscribe(
      result => {},
      error => { console.log(this.generalService.getError()); }
    );
  }
}
