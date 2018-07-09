import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { PhdProgram } from '../model/phdProgram';
import { Faculty } from '../model/faculty';
import { Course } from '../model/course';

import { PhdProgramService } from '../services/phd-program.service';
import { CourseService } from '../services/course.service';
import { FacultyService } from '../services/faculty.service';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.css']
})
export class CoordinatorComponent implements OnInit {

  toolbarTitle = 'Courses';
  phd: PhdProgram = new PhdProgram();
  allCourses: Course[] = [];
  registeredCourses: Course[] = [];
  coordinator: Faculty = new Faculty();

  constructor(
    private router: Router,
    private phdService: PhdProgramService,
    private facultyService: FacultyService,
    private courseService: CourseService) { }

  ngOnInit() {
    this.coordinator = JSON.parse(localStorage.getItem('currentUser'));
    this.phdService.getPhd(this.coordinator.phdProgramId).subscribe(
        data => { this.phd = data; },
        error => { console.log(error); });
    this.courseService.getCourses(this.coordinator.phdProgramId).subscribe(
      result => { this.allCourses = result; console.log(result); },
      error => { console.log(error); }
    );
    this.facultyService.getCourses(this.coordinator.id).subscribe(
      result => { this.registeredCourses = result; },
      error => { console.log(error); }
    );
  }

  modifyCourse(course) {
    this.router.navigate(['/add-course', this.phd.id, course.id]);
  }

  openCourse(course) {
    this.router.navigate(['/course', course.id]);
  }
}
