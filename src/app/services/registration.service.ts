import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GeneralService } from './general.service';

import { Registration } from '../model/registration';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  getRegistrations(courseId) {
    return this.http.get<Registration[]>(`${ this.general.uri }/courses/${ courseId }/registrations?_expand=student`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  getStudentRegistrations(studentId) {
    return this.http.get<Registration[]>(`${ this.general.uri }/students/${ studentId }/registrations?_expand=course`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  deleteRegistration(id) {
    return this.http.delete(`${ this.general.uri }/registrations/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  addRegistration(studentId, registration) {
    return this.http.post(`${ this.general.uri }/students/${ studentId }/registrations/`, registration)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  patchRegistration(registration) {
    // Back-end operation
    // delete registration.student;
    // delete registration.course;
    return this.http.patch(`${ this.general.uri }/registrations/${ registration.id }`, registration)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
