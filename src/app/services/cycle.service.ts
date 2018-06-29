import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { CycleOfPhd } from '../model/cycleOfPhd';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  constructor(private http: HttpClient) { }

  addCycle(phdId, cycle) {
     return this.http.post('http://localhost:3000/phdPrograms/' + phdId + '/cycleOfPhds', cycle)
       .pipe(catchError(this.handleErrorObservable));
  }

  getCycles(phdId) {
    return this.http.get<CycleOfPhd[]>('http://localhost:3000/phdPrograms/' + phdId + '/cycleOfPhds')
      .pipe(catchError(this.handleErrorObservable));
  }

  deleteCycle(id) {
    return this.http.delete('http://localhost:3000/cycleOfPhds/' + id)
      .pipe(catchError(this.handleErrorObservable));
  }

  getCycle(id) {
    return this.http.get<CycleOfPhd>('http://localhost:3000/cycleOfPhds/' + id)
      .pipe(catchError(this.handleErrorObservable));
  }

  patchCycle(id, cycle) {
    return this.http.patch('http://localhost:3000/cycleOfPhds/' + id, cycle)
      .pipe(catchError(this.handleErrorObservable));
  }

  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
