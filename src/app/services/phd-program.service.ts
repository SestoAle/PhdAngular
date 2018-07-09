import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { PhdProgram } from '../model/phdProgram';

import { GeneralService } from './general.service';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PhdProgramService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  getPhdPrograms() {
    return this.http.get<PhdProgram[]>(`${ this.general.uri }/phdPrograms`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  addPhd(phd) {
    return this.http.post(`${ this.general.uri }/phdPrograms`, phd)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  getPhd(id) {
    return this.http.get<PhdProgram>(`${ this.general.uri }/phdPrograms/${ id }`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  deletePhd(id) {
    return this.http.delete(`${ this.general.uri }/phdPrograms/${ id }`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  patchPhd(id, changes) {
    return this.http.patch(`${ this.general.uri }/phdPrograms/${ id }`, changes)
      .pipe(catchError(this.general.handleErrorObservable));
  }
}
