import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffComponent } from './staff.component';
import { AddPhdComponent } from './add-phd/add-phd.component';
import { BackComponent } from '../back/back.component';
import { PhdComponent } from './phd/phd.component';
import { AddCycleComponent } from './add-cycle/add-cycle.component';
import { MembersComponent } from './members/members.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { EditRemoveComponent } from '../edit-remove/edit-remove.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ScheduleListComponent } from '../schedule-list/schedule-list.component';

import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { AuthGuard } from '../guards/auth.guard';
import { PhdProgramService } from '../services/phd-program.service';
import { CycleService } from '../services/cycle.service';

//Material
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


//Routes
import { StaffRoutingModule } from './staff-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { CycleListComponent } from './cycle-list/cycle-list.component';
import { AddCourseComponent } from './add-course/add-course.component';

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
    FormsModule,
    StaffRoutingModule,
  ],
  declarations: [
    StaffComponent,
    AddPhdComponent,
    PhdComponent,
    AddCycleComponent,
    MembersComponent,
    FacultyListComponent,
    BackComponent,
    EditRemoveComponent,
    AddMemberComponent,
    StudentListComponent,
    CourseListComponent,
    CycleListComponent,
    ScheduleListComponent,
    AddCourseComponent
  ],
  providers: [
    PhdProgramService,
    CycleService
  ],
  exports: [
    CourseListComponent,
    ScheduleListComponent,
    EditRemoveComponent,
    BackComponent
  ]
})
export class StaffModule { }
