import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PhdProgramService } from '../../services/phd-program.service';
import { CycleService } from '../../services/cycle.service';
import { CourseService } from '../../services/course.service';

import { PhdProgram } from '../../model/phdProgram';
import { CycleOfPhd } from '../../model/cycleOfPhd';
import { Course } from '../../model/course';

@Component({
  selector: 'app-phd',
  templateUrl: './phd.component.html',
  styleUrls: ['./phd.component.css']
})
export class PhdComponent implements OnInit {

  phd = new PhdProgram();
  courses: Course[] = [];
  cycles: CycleOfPhd[] = [];
  phdId;
  toolbarTitle = 'PhD';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private phdService: PhdProgramService,
    private courseService: CourseService,
    private cycleService: CycleService) { }

  ngOnInit() {

    this.phdId = this.route.snapshot.paramMap.get('id');
    this.phdService.getPhd(this.phdId).subscribe(
      result => { this.phd = result; },
      error => { console.log(error); }
    );
    this.courseService.getCourses(this.phdId).subscribe(
      result => { this.courses = result; },
      error => { console.log(error); }
    );
    this.cycleService.getCycles(this.phdId).subscribe(
      result => { this.cycles = result; },
      error => { console.log(error); }
    );
  }

  goToCourse(course) {
    this.router.navigate(['/add-course', this.phd.id, course.id]);
  }
}
