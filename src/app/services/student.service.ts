import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { Student } from '../model/student';

import { GeneralService } from './general.service';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  getStudents(phdId, cycleId) {
    return this.http.get<Student[]>(`${ this.general.uri }/phdPrograms/${ phdId }/cycleOfPhds/${ cycleId }/students?_expand=faculty`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  getStudent(id) {
    return this.http.get<Student>(`${ this.general.uri }/students/${ id }?_expand=faculty`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  addStudent(phdId, cycleId, student) {
    // Back-end operations
    delete student.faculty;
    return this.http.post(`${ this.general.uri }/phdPrograms/${ phdId }/cycleOfPhds/${ cycleId }/students`, student)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  patchStudent(id, student) {
    // Back-end operation
    delete student.faculty;
    return this.http.patch(`${ this.general.uri }/students/${ id }`, student)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  deleteStudent(id) {
    return this.http.delete(`${ this.general.uri }/students/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
