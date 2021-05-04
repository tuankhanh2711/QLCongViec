import { NguoiDung } from './../../core/login/user.model';
// import { DATA_USER } from './../../core/login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ManagerStaffService } from './manager-staff.service';
import { ManagerStaffDetailComponent } from './manager-staff-detail/manager-staff-detail.component';
import { DeleteConfirmComponent } from '../../core/delete-confirm/delete-confirm.component';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-manager-staff',
  templateUrl: './manager-staff.component.html',
  styleUrls: ['./manager-staff.component.scss'],
})
export class ManagerStaffComponent implements OnInit {
  staffList: NguoiDung[] = [];
  staffRole: string = 'nhanvien';
  closeResult: string;
  @ViewChild(ManagerStaffDetailComponent)
  detailComponent: ManagerStaffDetailComponent;
  @ViewChild(DeleteConfirmComponent)
  deleteConfirmComponent: DeleteConfirmComponent;

  constructor(private mStaffService: ManagerStaffService, private notifyService: NotificationService) {}

  ngOnInit() {
    this.showListStaff();
  }

  showListStaff() {
    alert('reload');
    this.mStaffService.getStaff().then((el) => {
      this.staffList = el.filter((f) => {
        return f.role === this.staffRole;
      });
    });
  }
  onAddStaff() {
    this.detailComponent.onOpenModal();
  }
  onDeleteStaff(id: number) {
    this.deleteConfirmComponent.onOpenModalConfirmDelete(id);
  }
  deleteStaff(id: number) {
    this.mStaffService
      .deleteStaff(id)
      .then(() => {
        this.showListStaff();
        this.notifyService.showSuccess('Xóa thành công !!', 'Success');
      })
      .catch(() => {
        this.showListStaff();
        this.notifyService.showError('Xóa thất bại !!', 'Error');
      });
  }
  onEditStaff(id: number) {
    this.detailComponent.editStaff(id);
  }
  reloadData(result) {
    if (result) this.showListStaff();
  }
}
