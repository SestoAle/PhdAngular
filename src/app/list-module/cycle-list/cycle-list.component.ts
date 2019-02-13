import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PhdProgramService } from '../../services/phd-program.service';
import { CycleService } from '../../services/cycle.service';

import { PhdProgram } from '../../model/phdProgram';
import { CycleOfPhd } from '../../model/cycleOfPhd';

@Component({
  selector: 'app-cycle-list',
  templateUrl: './cycle-list.component.html',
  styleUrls: ['./cycle-list.component.css']
})
export class CycleListComponent implements OnInit {

  @Input() phd: PhdProgram;
  @Input() cycles: CycleOfPhd[] = [];
  @Output() removingCycle: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cycleService: CycleService) { }

  ngOnInit() {
  }

  removeCycle($event, id) {
     // Delete the cycle and emit the event that notify the component parent
    this.cycleService.deleteCycle(id).subscribe(
      result => {
        this.removingCycle.emit();
      },
      error => { console.log(error); }
    );
  }

}
