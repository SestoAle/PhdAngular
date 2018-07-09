import { Component, OnInit } from '@angular/core';

import { Faculty } from '../model/faculty';
import { Course } from '../model/course';

import { Router } from '@angular/router';

import { FacultyService } from '../services/faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  toolbarTitle = 'Courses';
  faculty: Faculty = new Faculty();
  courses: Course[] = [];

  constructor(
    private router: Router,
    private facultyService: FacultyService
  ) { }

  ngOnInit() {
    this.faculty = JSON.parse(localStorage.getItem('currentUser'));
    this.facultyService.getCourses(this.faculty.id).subscribe(
      result => { this.courses = result; },
      error => { console.log(error); }
    );
  }

  goToCourse(course) {
    this.router.navigate(['/course', course.id]);
  }

}
