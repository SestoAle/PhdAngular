import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public uri = 'http://localhost:3000';
  public error = false;

  constructor() { }

  handleErrorObservable (error: Response | any) {
    alert('An error has occurred! Try again or reload the page.');
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
