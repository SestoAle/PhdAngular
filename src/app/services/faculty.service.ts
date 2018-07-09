import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { Faculty } from '../model/faculty';
import { Course } from '../model/course';

import { GeneralService } from './general.service';

import { map } from 'rxjs/operators';
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
      .pipe(catchError(this.general.handleErrorObservable));
  }

  getAllFaculties(phdId) {
    return this.http.get<Faculty[]> (`${ this.general.uri }/phdPrograms/${ phdId }/faculties`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  addFaculty(phdId, cycleId, faculty) {
    return this.http.post(`${ this.general.uri }/phdPrograms/${ phdId }/cycleOfPhds/${ cycleId }/faculties`, faculty)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  getFaculty(id) {
    return this.http.get<Faculty>(`${ this.general.uri }/faculties/${ id }`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  getCourses(facultyId) {
    return this.http.get<Course[]>(`${ this.general.uri }/faculties/${ facultyId }/courses`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  deleteFaculty(id) {
    return this.http.delete(`${ this.general.uri }/faculties/${ id }`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  patchFaculty(id, faculty) {
    return this.http.patch(`${ this.general.uri }/faculties/${ id }`, faculty)
      .pipe(catchError(this.general.handleErrorObservable));
  }
}
