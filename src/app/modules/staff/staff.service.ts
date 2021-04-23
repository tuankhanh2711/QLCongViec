import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CongViec } from 'src/app/shared/models/task.model';
import { environment } from 'src/environments/environment';

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
}
