import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FacultyComponent } from './faculty.component';
import { CourseViewComponent } from './course-view/course-view.component';

import { AuthGuard } from '../guards/auth.guard';

const facultyRoutes: Routes = [
  { path: 'scholar', redirectTo: '/faculty', pathMatch: 'full'},
  { path: 'faculty',  component: FacultyComponent, canActivate: [AuthGuard], data: {roles: ['faculty', 'scholar']}},
  { path: 'course/:id',  component: CourseViewComponent, canActivate: [AuthGuard],
    data: {roles: ['faculty', 'scholar', 'coordinator', 'student']}}
];

@NgModule({
  imports: [
    RouterModule.forChild(facultyRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FacultyRoutingModule { }