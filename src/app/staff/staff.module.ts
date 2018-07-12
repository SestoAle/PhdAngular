import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffComponent } from './staff.component';
import { PhdComponent } from './phd/phd.component';
import { MembersComponent } from './members/members.component';

import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { AddModuleModule } from '../add-module/add-module.module';
import { ListModuleModule } from '../list-module/list-module.module';
import { UtilityModuleModule } from '../utility-module/utility-module.module';

import { AuthGuard } from '../guards/auth.guard';
import { PhdProgramService } from '../services/phd-program.service';
import { CycleService } from '../services/cycle.service';

// Material
import { MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';

// Routes
import { StaffRoutingModule } from './staff-routing.module';


@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    StaffRoutingModule,
    AddModuleModule,
    ListModuleModule,
    UtilityModuleModule
  ],
  declarations: [
    StaffComponent,
    //AddPhdComponent,
    PhdComponent,
    //AddCycleComponent,
    MembersComponent,
    //FacultyListComponent,
    //BackComponent,
    //EditRemoveComponent,
    //AddMemberComponent,
    //StudentListComponent,
    //CourseListComponent,
    //CycleListComponent,
    //ScheduleListComponent,
    //AddCourseComponent
  ],
  providers: [
    PhdProgramService,
    CycleService
  ],
  exports: [
    //CourseListComponent,
    //ScheduleListComponent,
    //EditRemoveComponent
  ]
})
export class StaffModule { }
