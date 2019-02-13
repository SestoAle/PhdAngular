import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Scholar } from '../../model/scholar';
import { PhdProgram } from '../../model/phdProgram';
import { CycleOfPhd } from '../../model/cycleOfPhd';

import { ScholarService } from '../../services/scholar.service';

@Component({
  selector: 'app-scholar-list',
  templateUrl: './scholar-list.component.html',
  styleUrls: ['./scholar-list.component.css']
})
export class ScholarListComponent implements OnInit {

  @Input() phd: PhdProgram;
  @Input() cycle: CycleOfPhd;
  @Input() scholars: Scholar[] = [];

  @Output() removingScholar: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private scholarService: ScholarService
  ) { }

  ngOnInit() {
  }

  removeFaculty($event, id) {

    // Delete the scholar and emit the event that notify the component parent
    this.scholarService.deleteScholar(id).subscribe(
      result => { this.removingScholar.emit(); },
      error => { console.log(error); }
    );
  }
}
