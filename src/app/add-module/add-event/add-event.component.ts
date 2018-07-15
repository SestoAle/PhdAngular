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
    // Get user data from localStorage
    this.student = JSON.parse(localStorage.getItem('currentUser'));

    // Check if this is an update operation or a create one:
    // if parameter eventId of routing is >= 0, then is an update operation
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
    // If it's an update operation, make a Patch request
    // If it isn't, make a Post request
    if (this.update) {
      observable = this.eventService.putEvent(this.newEvent);
    } else {
      observable = this.eventService.addEvent(this.newEvent);
    }
    observable.subscribe(
      result => { this.loading = false; this.location.back(); },
      error => { this.loading = false; console.log(error); }
    );
  }

}
