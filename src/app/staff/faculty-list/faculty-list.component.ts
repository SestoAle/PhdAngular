import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

import { PhdProgram } from '../../model/phdProgram';
import { CycleOfPhd } from '../../model/cycleOfPhd';
import { Faculty } from '../../model/faculty';

import { FacultyService } from '../../services/faculty.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit, OnChanges {

  @Input() phd: PhdProgram;
  @Input() cycle: CycleOfPhd;

  faculties: Faculty[];

  constructor(private facultyService: FacultyService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.phd.id && this.cycle.id) {
      this.facultyService.getFaculties(this.phd.id, this.cycle.id).subscribe(
        result => {this.faculties = result; },
        error => { console.log(error); }
      );
    }
  }

  removeFaculty($event, id) {
    this.facultyService.deleteFaculty(id).subscribe(
      result =>
        this.facultyService.getFaculties(this.phd.id, this.cycle.id).subscribe(
          data => {this.faculties = data; },
          error => { console.log(error); }
         ));
  }


}
