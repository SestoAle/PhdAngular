import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { GeneralService } from './general.service';

import { Event } from '../model/event';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  getEvents(studentId) {
    return this.http.get<Event[]>(`${ this.general.uri }/students/${ studentId }/events`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  getAllEvents(phdId) {
    return this.http.get<Event[]>(`${ this.general.uri }/phdPrograms/${ phdId }/events?_expand=student`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  getEvent(id) {
    return this.http.get<Event>(`${ this.general.uri }/events/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  getEventsToApprove(phdId) {
    return this.http.get<Event[]>
      (`${ this.general.uri }/phdPrograms/${ phdId }/events?approved=false&approvedByAdvisor=true&_expand=student`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  addEvent(event) {
    return this.http.post(`${ this.general.uri }/events`, event)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  patchEvent(event) {
    return this.http.patch(`${ this.general.uri }/events/${ event.id }`, event)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  deleteEvent(event) {
    return this.http.delete(`${ this.general.uri }/events/${ event.id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
