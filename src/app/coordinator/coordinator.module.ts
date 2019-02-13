import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { StaffModule } from '../staff/staff.module';
import { FacultyModule } from '../faculty/faculty.module';

import { AddModuleModule } from '../add-module/add-module.module';
import { ListModuleModule } from '../list-module/list-module.module';
import { UtilityModuleModule } from '../utility-module/utility-module.module';

// Material
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatListModule } from '@angular/material';

import { CoordinatorComponent } from './coordinator.component';

@NgModule({
  imports: [
    CommonModule,
    FacultyModule,
    CoordinatorRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    StaffModule,
    AddModuleModule,
    ListModuleModule,
    UtilityModuleModule
  ],
  declarations: [
    CoordinatorComponent
  ]
})
export class CoordinatorModule { }
