import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Course } from '../../model/course';
import { Student } from '../../model/student';
import { Registration } from '../../model/registration';

import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})

export class RegistrationDialogComponent implements OnInit {

  course: Course = new Course();
  student: Student = new Student();
  newRegistration: Registration;

  constructor(
    private registrationService: RegistrationService,
    private dialogRef: MatDialogRef<RegistrationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
    this.course = this.data.course;
    this.student = this.data.student;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createRegistration() {
    this.newRegistration = new Registration();
    this.newRegistration.studentId = this.student.id;
    this.newRegistration.courseId = this.course.id;
    this.registrationService.addRegistration(this.student.id, this.newRegistration).subscribe(
      result => { this.dialogRef.close(); },
      error => { console.log(error); }
    );
  }
}
