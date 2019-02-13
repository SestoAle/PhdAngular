import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';

import { PhdProgram } from '../../model/phdProgram';
import { CycleOfPhd } from '../../model/cycleOfPhd';
import { Faculty } from '../../model/faculty';

import { map } from 'rxjs/operators';

import { FacultyService } from '../../services/faculty.service';
import { CycleService } from '../../services/cycle.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {

  @Input() phd: PhdProgram;
  @Input() cycle: CycleOfPhd;
  @Input() faculties: Faculty[] = [];

  @Output() updateFaculty: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private facultyService: FacultyService,
    private cycleService: CycleService
  ) { }

  ngOnInit() {
  }

  removeFaculty($event, id) {
    // Delete the faculty and emit the event that notify the component parent
    this.facultyService.deleteFaculty(id).subscribe(
      result => { this.updateFaculty.emit(); },
      error => { console.log(error); }
    );
  }

  importFaculty() {
    // Import faculties from the previous cycle, if it exist
    this.facultyService.getFaculties(this.phd.id, (this.cycle.id - 1))
      .pipe(map(
        faculties => faculties
          .forEach(faculty => {faculty.id = null; this.facultyService.addFaculty(this.phd.id, this.cycle.id, faculty).subscribe(); })))
      .subscribe(
        result => this.updateFaculty.emit()
      );
  }
}
