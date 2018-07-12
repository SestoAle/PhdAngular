import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Event } from '../../model/event';
import { Student } from '../../model/student';

import { Location } from '@angular/common';

import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  toolbarTitle = 'Add Event';

  student: Student;
  newEvent: Event = new Event();
  loading = false;
  update;

  constructor(
    private eventService: EventService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.student = JSON.parse(localStorage.getItem('currentUser'));
    const eventId = +this.route.snapshot.paramMap.get('id');
    if (eventId >= 0) {
      this.update = true;
      this.eventService.getEvent(eventId).subscribe(
        result => { this.newEvent = result; },
        error => { console.log(error); }
      );
    } else {
      this.newEvent.studentId = this.student.id;
      this.newEvent.phdProgramId = this.student.phdProgramId;
    }
  }

  addEvent() {
    this.loading = true;
    let observable;
    if (this.update) {
      observable = this.eventService.patchEvent(this.newEvent);
    } else {
      observable = this.eventService.addEvent(this.newEvent);
    }
    observable.subscribe(
      result => { this.loading = false; this.location.back(); },
      error => { this.loading = false; console.log(error); }
    );
  }

}
