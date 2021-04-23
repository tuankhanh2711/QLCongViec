import { NguoiDung } from './../../core/login/user.model';
// import { DATA_USER } from './../../core/login/login.component';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.createUserForm = this.fb.group({
      tenNguoiDung: this.fb.control('', [Validators.required]),
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
    debugger;
    if (this.createUserForm.invalid) {
      return;
    }
    // if (this.createUserForm.controls.tenNguoiDung.value) {

    // } else {
    this.adminService.addStaff(this.createUserForm.value);
    // }
  }
  onAddStaff(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
