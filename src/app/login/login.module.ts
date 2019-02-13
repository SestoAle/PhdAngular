import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

import { LoginComponent } from './login.component';

import { AuthenticationService } from '../services/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthenticationService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
