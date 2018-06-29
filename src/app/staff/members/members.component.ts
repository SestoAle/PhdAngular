import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PhdProgram } from '../../model/phdProgram';
import { CycleOfPhd } from '../../model/cycleOfPhd';

import { PhdProgramService } from '../../services/phd-program.service';
import { CycleService } from '../../services/cycle.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  toolbarTitle = 'Members';

  phd = new PhdProgram();
  cycle = new CycleOfPhd();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private phdService: PhdProgramService,
    private cycleService: CycleService) { }

  ngOnInit() {
    const phdId = this.route.snapshot.paramMap.get('phd');
    const cycleId = this.route.snapshot.paramMap.get('cycle');

    this.phdService.getPhd(phdId).subscribe(
      result => { this.phd = result; },
      error => { console.log(error); }
    );
    this.cycleService.getCycle(cycleId).subscribe(
      result => { this.cycle = result; },
      error => { console.log(error); }
    );
  }

}
