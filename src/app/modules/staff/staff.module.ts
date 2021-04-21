import { SharedModule } from './../../shared/shared/shared.module';
import { EditProfileComponent } from './../core/edit-profile/edit-profile.component';
import { TaskListComponent } from './task-list/task-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffRoutingModule } from './staff-routing.module';

@NgModule({
  imports: [
    CommonModule, StaffRoutingModule, SharedModule
  ],
  declarations: [StaffComponent, TaskListComponent]
})
export class StaffModule { }
