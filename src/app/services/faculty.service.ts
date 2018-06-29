import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { Faculty } from '../model/faculty';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private http: HttpClient) { }

  getFaculties(phdId, cycleId) {
    return this.http.get<Faculty[]> ('http://localhost:3000/phdPrograms/' + phdId + '/cycleOfPhds/' + cycleId + '/faculties')
      .pipe(catchError(this.handleErrorObservable));
  }

  addFaculty(phdId, cycleId, faculty) {
    return this.http.post('http://localhost:3000/phdPrograms/' + phdId + '/cycleOfPhds/' + cycleId + '/faculties', faculty)
      .pipe(catchError(this.handleErrorObservable));
  }

  getFaculty(id) {
    return this.http.get<Faculty>('http://localhost:3000/faculties/' + id)
      .pipe(catchError(this.handleErrorObservable));
  }

  deleteFaculty(id) {
    return this.http.delete('http://localhost:3000/faculties/' + id)
      .pipe(catchError(this.handleErrorObservable));
  }

  patchFaculty(id, faculty) {
    return this.http.patch('http://localhost:3000/faculties/' + id, faculty)
      .pipe(catchError(this.handleErrorObservable));
  }

  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
