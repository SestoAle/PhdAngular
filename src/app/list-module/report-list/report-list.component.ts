import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Report } from '../../model/report';

import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  @Input() reports: Report[] = [];

  @Output() removedReport: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
  }

  removeReport(event, report) {
    // Delete the report and emit the event that notify the component parent
    this.reportService.deleteReport(report).subscribe(
      result => { this.removedReport.emit(); },
      error => { console.log(error); }
    );
  }

}
