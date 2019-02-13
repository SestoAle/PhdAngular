import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { Scholar } from '../model/scholar';
import { Course } from '../model/course';

import { GeneralService } from './general.service';

import { routes } from './routes';

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
    return this.http.get<Scholar[]>(`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.scholar }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get a scholar
  getScholar(id) {
    return this.http.get<Scholar>(`${ routes.uri }/${ routes.scholar }/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all courses of a scholar
  getCourses(scholarId) {
    return this.http.get<Course[]>(`${ routes.uri }/${ routes.scholar }/${ scholarId }/${ routes.course }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Put a scholar
  putScholar(id, scholar) {
    return this.http.put(`${ routes.uri }/${ routes.scholar }/${ id }`, scholar)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Add a scholar
  addScholar(phdId, scholar) {
    return this.http.post(`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.scholar }/`, scholar)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Delete a scholar
  deleteScholar(scholarId) {
    return this.http.delete(`${ routes.uri }/${ routes.scholar }/${ scholarId }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
