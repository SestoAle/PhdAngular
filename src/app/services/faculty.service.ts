import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { Faculty } from '../model/faculty';
import { Course } from '../model/course';
import { Student } from '../model/student';

import { GeneralService } from './general.service';

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
    return this.http.get<Faculty[]> (`${ this.general.uri }/phdPrograms/${ phdId }/cycleOfPhds/${ cycleId }/faculties`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all faculties in a PhD
  getAllFaculties(phdId) {
    return this.http.get<Faculty[]> (`${ this.general.uri }/phdPrograms/${ phdId }/faculties`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all students of a faculty, including their events and reports
  getFacultyStudents(facultyId) {
    return this.http.get<Student[]> (`${ this.general.uri }/faculties/${ facultyId }/students?_embed=events&_embed=reports`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Add a in a cycle faculty
  addFaculty(phdId, cycleId, faculty) {
    return this.http.post(`${ this.general.uri }/phdPrograms/${ phdId }/cycleOfPhds/${ cycleId }/faculties`, faculty)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get a faculty
  getFaculty(id) {
    return this.http.get<Faculty>(`${ this.general.uri }/faculties/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all courses of a faculty
  getCourses(facultyId) {
    return this.http.get<Course[]>(`${ this.general.uri }/faculties/${ facultyId }/courses`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Delete a faculty
  deleteFaculty(id) {
    return this.http.delete(`${ this.general.uri }/faculties/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Patch a faculty
  patchFaculty(id, faculty) {
    return this.http.patch(`${ this.general.uri }/faculties/${ id }`, faculty)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
