import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CongViec } from 'src/app/shared/models/task.model';
import { environment } from '../../../environments/environment';
import { NguoiDung } from '../core/login/user.model';
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

  getProject() {}
  getTask() {
    return this.http
      .get(this.baseURL + 'CongViec')
      .toPromise()
      .then((res) => {
        return res as CongViec[];
      });
  }
}
