import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { PhdProgram } from '../model/phdProgram';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PhdProgramService {

  constructor(private http: HttpClient) { }

  getPhdPrograms() {
    return this.http.get<PhdProgram[]>('http://localhost:3000/phdPrograms').pipe(catchError(this.handleErrorObservable));;
  }

  addPhd(phd) {
    return this.http.post('http://localhost:3000/phdPrograms', phd).pipe(catchError(this.handleErrorObservable));
  }

  getPhd(id) {
    return this.http.get<PhdProgram>('http://localhost:3000/phdPrograms/' + id).pipe(catchError(this.handleErrorObservable));;
  }

  deletePhd(id) {
    return this.http.delete('http://localhost:3000/phdPrograms/' + id).pipe(catchError(this.handleErrorObservable));;
  }

  patchPhd(id, changes) {
    return this.http.patch('http://localhost:3000/phdPrograms/' + id, changes).pipe(catchError(this.handleErrorObservable));
  }

  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
