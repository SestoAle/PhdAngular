import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseListComponent } from './course-list/course-list.component';
import { CycleListComponent } from './cycle-list/cycle-list.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { CoordinatorEventListComponent } from './coordinator-event-list/coordinator-event-list.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { FacultyEventListComponent } from './faculty-event-list/faculty-event-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { CfuListComponent } from './cfu-list/cfu-list.component';
import { ReportListComponent } from './report-list/report-list.component';
import { StudentRegistrationListComponent } from './student-registration-list/student-registration-list.component';
import { ScholarListComponent } from './scholar-list/scholar-list.component';

import { AddModuleModule } from '../add-module/add-module.module';
import { UtilityModuleModule } from '../utility-module/utility-module.module';
import { ListRoutingModule } from './list-routing.module';

import { FilterPipe } from '../pipes/filter.pipe';
import { SearchPipe } from '../pipes/search.pipe';
import { NgPipesModule } from 'ngx-pipes';

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
    AddModuleModule,
    ListRoutingModule,
    NgPipesModule,
    UtilityModuleModule
  ],
  declarations: [
    CourseListComponent,
    StudentListComponent,
    FacultyListComponent,
    CycleListComponent,
    CoordinatorEventListComponent,
    RegistrationListComponent,
    FacultyEventListComponent,
    EventListComponent,
    CfuListComponent,
    StudentRegistrationListComponent,
    ReportListComponent,
    FilterPipe,
    SearchPipe,
    ScholarListComponent
  ],
  exports: [
    CourseListComponent,
    StudentListComponent,
    FacultyListComponent,
    CycleListComponent,
    CoordinatorEventListComponent,
    RegistrationListComponent,
    FacultyEventListComponent,
    EventListComponent,
    CfuListComponent,
    StudentRegistrationListComponent,
    ReportListComponent,
    ScholarListComponent
  ]
})
export class ListModuleModule { }
