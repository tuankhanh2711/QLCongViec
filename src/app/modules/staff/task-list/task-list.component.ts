import { Component, OnInit } from '@angular/core';
import { CongViec } from 'src/app/shared/models/task.model';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  idUser: string;
  taskList: CongViec[] = [];
  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.idUser = localStorage.getItem('id');
    this.staffService.getTaskOfStaff(this.idUser).then((el) => {
      this.taskList = el;
    });
  }
}
