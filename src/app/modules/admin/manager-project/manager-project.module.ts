import { ManagerStaffService } from './../manager-staff/manager-staff.service';
import { SharedModule } from './../../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerProjectComponent } from './manager-project.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ManagerProjectDetailComponent } from './manager-project-detail/manager-project-detail.component';
import { AdminService } from '../admin.service';
import { ManagerProjectFuncComponent } from './manager-project-func/manager-project-func.component';

@NgModule({
  imports: [CommonModule, SharedModule, HttpClientModule],
  declarations: [
    ManagerProjectComponent,
    ManagerProjectDetailComponent,
    ManagerProjectFuncComponent,
  ],
  exports: [
    ManagerProjectComponent,
    ManagerProjectDetailComponent,
    ManagerProjectFuncComponent,
  ],
  providers: [AdminService, HttpClient, ManagerStaffService],
})
export class ManagerProjectModule {}
