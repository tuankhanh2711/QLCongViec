import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CongViec } from 'src/app/shared/models/task.model';
import { environment } from 'src/environments/environment';
import { NguoiDung } from '../core/login/user.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private http: HttpClient) {
    // this.idURL=adminserVice.getidUser();
  }
  readonly baseURL = environment.urlAPI;

  getTaskOfStaff(id: string) {
    return this.http
      .get(this.baseURL + 'CongViec/GetCongViecByNguoiDungId/' + id)
      .toPromise()
      .then((res) => {
        return res as CongViec[];
      });
  }
  getProfileUser(id: number) {
    return this.http
      .get(this.baseURL + 'NguoiDung/' + id)
      .toPromise()
      .then((res) => {
        return res as NguoiDung;
      });
  }
  editTaskbyStaff(task: CongViec) {
    return this.http
      .put(this.baseURL + 'CongViec/' + task.id, task)
      .toPromise()
      .then((res) => {
        return res as CongViec;
      });
  }
  editStaff(user: NguoiDung) {
    return this.http
      .put(this.baseURL + 'NguoiDung/' + user.id, user)
      .toPromise()
      .then((res) => {
        return res as NguoiDung;
      });
  }
}
