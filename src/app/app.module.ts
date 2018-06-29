import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BackComponent } from './back/back.component';
import { routing } from './app.routing';

//App Modules
import { LoginModule } from './login/login.module';
import { StaffModule } from './staff/staff.module';

//Helpers
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { HomeComponent } from './home/home.component';

//Material Modules
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';

//Browser Animations Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//FlexLayout
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    LoginModule,
    StaffModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
