import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CongViec } from 'src/app/shared/models/task.model';
import { environment } from '../../../environments/environment';
import { NguoiDung } from '../core/login/user.model';
import { DuAn } from 'src/app/shared/models/project.model';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  readonly baseURL = environment.urlAPI; // 'https://localhost:44357/';
  //taskList: CongViec[];

  getStaff() {
    return this.http
      .get(this.baseURL + 'NguoiDung')
      .toPromise()
      .then((res) => {
        return res as NguoiDung[];
      });
  }
  addStaff(user:NguoiDung){ 
    this.http.post(this.baseURL+'NguoiDung', user);
  }

  getProject() {
    return this.http
      .get(this.baseURL + 'DuAn')
      .toPromise()
      .then((res) => {
        return res as DuAn[]; 
      });
  }
  getTask() {
    return this.http
      .get(this.baseURL + 'CongViec')
      .toPromise()
      .then((res) => {
        return res as CongViec[];
      });
  }
}
