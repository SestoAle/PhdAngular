import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { Student } from '../model/student';

import { GeneralService } from './general.service';

import { routes } from './routes';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  // Get all students of a cycle, including their advisor
  getStudents(phdId, cycleId) {
    return this.http.get<Student[]>
      (`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.cycleOfPhd }/${ cycleId }/${ routes.student }?_expand=faculty`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get a student
  getStudent(id) {
    return this.http.get<Student>(`${ routes.uri }/${ routes.student }/${ id }?_expand=faculty`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Add a student in a cycle
  addStudent(phdId, cycleId, student) {
    // Back-end operations
    delete student.faculty;
    return this.http.post
      (`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.cycleOfPhd }/${ cycleId }/${ routes.student }`, student)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Patch a student
  putStudent(id, student) {
    // Back-end operation
    delete student.faculty;
    return this.http.put(`${ routes.uri }/${ routes.student }/${ id }`, student)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Delete a student
  deleteStudent(id) {
    return this.http.delete(`${ routes.uri }/${ routes.student }/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
