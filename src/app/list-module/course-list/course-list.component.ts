import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

import { Course } from '../../model/course';
import { Scholar } from '../../model/scholar';
import { Faculty } from '../../model/faculty';
import { Student } from '../../model/student';
import { PhdProgram } from '../../model/phdProgram';

import { CourseService } from '../../services/course.service';
import { ScholarService } from '../../services/scholar.service';
import { FacultyService } from '../../services/faculty.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  @Input() phd: PhdProgram;
  @Input() faculty: Faculty;
  @Input() student: Student;
  @Input() courses: Course[];

  @Output() courseClick: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() removingCourse: EventEmitter<any> = new EventEmitter<any>();

  scholars: Scholar[] = [];

  constructor(
    private courseService: CourseService,
    private scholarService: ScholarService,
    private facultyService: FacultyService,
    private router: Router) { }

  ngOnInit() {
  }

  goTo(course) {
    this.courseClick.emit(course);
  }

  editLink(course) {
    if (this.phd) {
      return ['/add-course', this.phd.id, course.id];
    }
  }

  removeCourse(courseId) {
    this.courseService.deleteCourse(courseId).subscribe(
      result => { this.removingCourse.emit(); },
      error => { console.log(error); }
    );
  }
}
