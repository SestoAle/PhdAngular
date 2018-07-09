import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyComponent } from './faculty.component';
import { CourseComponent } from './course/course.component';

import { FacultyRoutingModule } from './faculty-routing.module';

import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { NgPipesModule } from 'ngx-pipes';

//Material
import { MatTabsModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';
import { MatIconModule } from '@angular/material';

//Module
import { StaffModule } from '../staff/staff.module';
import { CourseViewComponent } from './course-view/course-view.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FacultyRoutingModule,
    StaffModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    NgPipesModule
  ],
  declarations: [
    FacultyComponent,
    CourseComponent,
    CourseViewComponent,
    RegistrationListComponent
  ],
  exports: [
    CourseComponent,
    CourseViewComponent,
    RegistrationListComponent
  ]

})
export class FacultyModule { }
