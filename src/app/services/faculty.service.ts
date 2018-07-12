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

  getFaculties(phdId, cycleId) {
    return this.http.get<Faculty[]> (`${ this.general.uri }/phdPrograms/${ phdId }/cycleOfPhds/${ cycleId }/faculties`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  getAllFaculties(phdId) {
    return this.http.get<Faculty[]> (`${ this.general.uri }/phdPrograms/${ phdId }/faculties`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  getFacultyStudents(facultyId) {
    return this.http.get<Student[]> (`${ this.general.uri }/faculties/${ facultyId }/students?_embed=events&_embed=reports`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  addFaculty(phdId, cycleId, faculty) {
    return this.http.post(`${ this.general.uri }/phdPrograms/${ phdId }/cycleOfPhds/${ cycleId }/faculties`, faculty)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  getFaculty(id) {
    return this.http.get<Faculty>(`${ this.general.uri }/faculties/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  getCourses(facultyId) {
    return this.http.get<Course[]>(`${ this.general.uri }/faculties/${ facultyId }/courses`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  deleteFaculty(id) {
    return this.http.delete(`${ this.general.uri }/faculties/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  patchFaculty(id, faculty) {
    return this.http.patch(`${ this.general.uri }/faculties/${ id }`, faculty)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
