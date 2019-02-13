import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { CourseService } from '../../services/course.service';

import { Course } from '../../model/course';
import { Student } from '../../model/student';
import { Material } from '../../model/material';
import { Schedule } from '../../model/schedule';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() course: Course = new Course();
  newMaterial: Material = new Material();
  newSchedule: Schedule = new Schedule();
  newFile: File = null;
  currentUser;
  loading = false;
  @ViewChild('inputVariable')
  inputVariable: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    // Get the current user from local storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  inputFile(event) {
    // Manage the input file
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.newFile = fileList[0];
      this.newMaterial.link = this.newFile.name;
    } else {
      this.newFile = null;
      this.newMaterial.link = null;
    }
  }

  removeMaterial(material) {
    // Remove a material from the course
    const index = this.course.materials.indexOf(material);
    this.course.materials.splice(index, 1);
    this.courseService.addMaterial(this.currentUser.id, this.course).subscribe(
      result => {
        this.loading = false;
        this.ngOnInit();
      },
      error => { console.log(error); }
    );
  }

  addMaterial() {
    // Add a material to the course
    this.loading = true;
    this.newMaterial.date = new Date();
    this.course.materials.push(this.newMaterial);
    if (this.newFile) {
      // TODO in Backend
      // Upload material to service
      // this.courseService.uploadMaterial(this.course.id, this.newFile);
    }
    this.courseService.addMaterial(this.currentUser.id, this.course).subscribe(
      result => {
        this.loading = false;
        this.ngOnInit();
        this.newMaterial = new Material();
        this.inputVariable.nativeElement.value = ''; },
      error => { console.log(error); }
    );
  }

  addSchedule() {
    // Add a schedule to the course
    this.course.schedules.push(this.newSchedule);
    this.courseService.putCourse(this.course.id, this.course).subscribe(
      result => {
        this.newSchedule = new Schedule();
        this.course.schedules = this.course.schedules.slice();
      },
      error => { console.log(error); }
    );
  }

  removeSchedule(schedule) {
    // Remove a material from the course
    const index = this.course.schedules.indexOf(schedule);
    this.course.schedules.splice(index, 1);
    this.courseService.putCourse(this.course.id, this.course).subscribe(
      result => {
        this.newSchedule = new Schedule();
        this.course.schedules = this.course.schedules.slice();
      },
      error => { console.log(error); }
    );
  }
}
