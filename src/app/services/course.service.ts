import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { Course } from '../model/course';
import { Scholar } from '../model/scholar';
import { GeneralService } from './general.service';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { routes } from './routes';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  // Get all courses of a PhD
  getCourses(phdId) {
    return this.http.get<Course[]>(`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.course }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all scholars of a course
  getScholarInCourse(id) {
    return this.http.get<Scholar[]>(`${ routes.uri }/${ routes.course }/${ id }/${ routes.scholar }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get a course
  getCourse(id) {
    return this.http.get<Course>(`${ routes.uri }/${ routes.course }/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Delete a course
  deleteCourse(id) {
    return this.http.delete(`${ routes.uri }/${ routes.course }/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Add a course
  addCourse(phdId, course) {
    return this.http.post(`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.course }`, course)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Put a course
  putCourse(id, course) {
    return this.http.put(`${ routes.uri }/${ routes.course }/${ id }`, course)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get a course of a faculty
  getFacultyCourse(facultyId, courseId) {
    return this.http.get<Course>(`${ routes.uri }/${ routes.faculty }/${ facultyId }/${ routes.course }/${ courseId }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Add material to a course
  addMaterial(facultyId, course) {
    return this.http.patch(`${ routes.uri }/${ routes.course }/${ course.id }`, course)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Template to upload a file
  uploadMaterial(courseId, file) {
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.http.post(`${ routes.uri }`, formData, {headers: headers})
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
