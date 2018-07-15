import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Student } from '../../model/student';
import { Report } from '../../model/report';

import { ActivatedRoute } from '@angular/router';

import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {

  toolbarTitle = 'Add report';

  student: Student = new Student();
  newReport: Report = new Report();
  newFile: File = null;
  loading = false;
  update = false;

  constructor(
    private reportService: ReportService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get current user from local storage
    this.student = JSON.parse(localStorage.getItem('currentUser'));
    const reportId = +this.route.snapshot.paramMap.get('id');
    // Check if this is an update operation or a create one:
    // if parameter reportId of routing is > 0, then is an update operation
    if (reportId > 0) {
      this.update = true;
      this.reportService.getReport(reportId).subscribe(
        result => { this.newReport = result; },
        error => { console.log(error); }
      );
    } else if (this.student.role === 'student') {
      this.newReport.studentId = this.student.id;
      this.newReport.phdProgramId = this.student.phdProgramId;
    }
  }

  addReport() {
    this.loading = true;
    if (this.newFile) {
      // TODO in Back-end
      // upload newFile to the server
    }
    let observable;
    // If it's an update operation, make a Patch request
    // If it isn't, make a Post request
    if (this.update) {
      observable = this.reportService.putReport(this.newReport);
    } else {
      observable = this.reportService.addReport(this.newReport);
    }
    observable.subscribe(
      result => { this.loading = false; this.location.back(); },
      error => { this.loading = false; console.log(error); }
    );
  }

  inputFile(event) {
    // Manage the input of type 'file'
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.newFile = fileList[0];
      this.newReport.relation = this.newFile.name;
    } else {
      this.newFile = null;
      this.newReport.relation = this.newFile.name;
    }
    console.log(this.newReport.relation);
  }
}
