import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppModule } from '../app.module';

import { FacultyComponent } from './faculty.component';
import { CourseViewComponent } from './course-view/course-view.component';

import { FacultyRoutingModule } from './faculty-routing.module';

import { AddModuleModule } from '../add-module/add-module.module';
import { ListModuleModule } from '../list-module/list-module.module';
import { UtilityModuleModule } from '../utility-module/utility-module.module';

import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

// Material
import { MatTabsModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';
import { MatIconModule } from '@angular/material';

// Module
import { StaffModule } from '../staff/staff.module';

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
    AddModuleModule,
    ListModuleModule,
    UtilityModuleModule
  ],
  declarations: [
    FacultyComponent,
    CourseViewComponent
  ],
  exports: [
    CourseViewComponent
  ]

})
export class FacultyModule { }
