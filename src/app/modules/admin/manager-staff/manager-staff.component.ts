import { NguoiDung } from './../../core/login/user.model';
// import { DATA_USER } from './../../core/login/login.component';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {
    this.createUserForm = this.fb.group({
      id: this.fb.control(0),
      tenNguoiDung: this.fb.control({ value: '', disabled: this.isEdited }, [
        Validators.required,
      ]),
      // [{value: null, disabled: this.isDisabled},
      tenDangNhap: this.fb.control('', [Validators.required]),
      matKhau: this.fb.control('', [Validators.required]),
      role: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.showListStaff();
  }

  // showListStaff() {
  //   this.staffList = DATA_USER.filter((ele) => {
  //     return ele.role === this.staffRole;
  //   });
  // }

  showListStaff() {
    this.adminService.getStaff().then((el) => {
      this.staffList = el.filter((f) => {
        return f.role === this.staffRole;
      });
    });
  }
  onSave() {
    if (this.createUserForm.invalid) {
      return;
    }
    if (this.isEdited == true) {
      this.adminService.editStaff(this.createUserForm.value);
      this.onClose();
    } else {
      this.adminService.addStaff(this.createUserForm.value);
      this.onClose();
    }
  }
  onAddStaff(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onDeleteStaff(staff: NguoiDung) {
    this.adminService.deleteStaff(staff.id);
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
