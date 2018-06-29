import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { PhdProgramService } from '../../services/phd-program.service';
import { CycleService } from '../../services/cycle.service';
import { PhdProgram } from '../../model/phdProgram';
import { CycleOfPhd } from '../../model/cycleOfPhd';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-cycle',
  templateUrl: './add-cycle.component.html',
  styleUrls: ['./add-cycle.component.css']
})
export class AddCycleComponent implements OnInit {

  newCycle = new CycleOfPhd;
  phdId;
  phd = new PhdProgram();
  update = false;
  cycles = [];
  lastCycle = 0;
  toolbarTitle = 'Add Cycle to Phd';
  loading = false;
  error = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private phdService: PhdProgramService,
    private cycleService: CycleService,
    private location: Location) { }

  ngOnInit() {
    this.update = false;
    const cycleId = +this.route.snapshot.paramMap.get('cycleId');
    if (cycleId >= 0) {
      this.update = true;
      this.cycleService.getCycle(cycleId).subscribe(
        result => { this.newCycle = result; },
        error => { console.log(error); }
      );
    }

    this.phdId = this.route.snapshot.paramMap.get('phdId');
    this.phdService.getPhd(this.phdId).subscribe(result => {
      this.phd = result;
      this.cycleService.getCycles(this.phdId).subscribe( data => {
        this.cycles = data;
        if (this.cycles.length > 0) {
          this.lastCycle = this.cycles[this.cycles.length - 1].num;
        }
        this.toolbarTitle = this.toolbarTitle + this.phd.name; },
        error => { console.log(error); }
      );
    });
  }

    addCycle() {
      this.loading = true;
      this.error = '';
      if (!this.update) {
        this.cycleService.addCycle(this.phd.id, this.newCycle).subscribe(
        data => { this.location.back(); },
        error => { console.log(error); }
        );
      } else {
        this.cycleService.patchCycle(this.newCycle.id, this.newCycle).subscribe(
        data => { this.location.back(); },
        error => { console.log(error); }
        );
      }
  }
}
