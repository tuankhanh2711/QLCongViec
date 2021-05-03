import { NguoiDung } from './../../core/login/user.model';
// import { DATA_USER } from './../../core/login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ManagerStaffService } from './manager-staff.service';
import { ManagerStaffDetailComponent } from './manager-staff-detail/manager-staff-detail.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';

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
  deleteConfirm: DeleteConfirmComponent;

  constructor(private mStaffService: ManagerStaffService) {}

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
    this.deleteConfirm.onOpenModalConfirmDelete(id);
  }

  onEditStaff(id: number) {
    this.detailComponent.editStaff(id);
  }
  reloadData(result) {
    if (result) this.showListStaff();
  }
}
