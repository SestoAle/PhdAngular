import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class GeneralService {

  public uri = 'http://localhost:3000';
  error = false;

  constructor() {
  }

  handleErrorObservable (error: Response | any) {
    alert('An error has occurred! Try again or reload the page.');
    console.error(error.message || error);
  }

  setError(val, error: Response | any): any {
    this.error = val;
    return Observable.throw(error.message || error);
  }

  getError() {
    return this.error;
  }

  removeError() {
    this.error = false;
  }
}
