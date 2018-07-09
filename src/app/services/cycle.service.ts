import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { CycleOfPhd } from '../model/cycleOfPhd';

import { GeneralService } from './general.service';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  addCycle(phdId, cycle) {
     return this.http.post(`${ this.general.uri }/phdPrograms/${ phdId }/cycleOfPhds`, cycle)
       .pipe(catchError(this.general.handleErrorObservable));
  }

  getCycles(phdId) {
    return this.http.get<CycleOfPhd[]>(`${ this.general.uri }/phdPrograms/${ phdId }/cycleOfPhds`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  deleteCycle(id) {
    return this.http.delete(`${ this.general.uri }/cycleOfPhds/${ id }`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  getCycle(id) {
    return this.http.get<CycleOfPhd>(`${ this.general.uri }/cycleOfPhds/${ id }`)
      .pipe(catchError(this.general.handleErrorObservable));
  }

  patchCycle(id, cycle) {
    return this.http.patch(`${ this.general.uri }/cycleOfPhds/${ id }`, cycle)
      .pipe(catchError(this.general.handleErrorObservable));
  }
}
