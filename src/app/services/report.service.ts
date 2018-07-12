import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

import { GeneralService } from './general.service';

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

  getReports(studentId) {
    return this.http.get<Report[]>(`${ this.general.uri }/students/${ studentId }/reports`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  getReport(id) {
    return this.http.get<Report>(`${ this.general.uri }/reports/${ id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  addReport(report) {
    return this.http.post(`${ this.general.uri }/reports`, report)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  patchReport(report) {
    return this.http.patch(`${ this.general.uri }/reports/${ report.id }`, report)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  getAllReports(phdId) {
    return this.http.get<Report[]>(`${ this.general.uri }/phdPrograms/${ phdId }/reports`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  getReportToApprove(phdId) {
    return this.http.get<Report[]>
      (`${ this.general.uri }/phdPrograms/${ phdId }/reports?approved=false&approvedByAdvisor=true&_expand=student`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }

  deleteReport(report) {
    return this.http.delete(`${ this.general.uri }/reports/${ report.id }`)
      .pipe(catchError(error => of(this.general.setError(true, error))));
  }
}
