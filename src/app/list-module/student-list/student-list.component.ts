import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

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
  @Input() students: Student[] = [];

  @Output() removingStudent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  removeStudent(id) {
    // Delete the student and emit the event that notify the component parent
    this.studentService.deleteStudent(id).subscribe(
      result => { this.removingStudent.emit(); },
      error => { console.log(error); }
    );
  }

}
