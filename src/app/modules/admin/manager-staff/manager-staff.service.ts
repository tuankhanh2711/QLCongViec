import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NguoiDung } from '../../core/login/user.model';
import { AdminService } from '../admin.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerStaffService {
  constructor(private adminService: AdminService, private http: HttpClient) {}
  getStaff() {
    return this.http
      .get(this.adminService.baseURL + 'NguoiDung')
      .toPromise()
      .then((res) => {
        return res as NguoiDung[];
      });
  }
  getProfileSingleStaffById(id: number){
    return this.http
      .get(this.adminService.baseURL + 'NguoiDung/' + id)
      .toPromise()
      .then((res) => {
        return res as NguoiDung;
      });
  }
  addStaff(user: NguoiDung) {
    debugger
    return this.http
      .post(this.adminService.baseURL + 'NguoiDung', user)
      .toPromise()
      .then((res) => {
        return res as NguoiDung;
      });
  }
  editStaff(user: NguoiDung) {
    return this.http
      .put(this.adminService.baseURL + 'NguoiDung/' + user.id, user)
      .toPromise()
      .then((res) => {
        return res as NguoiDung;
      });
  }
  deleteStaff(id: number) {
    return this.http
      .delete(this.adminService.baseURL + 'NguoiDung/' + id)
      .toPromise();
  }
}
