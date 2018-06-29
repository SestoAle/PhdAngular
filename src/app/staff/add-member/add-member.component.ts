import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Faculty } from '../../model/faculty';
import { Student } from '../../model/student';

import { FacultyService } from '../../services/faculty.service';
import { StudentService } from '../../services/student.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  toolbarTitle = 'Add Member';

  memberClass = 'faculty';
  isFaculty = true;
  loading = false;
  error = '';
  update = false;
  newMember;
  faculties: Faculty[] = [];
  phdId;
  cycleId;

  constructor(private facultyService: FacultyService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.update = false;
    this.phdId = this.route.snapshot.paramMap.get('phdId');
    this.cycleId = this.route.snapshot.paramMap.get('cycleId');
    this.memberClass = this.route.snapshot.paramMap.get('memberClass');
    const memberId = +this.route.snapshot.paramMap.get('facultyId');
    if (this.memberClass === 'student') {
      this.newMember = new Student();
      this.facultyService.getFaculties(this.phdId, this.cycleId).subscribe(
        result => { this.faculties = result; },
        error => { console.log(error); }
      );
    } else {
      this.newMember = new Faculty();
    }
    if (memberId >= 0) {
      this.update = true;
      if (this.memberClass === 'faculty') {
        this.facultyService.getFaculty(memberId).subscribe(
          result => { this.newMember = result; },
          error => { console.log(error); }
        );
      } else {
        this.studentService.getStudent(memberId).subscribe(
          result => { this.newMember = result; },
          error => { console.log(error); }
        );
      }
    }
  }

  addMember() {
    this.loading = true;
    this.error = '';
    if (this.memberClass === 'faculty') {
      if (!this.update) {
        this.facultyService.addFaculty(this.phdId, this.cycleId, this.newMember).subscribe(
        data => { this.location.back(); },
        error => { console.log(error); }
        );
      } else {
        this.facultyService.patchFaculty(this.newMember.id, this.newMember).subscribe(
        data => { this.location.back(); },
        error => { console.log(error); }
        );
      }
    } else {
      if (!this.update) {
        this.studentService.addStudent(this.phdId, this.cycleId, this.newMember).subscribe(
        data => { this.location.back(); },
        error => { console.log(error);  }
        );
      } else {
        this.studentService.patchStudent(this.newMember.id, this.newMember).subscribe(
        data => { this.location.back(); },
        error => { console.log(error); }
        );
      }
    }
  }
}
