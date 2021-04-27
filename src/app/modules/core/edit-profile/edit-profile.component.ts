import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StaffService } from '../../staff/staff.service';
import { NguoiDung } from '../login/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  idUser: number;
  staff: NguoiDung;
  modalRef: BsModalRef;
  editUserForm: FormGroup;
  constructor(
    private staffService: StaffService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {
    this.editUserForm = this.fb.group({
      id: this.fb.control(0),
      tenNguoiDung: this.fb.control(''),
      // [{value: null, disabled: this.isDisabled},
      tenDangNhap: this.fb.control(''),
      matKhau: this.fb.control('', [Validators.required]),
      role: this.fb.control(''),
    });
  }

  ngOnInit() {
    this.idUser = +localStorage.getItem('id');
    this.staffService.getProfileUser(this.idUser).then((el) => {
      this.staff = el;
    });
  }
  onChangePass(template: TemplateRef<any>, staff: NguoiDung) {
    this.modalRef = this.modalService.show(template);
    this.editUserForm.controls.id.setValue(staff.id);
    this.editUserForm.controls.tenNguoiDung.setValue(staff.tenNguoiDung);
    this.editUserForm.controls.tenDangNhap.setValue(staff.tenDangNhap);
    this.editUserForm.controls.matKhau.setValue(staff.matKhau);
    this.editUserForm.controls.role.setValue(staff.role);
  }
  onSave() {
    if (this.editUserForm.invalid) {
      return;
    }
    this.staffService.editStaff(this.editUserForm.value);
    this.onClose();
  }
  onClose() {
    this.modalRef.hide();
  }
}
