import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffModule } from '../staff/staff.module';

import { StudentRoutingModule } from './student-routing.module';

//Material
import { MatTabsModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

import { StudentComponent } from './student.component';
import { CfuListComponent } from './cfu-list/cfu-list.component';
import { StudentRegistrationListComponent } from './student-registration-list/student-registration-list.component';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    StaffModule,
    StudentRoutingModule
  ],
  declarations: [
    StudentComponent,
    CfuListComponent,
    StudentRegistrationListComponent,
    RegistrationDialogComponent
  ],
  entryComponents: [
    RegistrationDialogComponent
  ]
})
export class StudentModule { }
