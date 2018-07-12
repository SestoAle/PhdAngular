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

    this.eventService.getEventsToApprove(this.coordinator.phdProgramId).subscribe(
      result => {this.allEvents = result; },
      error => { console.log(error); }
    );

    this.reportService.getReportToApprove(this.coordinator.phdProgramId).subscribe(
      result => { this.allReports = result; },
      error => { console.log(error); }
    );

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
    this.eventService.patchEvent(event).subscribe(
      result => { this.ngOnInit(); },
      error => { console.log(error); }
    );
  }

  approveReport(report: Report) {
    report.approved = true;
    this.reportService.patchReport(report).subscribe(
      result => { this.ngOnInit(); },
      error => { console.log(error); }
    );
  }

  approveEventAsAdvisor(event) {
    event.approvedByAdvisor = true;
    this.eventService.patchEvent(event).subscribe(
      result => { this.ngOnInit(); },
      error => { console.log(error); }
    );
  }

  approveReportAsAdvisor(report) {
    report.approvedByAdvisor = true;
    this.reportService.patchReport(report).subscribe(
      result => { this.ngOnInit(); },
      error => { console.log(error); }
    );
  }
}
