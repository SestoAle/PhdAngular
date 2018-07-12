import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Event } from '../../model/event';
import { Report } from '../../model/report';

@Component({
  selector: 'app-coordinator-event-list',
  templateUrl: './coordinator-event-list.component.html',
  styleUrls: ['./coordinator-event-list.component.css']
})
export class CoordinatorEventListComponent implements OnInit {

  @Input() events: Event[] = [];
  @Input() reports: Report[] = [];

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
