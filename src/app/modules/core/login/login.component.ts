import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerStaffService } from '../../admin/manager-staff/manager-staff.service';
import { NguoiDung } from './user.model';

// export const DATA_USER = [
//   {
//     id: 1,
//     tenDangNhap: 'admin',
//     matKhau: '123456',
//     tenNguoiDung: 'ADMIN',
//     role: 'quanly',
//   },
//   {
//     id: 2,
//     tenDangNhap: 'nv1',
//     matKhau: '123456',
//     tenNguoiDung: 'Nhân viên 1',
//     role: 'nhanvien',
//   },
//   {
//     id: 3,
//     tenDangNhap: 'nv2',
//     matKhau: '123456',
//     tenNguoiDung: 'Nhân viên 2',
//     role: 'nhanvien',
//   },
//   {
//     id: 4,
//     tenDangNhap: 'nv3',
//     matKhau: '123456',
//     tenNguoiDung: 'Nhân viên 3',
//     role: 'nhanvien',
//   },
// ];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSubmited: boolean = false;
  userList: NguoiDung[] = [];
  loginForm: FormGroup;
  userid: string;
  constructor(
    private FormBuilder: FormBuilder,
    private router: Router,
    private mStaffService: ManagerStaffService
  ) {
    this.loginForm = this.FormBuilder.group({
      tenDangNhap: this.FormBuilder.control('', [Validators.required]),
      matKhau: this.FormBuilder.control('', [Validators.required]),
    });
    // localStorage.setItem('id', '2');
    // public id: number,
    // public tenDangNhap: string,
    // public matKhau: string,
    // public tenNguoiDung: string,
    // public role: string
  }
  ngOnInit() {
    localStorage.removeItem('id');
    this.mStaffService.getStaff().then((el) => {
      this.userList = el;
    });
  }
  onLogin() {
    this.isSubmited = true;
    if (this.loginForm.invalid) {
      return;
    }

    if (this.checkUser()) {
      this.isSubmited = false;
      let role = this.checkUserRole();
      if (role === 'quanly') {
        // localStorage.setItem('id', this.loginForm.controls.id.value);
        this.router.navigate(['/quan-ly']);
      }
      if (role === 'nhanvien') {
        // this.mStaffService.getidUser(this.loginForm.controls.id.value);
        this.router.navigate(['/nhan-vien']);
        localStorage.setItem('id', this.userid);
      }
      // else {
      //   this.router.navigate(['/login']);
      // }
    } else {
      this.isSubmited = true;
      this.loginForm.reset();
    }
  }

  checkUser(): boolean {
    let result: boolean = false;

    this.userList.forEach((user) => {
      if (
        user.tenDangNhap === this.loginForm.controls.tenDangNhap.value &&
        user.matKhau === this.loginForm.controls.matKhau.value
      ) {
        return (result = true);
      }
    });
    return result;
  }

  checkUserRole(): string {
    let resule: string = '';
    this.userList.find((ele) => {
      if (ele.tenDangNhap === this.loginForm.controls.tenDangNhap.value) {
        resule = ele.role;
        this.userid = ele.id.toString();
      }
    });
    return resule;
  }
}
