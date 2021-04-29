import { SharedModule } from './../../shared/shared/shared.module';
import { ManagerTaskComponent } from './manager-task/manager-task.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ManagerProjectComponent } from './manager-project/manager-project.component';
import { AdminService } from './admin.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ManagerStaffModule } from './manager-staff/manager-staff.module';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule, HttpClientModule, ManagerStaffModule],
  declarations: [
    AdminComponent,
    ManagerProjectComponent,
    ManagerTaskComponent,
  ],
  providers:[AdminService, HttpClient]
})
export class AdminModule {}
