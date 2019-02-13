import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRemoveComponent } from './edit-remove/edit-remove.component';
import { BackComponent } from './back/back.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import { CourseComponent } from './course/course.component';

import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

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
import { SearchBarComponent } from './search-bar/search-bar.component';

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
    FormsModule
  ],
  declarations: [
    EditRemoveComponent,
    BackComponent,
    ScheduleListComponent,
    RegistrationDialogComponent,
    CourseComponent,
    SearchBarComponent
  ],
  exports: [
    EditRemoveComponent,
    BackComponent,
    ScheduleListComponent,
    RegistrationDialogComponent,
    CourseComponent,
    SearchBarComponent
  ],
  entryComponents: [
    RegistrationDialogComponent
  ]
})
export class UtilityModuleModule { }
