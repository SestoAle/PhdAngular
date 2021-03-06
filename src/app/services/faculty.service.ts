import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { Faculty } from '../model/faculty';
import { Course } from '../model/course';
import { Student } from '../model/student';

import { GeneralService } from './general.service';

import { routes } from './routes';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  // Get all faculties in a cycle
  getFaculties(phdId, cycleId) {
    return this.http.get<Faculty[]>
      (`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.cycleOfPhd }/${ cycleId }/${ routes.faculty }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all faculties in a PhD
  getAllFaculties(phdId) {
    return this.http.get<Faculty[]> (`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.faculty }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all students of a faculty, including their events and reports
  getFacultyStudents(facultyId) {
    return this.http.get<Student[]>
      (`${ routes.uri }/${ routes.faculty }/${ facultyId }/${ routes.student }?_embed=events&_embed=reports`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Add a in a cycle faculty
  addFaculty(phdId, cycleId, faculty) {
    return this.http.post
      (`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.cycleOfPhd }/${ cycleId }/${ routes.faculty }`, faculty)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get a faculty
  getFaculty(id) {
    return this.http.get<Faculty>(`${ routes.uri }/${ routes.faculty }/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all courses of a faculty
  getCourses(facultyId) {
    return this.http.get<Course[]>(`${ routes.uri }/${ routes.faculty }/${ facultyId }/${ routes.course }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Delete a faculty
  deleteFaculty(id) {
    return this.http.delete(`${ routes.uri }/${ routes.faculty }/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Put a faculty
  putFaculty(id, faculty) {
    return this.http.put(`${ routes.uri }/${ routes.faculty }/${ id }`, faculty)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
