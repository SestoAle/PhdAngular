import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from './student.component';

import { AuthGuard } from '../guards/auth.guard';

const studentRoutes: Routes = [
  { path: 'student',  component: StudentComponent, canActivate: [AuthGuard], data: {roles: ['student']}}
];

@NgModule({
  imports: [
    RouterModule.forChild(studentRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StudentRoutingModule { }
