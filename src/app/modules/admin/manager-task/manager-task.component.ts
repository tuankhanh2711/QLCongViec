import { ManagerTaskDetailComponent } from './manager-task-detail/manager-task-detail.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CongViec } from 'src/app/shared/models/task.model';
import { ManagerTaskService } from './manager-task.service';

@Component({
  selector: 'app-manager-task',
  templateUrl: './manager-task.component.html',
  styleUrls: ['./manager-task.component.scss'],
})
export class ManagerTaskComponent implements OnInit {
  TaskList: CongViec[] = [];
  @ViewChild(ManagerTaskDetailComponent)
  detailComponent: ManagerTaskDetailComponent;

  constructor(private mTaskService: ManagerTaskService) {}
  ngOnInit() {
    this.showListTask();
  }

  onAddTask() {
    this.detailComponent.onOpenModal();
  }

  onEditTask(id: number) {
    this.detailComponent.editTask(id);
  }
  onDeleteTask(id: number) {
    this.detailComponent.deleteTask(id);
  }
  showListTask() {
    alert();
    this.mTaskService.getTask().then((el) => {
      this.TaskList = el;
    });
  }
  reloadData(result) {
    if (result) this.showListTask();
  }
}
