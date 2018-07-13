import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { PhdProgram } from '../model/phdProgram';
import { Faculty } from '../model/faculty';
import { Course } from '../model/course';
import { Student } from '../model/student';
import { Event } from '../model/event';
import { Report } from '../model/report';

import { PhdProgramService } from '../services/phd-program.service';
import { CourseService } from '../services/course.service';
import { FacultyService } from '../services/faculty.service';
import { EventService } from '../services/event.service';
import { ReportService } from '../services/report.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.css']
})
export class CoordinatorComponent implements OnInit {

  toolbarTitle = 'Coordinator page';
  phd: PhdProgram = new PhdProgram();
  allCourses: Course[] = [];
  registeredCourses: Course[] = [];
  allEvents: Event[] = [];
  allReports: Report[] = [];
  students: Student[] = [];
  coordinator: Faculty = new Faculty();

  constructor(
    private router: Router,
    private phdService: PhdProgramService,
    private facultyService: FacultyService,
    private eventService: EventService,
    private reportService: ReportService,
    private courseService: CourseService) { }

  ngOnInit() {
    // Get the current user from localStorage
    this.coordinator = JSON.parse(localStorage.getItem('currentUser'));

    // Get the PhD of this user
    this.phdService.getPhd(this.coordinator.phdProgramId).subscribe(
      data => { this.phd = data; },
      error => { console.log(error); });

    // Get all the courses of this PhD
    this.courseService.getCourses(this.coordinator.phdProgramId).subscribe(
      result => { this.allCourses = result; console.log(result); },
      error => { console.log(error); }
    );

    // Get the courses of this Faculty
    this.facultyService.getCourses(this.coordinator.id).subscribe(
      result => { this.registeredCourses = result; },
      error => { console.log(error); }
    );

    // Get all events of all the students of his PhD
    this.eventService.getEventsToApprove(this.coordinator.phdProgramId).subscribe(
      result => {this.allEvents = result; },
      error => { console.log(error); }
    );

    // Get all reports of all the students of his PhD
    this.reportService.getReportToApprove(this.coordinator.phdProgramId).subscribe(
      result => { this.allReports = result; },
      error => { console.log(error); }
    );

    // If he's an advisor, get all of his students
    this.facultyService.getFacultyStudents(this.coordinator.id).subscribe(
      result => { this.students = result; },
      error => { console.log(error); }
    );

  }

  modifyCourse(course) {
    this.router.navigate(['/add-course', this.phd.id, course.id]);
  }

  openCourse(course) {
    this.router.navigate(['/course', course.id]);
  }

  approveEvent(event: Event) {
    event.approved = true;
    // Approve the event as coordinator, Patch the event object
    this.eventService.patchEvent(event).subscribe(
      result => { this.ngOnInit(); },
      error => { console.log(error); }
    );
  }

  approveReport(report: Report) {
    report.approved = true;
    // Approve the report as coordinator, Patch the event object
    this.reportService.patchReport(report).subscribe(
      result => { this.ngOnInit(); },
      error => { console.log(error); }
    );
  }

  approveEventAsAdvisor(event) {
    event.approvedByAdvisor = true;
    // Approve the event as advisor, Patch the event object
    this.eventService.patchEvent(event).subscribe(
      result => { this.ngOnInit(); },
      error => { console.log(error); }
    );
  }

  approveReportAsAdvisor(report) {
    report.approvedByAdvisor = true;
    // Approve the report as advisor, Patch the event object
    this.reportService.patchReport(report).subscribe(
      result => { this.ngOnInit(); },
      error => { console.log(error); }
    );
  }
}
