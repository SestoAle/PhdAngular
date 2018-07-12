import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Event } from '../../model/event';
import { Report } from '../../model/report';
import { Student } from '../../model/student';

@Component({
  selector: 'app-faculty-event-list',
  templateUrl: './faculty-event-list.component.html',
  styleUrls: ['./faculty-event-list.component.css']
})
export class FacultyEventListComponent implements OnInit {

  @Input() students: Student[] = [];

  @Output() approvingEvent: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() approvingReport: EventEmitter<Report> = new EventEmitter<Report>();

  constructor() { }

  ngOnInit() {
  }

  approveEvent(event) {
    this.approvingEvent.emit(event);
  }

  approveReport(report) {
    this.approvingReport.emit(report);
  }
}
