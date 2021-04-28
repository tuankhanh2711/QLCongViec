import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DuAn } from 'src/app/shared/models/project.model';
import { AdminService } from '../admin.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerProjectService {
  constructor(private adminService: AdminService, private http: HttpClient) {}
  getProject() {
    return this.http
      .get(this.adminService.baseURL + 'DuAn')
      .toPromise()
      .then((res) => {
        return res as DuAn[];
      });
  }
  addProject(project: DuAn) {
    debugger;
    return this.http
      .post(this.adminService.baseURL + 'DuAn', project)
      .toPromise()
      .then((res) => {
        return res as DuAn;
      });
  }
  editProject(project: DuAn) {
    return this.http
      .put(this.adminService.baseURL + 'DuAn/' + project.id, project)
      .toPromise()
      .then((res) => {
        return res as DuAn;
      });
  }
  deleteProject(id: number) {
    return this.http
      .delete(this.adminService.baseURL + 'DuAn/' + id)
      .toPromise();
  }
}
