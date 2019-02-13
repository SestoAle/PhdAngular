import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { GeneralService } from './general.service';

import { routes } from './routes';

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
    return this.http.get<Event[]>(`${ routes.uri }/${ routes.student }/${ studentId }/${ routes.event }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all events of a PhD, including their students
  getAllEvents(phdId) {
    return this.http.get<Event[]>(`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.event }?_expand=student`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get a event
  getEvent(id) {
    return this.http.get<Event>(`${ routes.uri }/${ routes.event }/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all events of a PhD that need to be approve by coordinator, including their students
  getEventsToApprove(phdId) {
    return this.http.get<Event[]>
      (`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.event }?approved=false&approvedByAdvisor=true&_expand=student`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Add an event
  addEvent(event) {
    return this.http.post(`${ routes.uri }/${ routes.event }`, event)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Put an event
  putEvent(event) {
    return this.http.put(`${ routes.uri }/${ routes.event }/${ event.id }`, event)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Delete an event
  deleteEvent(event) {
    return this.http.delete(`${ routes.uri }/${ routes.event }/${ event.id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
