import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GeneralService } from './general.service';

import { Registration } from '../model/registration';

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
      .pipe(catchError(this.general.handleErrorObservable));
  }

  getStudentRegistrations(studentId) {
    return this.http.get<Registration[]>(`${ this.general.uri }/students/${ studentId }/registrations?_expand=course`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  deleteRegistration(id) {
    return this.http.delete(`${ this.general.uri }/registrations/${ id }`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  addRegistration(studentId, registration) {
    return this.http.post(`${ this.general.uri }/students/${ studentId }/registrations/`, registration)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  patchRegistration(registration) {
    // Back-end operation
    // delete registration.student;
    // delete registration.course;
    return this.http.patch(`${ this.general.uri }/registrations/${ registration.id }`, registration)
      .pipe(catchError(this.general.handleErrorObservable));
  }
}
