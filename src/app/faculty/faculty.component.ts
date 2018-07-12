import { Component, OnInit } from '@angular/core';

import { Faculty } from '../model/faculty';
import { Course } from '../model/course';
import { Student } from '../model/student';
import { Event } from '../model/event';
import { Report } from '../model/report';

import { Router } from '@angular/router';

import { FacultyService } from '../services/faculty.service';
import { ScholarService } from '../services/scholar.service';
import { EventService } from '../services/event.service';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  toolbarTitle = 'Faculty page';
  currentUser;
  courses: Course[] = [];
  students: Student[] = [];

  constructor(
    private router: Router,
    private facultyService: FacultyService,
    private scholarService: ScholarService,
    private eventService: EventService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let courseObservable;

    if (this.currentUser.role === 'faculty') {
      courseObservable = this.facultyService.getCourses(this.currentUser.id);
    } else if (this.currentUser.role === 'scholar') {
      courseObservable = this.scholarService.getCourses(this.currentUser.id);
    }

    courseObservable.subscribe(
      result => { this.courses = result; },
      error => { console.log(error); }
    );

    this.facultyService.getFacultyStudents(this.currentUser.id).subscribe(
      result => { this.students = result; },
      error => { console.log(error); }
    );
  }

  goToCourse(course) {
    this.router.navigate(['/course', course.id]);
  }

  approveEvent(event: Event) {
    event.approvedByAdvisor = true;
    this.eventService.patchEvent(event).subscribe(
      result => { this.ngOnInit(); },
      error => { console.log(error); }
    );
  }

  approveReport(report: Report) {
    report.approvedByAdvisor = true;
    this.reportService.patchReport(report).subscribe(
      result => { this.ngOnInit(); },
      error => { console.log(error); }
    );
  }
}
