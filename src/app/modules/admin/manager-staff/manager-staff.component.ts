import { NguoiDung } from './../../core/login/user.model';
// import { DATA_USER } from './../../core/login/login.component';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manager-staff',
  templateUrl: './manager-staff.component.html',
  styleUrls: ['./manager-staff.component.scss'],
})
export class ManagerStaffComponent implements OnInit {
  staffList: NguoiDung[] = [];
  staffRole: string = 'nhanvien';

  constructor(private adminService: AdminService) {}

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
}
