import { Component, OnInit } from '@angular/core';
import { CongViec } from 'src/app/shared/models/task.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manager-task',
  templateUrl: './manager-task.component.html',
  styleUrls: ['./manager-task.component.scss'],
})
export class ManagerTaskComponent implements OnInit {
  TaskList: CongViec[] = [];
  constructor(private adminService: AdminService) {}
  ngOnInit() {
    this.adminService.getTask().then((x) => {
      this.TaskList = x;
    });
  }
}
