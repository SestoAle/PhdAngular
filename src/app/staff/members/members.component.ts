import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PhdProgram } from '../../model/phdProgram';
import { CycleOfPhd } from '../../model/cycleOfPhd';
import { Student } from '../../model/student';
import { Faculty } from '../../model/faculty';
import { Scholar } from '../../model/scholar';

import { PhdProgramService } from '../../services/phd-program.service';
import { CycleService } from '../../services/cycle.service';
import { FacultyService } from '../../services/faculty.service';
import { StudentService } from '../../services/student.service';
import { ScholarService } from '../../services/scholar.service';

import { TabService } from '../../services/tab.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  toolbarTitle = 'Members';

  phd = new PhdProgram();
  cycle = new CycleOfPhd();
  students: Student[] = [];
  faculties: Faculty[] = [];
  scholars: Scholar[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private phdService: PhdProgramService,
    private cycleService: CycleService,
    private facultyService: FacultyService,
    private studentService: StudentService,
    private scholarService: ScholarService,
    private tabService: TabService) { }

  ngOnInit() {
    const phdId = this.route.snapshot.paramMap.get('phd');
    const cycleId = this.route.snapshot.paramMap.get('cycle');

    // Get the PhD
    this.phdService.getPhd(phdId).subscribe(
      result => { this.phd = result; },
      error => { console.log(error); }
    );

    // Get the cycle
    this.cycleService.getCycle(cycleId).subscribe(
      result => { this.cycle = result; },
      error => { console.log(error); }
    );

    // Get all faculties of this cycle
    this.facultyService.getFaculties(phdId, cycleId).subscribe(
      result => { this.faculties = result; },
      error => { console.log(error); }
    );

    // Get all students of this cycle
    this.studentService.getStudents(phdId, cycleId).subscribe(
      result => { this.students = result; },
      error => { console.log(error); }
    );

    // Get all scholars of this PhD
    this.scholarService.getScholars(phdId).subscribe(
      result => { this.scholars = result; },
      error => { console.log(error); }
    );
  }

}
