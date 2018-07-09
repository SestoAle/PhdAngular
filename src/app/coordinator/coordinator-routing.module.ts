import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoordinatorComponent } from './coordinator.component';

import { AuthGuard } from '../guards/auth.guard';

const coordinatorRoutes: Routes = [
  { path: 'coordinator',  component: CoordinatorComponent, canActivate: [AuthGuard], data: {roles: ['coordinator']}}
];

@NgModule({
  imports: [
    RouterModule.forChild(coordinatorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoordinatorRoutingModule { }