import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Registration } from '../../model/registration';

import {RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-student-registration-list',
  templateUrl: './student-registration-list.component.html',
  styleUrls: ['./student-registration-list.component.css']
})
export class StudentRegistrationListComponent implements OnInit {

  @Input() registrations: Registration[] = [];
  @Output() removingRegistration: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private registrationService: RegistrationService
  ) { }

  ngOnInit() {
  }

  removeRegistration(event, registration) {
    this.registrationService.deleteRegistration(registration.id).subscribe(
      result => {
        this.removingRegistration.emit();
      },
      error => { console.log(error); }
    );
  }

}
