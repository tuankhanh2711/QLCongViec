import { NguoiDung } from './../../core/login/user.model';
// import { DATA_USER } from './../../core/login/login.component';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ManagerStaffService } from './manager-staff.service';
import { ManagerStaffDetailComponent } from './manager-staff-detail/manager-staff-detail.component';

@Component({
  selector: 'app-manager-staff',
  templateUrl: './manager-staff.component.html',
  styleUrls: ['./manager-staff.component.scss'],
})
export class ManagerStaffComponent implements OnInit {
  staffList: NguoiDung[] = [];
  staffRole: string = 'nhanvien';
  closeResult: string;
  createUserForm: FormGroup;
  modalRef: BsModalRef;
  isEdited: boolean = false;
  @ViewChild(ManagerStaffDetailComponent) detailComponent:ManagerStaffDetailComponent;
  constructor(
    private mStaffService: ManagerStaffService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.showListStaff();
  }

  // showListStaff() {
  //   this.staffList = DATA_USER.filter((ele) => {
  //     return ele.role === this.staffRole;
  //   });
  // }

  showListStaff() {
    alert('reload');
    this.mStaffService.getStaff().then((el) => {
      this.staffList = el.filter((f) => {
        return f.role === this.staffRole;
      });
    });
  }

  // onSave() {
  //   if (this.createUserForm.invalid) {
  //     return;
  //   }
  //   if (this.isEdited == true) {
  //     this.mStaffService.editStaff(this.createUserForm.value);
  //     this.onClose();
  //     this.reLoad();
  //   } else {
  //     this.mStaffService.addStaff(this.createUserForm.value);
  //     this.onClose();
  //     this.reLoad();
  //   }
  // }
  onAddStaff() {
    this.detailComponent.onOpenModal();
  }
  onDeleteStaff(staff: NguoiDung) {
    this.mStaffService.deleteStaff(staff.id);
    this.reLoad();
  }

  onEditStaff(template: TemplateRef<any>, staff: NguoiDung) {
    this.isEdited = true;
    this.modalRef = this.modalService.show(template);
    this.createUserForm.controls.id.setValue(staff.id);
    this.createUserForm.controls.tenNguoiDung.setValue(staff.tenNguoiDung);
    this.createUserForm.controls.tenDangNhap.setValue(staff.tenDangNhap);
    this.createUserForm.controls.matKhau.setValue(staff.matKhau);
    this.createUserForm.controls.role.setValue(staff.role);
  }
  reLoad() {
    window.location.reload();
  }
  reloadData(result){
    if(result)
    this.showListStaff();
  }
  onClose() {
    this.isEdited = false;
    this.modalRef.hide();
    this.resetForm();
  }
  resetForm() {
    this.createUserForm.controls.id.setValue(0);
    this.createUserForm.controls.tenNguoiDung.setValue('');
    this.createUserForm.controls.tenDangNhap.setValue('');
    this.createUserForm.controls.matKhau.setValue('');
    this.createUserForm.controls.role.setValue('');
  }
  
}
