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

  toolbarTitle = 'Add Cycle to Phd';

  newCycle = new CycleOfPhd;
  phdId;
  phd = new PhdProgram();
  update = false;
  cycles = [];
  lastCycle = 0;
  loading = false;
  error = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private phdService: PhdProgramService,
    private cycleService: CycleService,
    private location: Location) { }

  ngOnInit() {
    this.update = false;

    // Get cycleId from the route parameter: if it's > 0, then is an update operation;
    // else is a create operation
    const cycleId = +this.route.snapshot.paramMap.get('cycleId');
    if (cycleId >= 0) {
      this.update = true;
      this.cycleService.getCycle(cycleId).subscribe(
        result => { this.newCycle = result; },
        error => { console.log(error); }
      );
    }

    // Get phdId from the parameter route
    this.phdId = this.route.snapshot.paramMap.get('phdId');
    this.newCycle.phdProgramId = this.phdId;

    // Get the PhD of this course
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
      this.newCycle.num = this.romanize(this.newCycle.numNumber);

      let observable;

      // If it's an update operation, make a Patch request
      // If it isn't, make a Post request
      if (!this.update) {
        observable = this.cycleService.addCycle(this.phd.id, this.newCycle);
      } else {
        observable = this.cycleService.putCycle(this.newCycle.id, this.newCycle);
      }

      observable.subscribe(
        data => { this.location.back(); },
        error => { console.log(error); }
      );
  }

  romanize (num) {
    // Convert from number to Roman number
    if (!+num) {
      return '';
    }
    const digits = String(+num).split('');
    const key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
           '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
           '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    let roman = '';
    let i = 3;
    while (i--) {
      roman = (key[+digits.pop() + (i * 10)] || '') + roman;
    }
    return Array(+digits.join('') + 1).join('M') + roman;
}

  deromanize (str) {
    // Convert from Roman Number to number
    str = str.toUpperCase();
    const validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/;
    const token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g;
    const key = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1};
    let num = 0;
    let m;
    if (!(str && validator.test(str))) {
      return '';
    }
    while (m = token.exec(str)) {
      num += key[m[0]];
    }
    return num;
  }
}
