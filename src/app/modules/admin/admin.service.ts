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
  addStaff(user: NguoiDung) {
    return this.http
      .post(this.baseURL + 'NguoiDung', user)
      .toPromise()
      .then((res) => {
        return res as NguoiDung;
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
  deleteStaff(id: number) {
    return this.http.delete(this.baseURL + 'NguoiDung/' + id).toPromise();
  }
  getProject() {
    return this.http
      .get(this.baseURL + 'DuAn')
      .toPromise()
      .then((res) => {
        return res as DuAn[];
      });
  }
  addProject(project: DuAn) {
    return this.http
      .post(this.baseURL + 'DuAn', project)
      .toPromise()
      .then((res) => {
        return res as DuAn;
      });
  }
  editProject(project: DuAn) {
    return this.http
      .put(this.baseURL + 'DuAn/' + project.id, project)
      .toPromise()
      .then((res) => {
        return res as DuAn;
      });
  }
  deleteProject(id: number) {
    return this.http.delete(this.baseURL + 'DuAn/' + id).toPromise();
  }
  getTask() {
    return this.http
      .get(this.baseURL + 'CongViec')
      .toPromise()
      .then((res) => {
        return res as CongViec[];
      });
  }
  addTask(task: CongViec) {
    return this.http
      .post(this.baseURL + 'CongViec', task)
      .toPromise()
      .then((res) => {
        return res as CongViec;
      });
  }
  editTask(task: CongViec) {
    return this.http
      .put(this.baseURL + 'CongViec/' + task.id, task)
      .toPromise()
      .then((res) => {
        return res as CongViec;
      });
  }
  deleteTask(id: number) {
    return this.http.delete(this.baseURL + 'CongViec/' + id).toPromise();
  }
  // getTaskByProject(id: string) {
  //   return this.http
  //     .get(this.baseURL + 'CongViec/GetCongViecByDuAnId/' + id)
  //     .toPromise()
  //     .then((res) => {
  //       return res as CongViec[];
  //     });
  // }
  // getidUser(id: number) {
  //   localStorage.setItem('id', id.toString());
  // }
}
