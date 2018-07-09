import { Component, OnInit, Inject } from '@angular/core';

import { Student } from '../model/student';
import { Course } from '../model/course';
import { Registration } from '../model/registration';

import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { CourseService } from '../services/course.service';
import { RegistrationService } from '../services/registration.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';

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
  registeredCourse: Course[] = [];
  totalCfu = 0;

  constructor(
    private courseService: CourseService,
    private registrationService: RegistrationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.student = JSON.parse(localStorage.getItem('currentUser'));
    this.totalCfu = 0;
    this.registrationService.getStudentRegistrations(this.student.id).subscribe(
      result => {
        this.registrations = result;
        for (const reg of this.registrations) {
          if (reg.grade) {
            this.totalCfu += reg.course.cfu;
          }
          this.courseService.getCourses(this.student.phdProgramId)
            .pipe(map(courses => courses.filter(course => !this.registrations.some(x => x.courseId === course.id))))
            .subscribe(
              data => { this.allCourses = data; },
              error => { console.log(error); }
            );
        }
      },
      error => { console.log(error); }
    );
  }

  openDialog(course) {
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

  yeah() {
    console.log(this.registrations[0].course);
    console.log(this.registrations.some(x => x.courseId == this.allCourses[0].id));
  }

}
