import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Event } from '../../model/event';

import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  @Input() events: Event[] = [];
  @Output() removedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
  }

  removeEvent(ev, event) {
    this.eventService.deleteEvent(event).subscribe(
      result => { this.removedEvent.emit(); },
      error => { console.log(error); }
    );
  }

}
