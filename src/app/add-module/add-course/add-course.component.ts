import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Course } from '../../model/course';
import { PhdProgram } from '../../model/phdProgram';
import { Schedule } from '../../model/schedule';
import { Scholar } from '../../model/scholar';
import { Faculty } from '../../model/faculty';

import { CourseService } from '../../services/course.service';
import { PhdProgramService } from '../../services/phd-program.service';
import { ScholarService } from '../../services/scholar.service';
import { FacultyService } from '../../services/faculty.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  toolbarTitle = 'Add Course';

  newCourse: Course = new Course();
  phd: PhdProgram = new PhdProgram();

  newScholar: Scholar = new Scholar();
  newSchedule: Schedule = new Schedule();

  scholarsList: Scholar[] = [];
  facultyList: Faculty[] = [];

  update = false;
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private phdService: PhdProgramService,
    private scholarService: ScholarService,
    private facultyService: FacultyService,
    private location: Location
  ) { }

  ngOnInit() {
    // Get IDs from routes
    const phdId = +this.route.snapshot.paramMap.get('phdId');
    const courseId = +this.route.snapshot.paramMap.get('courseId');

    // Get PhD of this course
    this.phdService.getPhd(phdId).subscribe(
      result => { this.phd = result; },
      error => { console.log(error); }
    );

    // Get all scholars in this PhD
    this.scholarService.getScholars(phdId).subscribe(
      result => { this.scholarsList = result; },
      error => { console.log(error); }
    );

    // Get all faculties in this PhD
    this.facultyService.getAllFaculties(phdId).subscribe(
      result => { this.facultyList = result; },
      error => { console.log(error); }
    );

    // Check if this is an update operation or a create one:
    // if parameter courseId of routing is > 0, then is an update operation
    if (courseId >= 0) {
      this.update = true;
      this.courseService.getCourse(courseId).subscribe(
        result => { this.newCourse = result; console.log(this.newCourse); },
        error => { console.log(error); }
      );
    }
  }

  addCourse() {
    this.loading = true;

    let observable;

    // If it's an update operation, make a Patch request
    // If it isn't, make a Post request
    if (!this.update) {
      observable = this.courseService.addCourse(this.phd.id, this.newCourse);
    } else {
      observable = this.courseService.patchCourse(this.newCourse.id, this.newCourse);
    }

    observable.subscribe(
      result => { this.loading = false; this.location.back(); },
      error => { this.loading = false, console.log(error); });
  }

  addScholar() {

    // Add a new scholar to the PhD and to this course
    this.newScholar.phdId = this.phd.id;
    this.scholarService.addScholar(this.newScholar.phdId, this.newScholar).subscribe(
      result => {
        this.newScholar = new Scholar();
        this.scholarService.getScholars(this.phd.id).subscribe(
          data => { this.scholarsList = data; },
          error => { console.log(error); }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  addSchedule() {
    // Add a new schedule
    this.newCourse.schedules.push(this.newSchedule);
    this.newCourse.schedules = this.newCourse.schedules.slice();
    this.newSchedule = new Schedule();
  }

  removeSchedule(schedule) {
    // Remove a schedule
    const index = this.newCourse.schedules.indexOf(schedule);
    this.newCourse.schedules.splice(index, 1);
    this.newCourse.schedules = this.newCourse.schedules.slice();
  }

}
