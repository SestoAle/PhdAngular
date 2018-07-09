import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Faculty } from '../../model/faculty';
import { Student } from '../../model/student';
import { Scholar } from '../../model/scholar';

import { FacultyService } from '../../services/faculty.service';
import { StudentService } from '../../services/student.service';
import { ScholarService } from '../../services/scholar.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  toolbarTitle = 'Add Member';

  currentUser;
  memberClass = 'faculty';
  isFaculty = true;
  loading = false;
  error = '';
  update = false;
  newMember;
  newExternalAdvisor: Scholar = new Scholar();
  faculties: Faculty[] = [];
  phdId;
  cycleId;

  constructor(private facultyService: FacultyService,
    private studentService: StudentService,
    private scholarService: ScholarService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.update = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.phdId = this.route.snapshot.paramMap.get('phdId');
    this.cycleId = this.route.snapshot.paramMap.get('cycleId');
    this.memberClass = this.route.snapshot.paramMap.get('memberClass');
    const memberId = +this.route.snapshot.paramMap.get('facultyId');

    this.createMember();

    this.newMember.phdProgramId = this.phdId;
    this.newMember.cycleOfPhdId = this.cycleId;

    let observable;
    if (memberId >= 0) {
      this.update = true;
      if (this.memberClass === 'faculty') {
        observable = this.facultyService.getFaculty(memberId);
      } else if (this.memberClass === 'student') {
        observable = this.studentService.getStudent(memberId);
      } else if (this.memberClass === 'scholar') {
        observable = this.scholarService.getScholar(memberId);
      }

      observable.subscribe(
          result => { this.newMember = result; },
          error => { console.log(error); }
        );
    }
    console.log(this.newMember);
  }
  
  createMember() {
    if (this.memberClass === 'student') {
      this.newMember = new Student();
      this.facultyService.getFaculties(this.phdId, this.cycleId).subscribe(
        result => { this.faculties = result; },
        error => { console.log(error); }
      );
    } else if (this.memberClass === 'faculty') {
      this.newMember = new Faculty();
    } else if (this.memberClass === 'scholar') {
      this.newMember = new Scholar();
    }
  }

  addMember() {
    this.loading = true;
    this.error = '';
    let observable;
    if (this.memberClass === 'faculty') {
      if (!this.update) {
        observable = this.facultyService.addFaculty(this.phdId, this.cycleId, this.newMember);
      } else {
        observable = this.facultyService.patchFaculty(this.newMember.id, this.newMember);
      }
    } else if (this.memberClass === 'student') {
      if (!this.update) {
        observable = this.studentService.addStudent(this.phdId, this.cycleId, this.newMember);
      } else {
        observable = this.studentService.patchStudent(this.newMember.id, this.newMember);
      }
    } else if (this.memberClass === 'scholar') {
      delete this.newMember.cycleOfPhdId;
      if (!this.update) {
        observable = this.scholarService.addScholar(this.phdId, this.newMember);
      } else {
        observable = this.scholarService.patchScholar(this.newMember.id, this.newMember);
      }
    }
    observable.subscribe(
      data => { this.location.back(); },
      error => { console.log(error); }
    );
  }
}
