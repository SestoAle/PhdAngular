import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { AddPhdComponent } from '../add-module/add-phd/add-phd.component';
import { AddCycleComponent } from '../add-module/add-cycle/add-cycle.component';
import { AddMemberComponent } from '../add-module/add-member/add-member.component';
import { AddCourseComponent } from '../add-module/add-course/add-course.component';
import { AddEventComponent } from '../add-module/add-event/add-event.component';
import { AddReportComponent } from '../add-module/add-report/add-report.component';

const addRoutes: Routes = [
  { path: 'add-phd/:id', component: AddPhdComponent, canActivate: [AuthGuard], data: {roles: ['staff']}},
  { path: 'add-cycle/:phdId/:cycleId', component: AddCycleComponent, canActivate: [AuthGuard], data: {roles: ['staff']}},
  { path: 'add-member/:phdId/:cycleId/:memberClass/:facultyId', component: AddMemberComponent, canActivate: [AuthGuard],
    data: {roles: ['staff', 'coordinator', 'faculty', 'scholar', 'student']}},
  { path: 'add-course/:phdId/:courseId', component: AddCourseComponent, canActivate: [AuthGuard], data: {roles: ['staff', 'coordinator']}},
  { path: 'add-event/:id', component: AddEventComponent, canActivate: [AuthGuard], data: {roles: ['student']}},
  { path: 'add-report/:id', component: AddReportComponent, canActivate: [AuthGuard], data: {roles: ['student', 'faculty', 'coordinator']}}
];

@NgModule({
  imports: [
    RouterModule.forChild(addRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AddRoutingModule {}
