import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { Scholar } from '../model/scholar';

import { GeneralService } from './general.service';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScholarService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  getScholars(phdId) {
    return this.http.get<Scholar[]>(`${ this.general.uri }/phdPrograms/${ phdId }/scholars`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  getScholar(id) {
    return this.http.get<Scholar>(`${ this.general.uri }/scholars/${ id }`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  patchScholar(id, scholar) {
    return this.http.patch(`${ this.general.uri }/scholars/${ id }`, scholar)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  addScholar(phdId, scholar) {
    return this.http.post(`${ this.general.uri }/phdPrograms/${ phdId }/scholars/`, scholar)
      .pipe(catchError(this.general.handleErrorObservable));
  }
}
