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
  courses: Course[];
  phdId;
  toolbarTitle = 'PhD';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private phdService: PhdProgramService,
    private courseService: CourseService,
    private cycleService: CycleService) { }

  ngOnInit() {

    //The switchMap operator also cancels previous in-flight requests. 
    //If the user re-navigates to this route with a new id while the phdService is still retrieving the old id, 
    //switchMap discards that old request and returns the hero for the new id.
    /*let observable: Observable<PhdProgram>;
    observable = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.phdService.getPhd(params.get('id'))
    ));
    observable.subscribe(result => {
      this.phd = result;
    });}*/
    this.phdId = this.route.snapshot.paramMap.get('id');
    this.phdService.getPhd(this.phdId).subscribe(
      result => { this.phd = result; },
      error => { console.log(error); }
    );
    this.courseService.getCourses(this.phdId).subscribe(
      result => { this.courses = result; },
      error => { console.log(error); }
    );
  }
  
  goToCourse(course) {
    this.router.navigate(['/add-course', this.phd.id, course.id]);
  }
}
