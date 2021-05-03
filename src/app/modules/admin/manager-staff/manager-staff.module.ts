import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerStaffComponent } from './manager-staff.component';
import { ManagerStaffDetailComponent } from './manager-staff-detail/manager-staff-detail.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ManagerStaffService } from './manager-staff.service';
import { AdminService } from '../admin.service';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
  ],
  declarations: [
    ManagerStaffComponent,
    ManagerStaffDetailComponent,
    DeleteConfirmComponent,
  ],
  exports: [
    ManagerStaffComponent,
    ManagerStaffDetailComponent,
    DeleteConfirmComponent,
  ],
  providers: [AdminService, HttpClient, ManagerStaffService],
})
export class ManagerStaffModule {}
