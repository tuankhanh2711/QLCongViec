import { SharedModule } from './../../../shared/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule, LoginRoutingModule, SharedModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
