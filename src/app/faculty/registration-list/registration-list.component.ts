import { Component, OnInit, Input } from '@angular/core';

import { Registration } from '../../model/registration';

import { RegistrationService } from '../../services/registration.service'

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {

  @Input() registrations: Registration[] = null;

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  submitGrade(registration: Registration, grade) {
    registration.grade = grade;
    this.registrationService.patchRegistration(registration).subscribe(
      result => { console.log(result); },
      error => { console.log(error); }
    );
  }

  sendEmail(body, email) {
    //TODO send real email
    console.log(body + " " + email);
  }

}
