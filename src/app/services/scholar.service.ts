import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { Scholar } from '../model/scholar';
import { Course } from '../model/course';

import { GeneralService } from './general.service';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScholarService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  // Get all scholars in a PhD
  getScholars(phdId) {
    return this.http.get<Scholar[]>(`${ this.general.uri }/phdPrograms/${ phdId }/scholars`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get a scholar
  getScholar(id) {
    return this.http.get<Scholar>(`${ this.general.uri }/scholars/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all courses of a scholar
  getCourses(scholarId) {
    return this.http.get<Course[]>(`${ this.general.uri }/scholars/${ scholarId }/courses`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Patch a scholar
  patchScholar(id, scholar) {
    return this.http.patch(`${ this.general.uri }/scholars/${ id }`, scholar)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Add a scholar
  addScholar(phdId, scholar) {
    return this.http.post(`${ this.general.uri }/phdPrograms/${ phdId }/scholars/`, scholar)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
