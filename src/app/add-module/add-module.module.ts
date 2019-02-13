import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCourseComponent } from './add-course/add-course.component';
import { AddCycleComponent } from './add-cycle/add-cycle.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { AddPhdComponent } from './add-phd/add-phd.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddReportComponent } from './add-report/add-report.component';

import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { AddRoutingModule } from './add-routing.module';
import { UtilityModuleModule } from '../utility-module/utility-module.module';

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
    FormsModule,
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
    UtilityModuleModule,
    AddRoutingModule
  ],
  declarations: [
    AddCourseComponent,
    AddCycleComponent,
    AddMemberComponent,
    AddPhdComponent,
    AddEventComponent,
    AddReportComponent
  ],
  exports: [
    AddCourseComponent,
    AddCycleComponent,
    AddMemberComponent,
    AddPhdComponent,
    AddEventComponent,
    AddReportComponent
  ]
})
export class AddModuleModule { }
