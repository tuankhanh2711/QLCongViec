import { SharedModule } from './../../shared/shared/shared.module';
import { EditProfileComponent } from './../core/edit-profile/edit-profile.component';
import { TaskListComponent } from './task-list/task-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffService } from './staff.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TaskSuccessConfirmComponent } from './task-success-confirm/task-success-confirm.component';

@NgModule({
  imports: [CommonModule, StaffRoutingModule, SharedModule, HttpClientModule],
  declarations: [
    StaffComponent,
    TaskListComponent,
    TaskSuccessConfirmComponent,
  ],
  providers: [StaffService, HttpClient],
})
export class StaffModule {}
