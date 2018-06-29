import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { Student } from '../model/student';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents(phdId, cycleId) {
    return this.http.get<Student[]>('http://localhost:3000/phdPrograms/' + phdId + '/cycleOfPhds/' + cycleId + '/students?_expand=faculty')
      .pipe(catchError(this.handleErrorObservable));
  }

  getStudent(id) {
    return this.http.get<Student>('http://localhost:3000/students/' + id + '?_expand=faculty')
      .pipe(catchError(this.handleErrorObservable));
  }

  addStudent(phdId, cycleId, student) {
    delete student.faculty;
    return this.http.post('http://localhost:3000/phdPrograms/' + phdId + '/cycleOfPhds/' + cycleId + '/students', student)
      .pipe(catchError(this.handleErrorObservable));;
  }

  patchStudent(id, student) {
    delete student.faculty;
    console.log(student);
    return this.http.patch('http://localhost:3000/students/' + id, student)
      .pipe(catchError(this.handleErrorObservable));
  }

  deleteStudent(id) {
    return this.http.delete('http://localhost:3000/' + id)
      .pipe(catchError(this.handleErrorObservable));
  }

  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
