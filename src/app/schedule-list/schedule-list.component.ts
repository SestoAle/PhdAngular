import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { Schedule } from '../model/schedule';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit, OnChanges {

  @Input() schedules;
  @Input() canRemove = true;
  @Output() removingSchedule: EventEmitter<Schedule> = new EventEmitter<Schedule>();
  displayedColumns: string[] = ['day', 'beginTime', 'endTime', 'location', 'remove'];


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  removeSchedule(schedule) {
    this.removingSchedule.emit(schedule);
  }

}
