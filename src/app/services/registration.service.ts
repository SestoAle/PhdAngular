import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GeneralService } from './general.service';

import { routes } from './routes';

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

  // Get all registrations of a course, including their students
  getRegistrations(courseId) {
    return this.http.get<Registration[]>(`${ routes.uri }/${ routes.course }/${ courseId }/${ routes.registration }?_expand=student`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all registrations of a student, including their courses
  getStudentRegistrations(studentId) {
    return this.http.get<Registration[]>(`${ routes.uri }/${ routes.student }/${ studentId }/${ routes.registration }?_expand=course`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Delete a registration
  deleteRegistration(id) {
    return this.http.delete(`${ routes.uri }/${ routes.registration }/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Add a registration
  addRegistration(studentId, registration) {
    return this.http.post(`${ routes.uri }/${ routes.student }/${ studentId }/${ routes.registration }/`, registration)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Put a registration
  putRegistration(registration) {
    // Back-end operation
    // delete registration.student;
    // delete registration.course;
    return this.http.put(`${ routes.uri }/${ routes.registration }/${ registration.id }`, registration)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
