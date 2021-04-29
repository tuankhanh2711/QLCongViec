import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ManagerStaffService } from '../manager-staff.service';

@Component({
  selector: 'app-manager-staff-detail',
  templateUrl: './manager-staff-detail.component.html',
  styleUrls: ['./manager-staff-detail.component.scss'],
})
export class ManagerStaffDetailComponent implements OnInit {
  modalRef: BsModalRef;
  createUserForm: FormGroup;
  isEdited: boolean = false;
  @ViewChild(TemplateRef) template:TemplateRef<any>;
  @Output() callBackEventEmitter = new EventEmitter<boolean>();
  @Input() reloadFunction: Function;
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private mStaffService: ManagerStaffService
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

  ngOnInit() {}
  onOpenModal() {
    this.modalRef = this.modalService.show(this.template);
  }
  onSave() {
    if (this.createUserForm.invalid) {
      return;
    }
    if (this.isEdited == true) {
      this.mStaffService.editStaff(this.createUserForm.value);
      this.onClose();
      // this.reLoad();
    } else {
      this.mStaffService.addStaff(this.createUserForm.value);
      this.callBackEventEmitter.emit(true);
      //this.reloadFunction();
      this.onClose();
      // this.reLoad();
    }
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
  // reLoad() {
  //   window.location.reload();
  // }
}
