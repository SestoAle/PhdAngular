import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddModuleModule } from '../add-module/add-module.module';

import { AuthGuard } from '../guards/auth.guard';

import { StaffComponent } from './staff.component';
import { AddPhdComponent } from '../add-module/add-phd/add-phd.component';
import { PhdComponent } from './phd/phd.component';
import { AddCycleComponent } from '../add-module/add-cycle/add-cycle.component';
import { MembersComponent } from './members/members.component';
import { AddMemberComponent } from '../add-module/add-member/add-member.component';
import { AddCourseComponent } from '../add-module/add-course/add-course.component';

const staffRoutes: Routes = [
  { path: 'staff',  component: StaffComponent, canActivate: [AuthGuard], data: {roles: ['staff']}},
  { path: 'phd/:id', component: PhdComponent, canActivate: [AuthGuard], data: {roles: ['staff']}},
  { path: 'members/:phd/:cycle', component: MembersComponent, canActivate: [AuthGuard], data: {roles: ['staff']}}
];

@NgModule({
  imports: [
    AddModuleModule,
    RouterModule.forChild(staffRoutes)
  ],
  exports: [
    AddModuleModule,
    RouterModule
  ]
})
export class StaffRoutingModule {}
