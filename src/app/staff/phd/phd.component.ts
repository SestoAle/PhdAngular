import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PhdProgramService } from '../../services/phd-program.service';
import { CycleService } from '../../services/cycle.service';

import { PhdProgram } from '../../model/phdProgram';
import { CycleOfPhd } from '../../model/cycleOfPhd';

@Component({
  selector: 'app-phd',
  templateUrl: './phd.component.html',
  styleUrls: ['./phd.component.css']
})
export class PhdComponent implements OnInit {

  phd = new PhdProgram();
  cycles = null;
  toolbarTitle = "PhD";

  constructor(private router: Router,
    private route: ActivatedRoute,
    private phdService: PhdProgramService,
    private cycleService: CycleService) { }

  ngOnInit() {

    //The switchMap operator also cancels previous in-flight requests. 
    //If the user re-navigates to this route with a new id while the phdService is still retrieving the old id, 
    //switchMap discards that old request and returns the hero for the new id.
    this.phd = new PhdProgram();
    let observable: Observable<PhdProgram>;
    observable = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.phdService.getPhd(params.get('id'))
    ));

    observable.subscribe(result => {
      this.phd = result;
      this.cycleService.getCycles(this.phd.id).subscribe(
        data => { this.cycles = data; },
        error => { console.log(error); }
      );
    });
  }

  removeCycle($event, id) {
    this.cycleService.deleteCycle(id).subscribe(
      result => { this.ngOnInit(); },
      error => { console.log(error); }
    );
  }
}
