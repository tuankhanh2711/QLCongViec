import { NguoiDung } from './../../core/login/user.model';
import { DATA_USER } from './../../core/login/login.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-staff',
  templateUrl: './manager-staff.component.html',
  styleUrls: ['./manager-staff.component.scss'],
})
export class ManagerStaffComponent implements OnInit {
  staffList: NguoiDung[] = [];
  staffRole: string = 'nhanvien';

  constructor() {}

  ngOnInit() {
    this.showListStaff();
  }

  showListStaff() {
    this.staffList = DATA_USER.filter((ele) => {
      return ele.role === this.staffRole;
    });
  }
}
