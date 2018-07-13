import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BackComponent } from './utility-module/back/back.component';
import { routing } from './app.routing';

// App Modules
import { LoginModule } from './login/login.module';
import { StaffModule } from './staff/staff.module';
import { CoordinatorModule } from './coordinator/coordinator.module';
import { FacultyModule } from './faculty/faculty.module';
import { StudentModule } from './student/student.module';

// Helpers
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthenticationService } from './services/authentication.service';

// Material Modules
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';

// Browser Animations Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// FlexLayout
import { FlexLayoutModule } from "@angular/flex-layout";
import { RegistrationDialogComponent } from './utility-module/registration-dialog/registration-dialog.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LoginModule,
    StaffModule,
    CoordinatorModule,
    FacultyModule,
    StudentModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
