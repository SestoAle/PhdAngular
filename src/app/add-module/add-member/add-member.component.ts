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
  update = false;
  newMember;
  isCoordinator = false;
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
    // Get the current user from the local storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // Get phdId and cycleId from route
    this.phdId = this.route.snapshot.paramMap.get('phdId');
    this.cycleId = this.route.snapshot.paramMap.get('cycleId');
    // Get the member class from the route
    this.memberClass = this.route.snapshot.paramMap.get('memberClass');
    const memberId = +this.route.snapshot.paramMap.get('facultyId');

    this.createMember();

    this.newMember.phdProgramId = this.phdId;
    this.newMember.cycleOfPhdId = this.cycleId;

    let observable;
    // Check if this is an update operation or a create one:
    // if parameter memberId of routing is > 0, then is an update operation
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
          result => {
            this.newMember = result;
            this.isCoordinator = (this.newMember.role === 'coordinator');
          },
          error => { console.log(error); }
        );
    }
  }

  createMember() {
    // Depending on memberClass, create the object of the right type
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

    if (this.isCoordinator) {
      this.newMember.role = 'coordinator';
    }

    let observable;
    // Depending on memberClass, create the object of the right type
    // For each memberClass, if it's an update operation, make a Patch request
    // If it isn't, make a Post request
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
