import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { CourseService } from '../../services/course.service';
import { RegistrationService } from '../../services/registration.service';
import { TabService } from '../../services/tab.service';

import { Course } from '../../model/course';
import { Registration } from '../../model/registration';
import { Material } from '../../model/material';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {

  toolbarTitle = 'Courses';
  currentUser;
  courseId;
  course: Course = new Course();
  registrations: Registration[] = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private registrationService: RegistrationService,
    private tabService: TabService) { }

  ngOnInit() {
    // Get the current user from Local Storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Get courseId from router parameter
    this.courseId = this.route.snapshot.paramMap.get('id');

    // Get course
    this.courseService.getCourse(this.courseId).subscribe(
      result => { this.course = result; },
      error => { console.log(error); }
    );

    // Get all the student registration of this course
    this.registrationService.getRegistrations(this.courseId).subscribe(
      result => { this.registrations = result; },
      error => { console.log(error); }
    );
  }
}
