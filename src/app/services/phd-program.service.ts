import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { PhdProgram } from '../model/phdProgram';

import { routes } from './routes';

import { GeneralService } from './general.service';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PhdProgramService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  // Get all PhDs
  getPhdPrograms() {
    return this.http.get<PhdProgram[]>(`${ routes.uri }/${ routes.phdProgram }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Add a PhD
  addPhd(phd) {
    return this.http.post(`${ routes.uri }/${ routes.phdProgram }`, phd)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get a PhD
  getPhd(id) {
    return this.http.get<PhdProgram>(`${ routes.uri }/${ routes.phdProgram }/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Delete a PhD
  deletePhd(id) {
    return this.http.delete(`${ routes.uri }/${ routes.phdProgram }/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Put a PhD
  putPhd(id, changes) {
    return this.http.put(`${ routes.uri }/${ routes.phdProgram }/${ id }`, changes)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
