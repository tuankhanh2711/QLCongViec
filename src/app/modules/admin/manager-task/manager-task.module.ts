import { ManagerTaskDetailComponent } from './manager-task-detail/manager-task-detail.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerTaskComponent } from './manager-task.component';
import { AdminService } from '../admin.service';
import { ManagerStaffService } from '../manager-staff/manager-staff.service';

@NgModule({
  imports: [CommonModule, SharedModule, HttpClientModule],
  declarations: [ManagerTaskComponent, ManagerTaskDetailComponent],
  exports: [ManagerTaskComponent, ManagerTaskDetailComponent],
  providers: [AdminService, HttpClient, ManagerStaffService],
})
export class ManagerTaskModule {}
