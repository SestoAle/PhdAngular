import { Component, OnInit, Inject } from '@angular/core';

import { Student } from '../model/student';
import { Course } from '../model/course';
import { Registration } from '../model/registration';
import { Event } from '../model/event';
import { Report } from '../model/report';

import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { CourseService } from '../services/course.service';
import { RegistrationService } from '../services/registration.service';
import { EventService } from '../services/event.service';
import { ReportService } from '../services/report.service';
import { TabService } from '../services/tab.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegistrationDialogComponent } from '../utility-module/registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  toolbarTitle = 'Student Page';
  student: Student = new Student();
  allCourses: Course[] = [];
  registrations: Registration[];
  reports: Report[];
  events: Event[];
  registeredCourse: Course[] = [];
  totalCfu = 0;

  constructor(
    private courseService: CourseService,
    private registrationService: RegistrationService,
    private eventService: EventService,
    private reoprtService: ReportService,
    public dialog: MatDialog,
    private tabService: TabService
  ) { }

  ngOnInit() {
    this.student = JSON.parse(localStorage.getItem('currentUser'));
    this.totalCfu = 0;

    // Get all registrations of this student
    this.registrationService.getStudentRegistrations(this.student.id).subscribe(
      result => {
        this.registrations = result;
        // Update the totalCfu for each registration evaluated
        this.registrations.forEach(reg => {if (reg.grade) { this.totalCfu += reg.course.cfu; }});
        // Get all courses of this PhD and filter the array removing the course in which the student is already enrolled
        this.courseService.getCourses(this.student.phdProgramId)
          .pipe(map(courses => courses.filter(course => !this.registrations.some(x => x.courseId === course.id))))
          .subscribe(
            data => { this.allCourses = data; },
            error => { console.log(error); }
          );
      },
      error => { console.log(error); }
    );

    // Get all the events of this student
    this.eventService.getEvents(this.student.id).subscribe(
      result => {
        this.events = result;
        // Update the totalCfu for each event evaluated
        this.events.forEach(event => {if (event.approved) { this.totalCfu += event.proposedCfu; }});
      },
      error => { console.log(error); }
    );

    // Get all the reports of this student
    this.reoprtService.getReports(this.student.id).subscribe(
      result => {
        this.reports = result;
        // Update the totalCfu for each report evaluated
        this.reports.forEach(report => {if (report.approved) { this.totalCfu += report.proposedCfu; }});
      },
      error => { console.log(error); }
    );
  }

  openDialog(course) {
    // Open dialog of a course
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      width: '500px',
      data: {
        course: course,
        student: this.student
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
    });
  }
}
