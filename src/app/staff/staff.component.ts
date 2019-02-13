import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { PhdProgramService } from '../services/phd-program.service';
import { PhdProgram } from '../model/phdProgram';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  toolbarTitle = 'PhD Programs';
  phdPrograms: PhdProgram[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private phdService: PhdProgramService) {}

  ngOnInit() {
    // Get all PhDs
    this.phdService.getPhdPrograms().subscribe(
      result => this.phdPrograms = result,
      error => { console.log(error); }
    );
  }

  removePhd(event, id) {
    // Delete a PhD
    this.phdService.deletePhd(id).subscribe(
      result => { this.ngOnInit(); },
      error => { console.log(error); });
  }
}
