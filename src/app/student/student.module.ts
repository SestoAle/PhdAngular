import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffModule } from '../staff/staff.module';

import { StudentRoutingModule } from './student-routing.module';

import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { AddModuleModule } from '../add-module/add-module.module';
import { ListModuleModule } from '../list-module/list-module.module';
import { UtilityModuleModule } from '../utility-module/utility-module.module';

// Material
import { MatTabsModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';

import { StudentComponent } from './student.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    StaffModule,
    StudentRoutingModule,
    FormsModule,
    AddModuleModule,
    ListModuleModule,
    UtilityModuleModule
  ],
  declarations: [
    StudentComponent
  ],
  entryComponents: [
  ]
})
export class StudentModule { }
