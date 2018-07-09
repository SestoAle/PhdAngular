import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Student } from '../../model/student';
import { PhdProgram } from '../../model/phdProgram';
import { CycleOfPhd } from '../../model/cycleOfPhd';

import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  @Input() phd: PhdProgram;
  @Input() cycle: CycleOfPhd;
  students: Student[];

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnChanges (changes: SimpleChanges) {
    if (this.phd.id && this.cycle.id) {
      this.studentService.getStudents(this.phd.id, this.cycle.id).subscribe(
        result => {this.students = result; console.log(this.students)},
        error => { console.log(error); }
    );
    }
  }

  removeStudent(id) {
    this.studentService.deleteStudent(id).subscribe(result =>
      this.studentService.getStudents(this.phd.id, this.cycle.id).subscribe(
        data => { this.students = data; },
        error => { console.log(error); }
      )
    );
  }

}
