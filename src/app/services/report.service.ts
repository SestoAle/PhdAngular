import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { GeneralService } from './general.service';

import { routes } from './routes';

import { Report } from '../model/report';

import { catchError } from 'rxjs/operators';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
    private general: GeneralService
  ) { }

  // Get all reports of a student
  getReports(studentId) {
    return this.http.get<Report[]>(`${ routes.uri }/${ routes.student }/${ studentId }/${ routes.report }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get a report
  getReport(id) {
    return this.http.get<Report>(`${ routes.uri }/${ routes.report }/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Add a report
  addReport(report) {
    return this.http.post(`${ routes.uri }/${ routes.report }`, report)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Put a report
  putReport(report) {
    return this.http.put(`${ routes.uri }/${ routes.report }/${ report.id }`, report)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all reports of a PhD
  getAllReports(phdId) {
    return this.http.get<Report[]>(`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.report }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Get all the reports in a PhD that need to be approved by coordinator
  getReportToApprove(phdId) {
    return this.http.get<Report[]>
      (`${ routes.uri }/${ routes.phdProgram }/${ phdId }/${ routes.report }?approved=false&approvedByAdvisor=true&_expand=student`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  // Delete a report
  deleteReport(report) {
    return this.http.delete(`${ routes.uri }/${ routes.report }/${ report.id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
