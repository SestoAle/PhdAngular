import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { StaffComponent } from './staff.component';
import { AddPhdComponent } from './add-phd/add-phd.component';
import { PhdComponent } from './phd/phd.component';
import { AddCycleComponent } from './add-cycle/add-cycle.component';
import { MembersComponent } from './members/members.component';
import { AddMemberComponent } from './add-member/add-member.component';

const staffRoutes: Routes = [
  { path: 'staff',  component: StaffComponent, canActivate: [AuthGuard]},
  { path: 'add-phd/:id', component: AddPhdComponent, canActivate: [AuthGuard]},
  { path: 'phd/:id', component: PhdComponent, canActivate: [AuthGuard]},
  { path: 'add-cycle/:phdId/:cycleId', component: AddCycleComponent, canActivate: [AuthGuard]},
  { path: 'members/:phd/:cycle', component: MembersComponent, canActivate: [AuthGuard]},
  { path: 'add-member/:phdId/:cycleId/:memberClass/:facultyId', component: AddMemberComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(staffRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StaffRoutingModule {}
