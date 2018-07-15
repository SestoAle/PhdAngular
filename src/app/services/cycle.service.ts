import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { CycleOfPhd } from '../model/cycleOfPhd';

import { GeneralService } from './general.service';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  // Add a cycle in a PhD
  addCycle(phdId, cycle) {
     return this.http.post(`${ this.general.uri }/phdPrograms/${ phdId }/cycleOfPhds`, cycle)
       .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all cycles in a PhD
  getCycles(phdId) {
    return this.http.get<CycleOfPhd[]>(`${ this.general.uri }/phdPrograms/${ phdId }/cycleOfPhds`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Delete a cycle
  deleteCycle(id) {
    return this.http.delete(`${ this.general.uri }/cycleOfPhds/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get a cycle
  getCycle(id) {
    return this.http.get<CycleOfPhd>(`${ this.general.uri }/cycleOfPhds/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Put a cycle
  putCycle(id, cycle) {
    return this.http.put(`${ this.general.uri }/cycleOfPhds/${ id }`, cycle)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
