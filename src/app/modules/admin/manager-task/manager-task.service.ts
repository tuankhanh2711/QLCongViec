import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CongViec } from 'src/app/shared/models/task.model';
import { AdminService } from '../admin.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerTaskService {
  constructor(private adminService: AdminService, private http: HttpClient) {}

  getTask() {
    return this.http
      .get(this.adminService.baseURL + 'CongViec')
      .toPromise()
      .then((res) => {
        return res as CongViec[];
      });
  }
  getSingleTask(id: number) {
    return this.http
      .get(this.adminService.baseURL + 'CongViec/' + id)
      .toPromise()
      .then((res) => {
        return res as CongViec;
      });
  }
  addTask(task: CongViec) {
    return this.http
      .post(this.adminService.baseURL + 'CongViec', task)
      .toPromise()
      .then((res) => {
        return res as CongViec;
      });
  }
  editTask(task: CongViec) {
    return this.http
      .put(this.adminService.baseURL + 'CongViec/' + task.id, task)
      .toPromise()
      .then((res) => {
        return res as CongViec;
      });
  }
  deleteTask(id: number) {
    return this.http
      .delete(this.adminService.baseURL + 'CongViec/' + id)
      .toPromise();
  }
  getTaskByProject(id: number) {
    return this.http
      .get(this.adminService.baseURL + 'CongViec/GetCongViecByDuAnId/' + id)
      .toPromise()
      .then((res) => {
        return res as CongViec[];
      });
  }
}
