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

  // Get all events of a student
  getEvents(studentId) {
    return this.http.get<Event[]>(`${ this.general.uri }/students/${ studentId }/events`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all events of a PhD, including their students
  getAllEvents(phdId) {
    return this.http.get<Event[]>(`${ this.general.uri }/phdPrograms/${ phdId }/events?_expand=student`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get a event
  getEvent(id) {
    return this.http.get<Event>(`${ this.general.uri }/events/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all events of a PhD that need to be approve by coordinator, including their students
  getEventsToApprove(phdId) {
    return this.http.get<Event[]>
      (`${ this.general.uri }/phdPrograms/${ phdId }/events?approved=false&approvedByAdvisor=true&_expand=student`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Add an event
  addEvent(event) {
    return this.http.post(`${ this.general.uri }/events`, event)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Patch an event
  patchEvent(event) {
    return this.http.patch(`${ this.general.uri }/events/${ event.id }`, event)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Delete an event
  deleteEvent(event) {
    return this.http.delete(`${ this.general.uri }/events/${ event.id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
