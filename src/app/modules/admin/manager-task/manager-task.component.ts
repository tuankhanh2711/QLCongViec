import { ManagerTaskDetailComponent } from './manager-task-detail/manager-task-detail.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CongViec } from 'src/app/shared/models/task.model';
import { ManagerTaskService } from './manager-task.service';
import { DeleteConfirmComponent } from '../../core/delete-confirm/delete-confirm.component';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-manager-task',
  templateUrl: './manager-task.component.html',
  styleUrls: ['./manager-task.component.scss'],
})
export class ManagerTaskComponent implements OnInit {
  TaskList: CongViec[] = [];
  @ViewChild(ManagerTaskDetailComponent)
  detailComponent: ManagerTaskDetailComponent;
  @ViewChild(DeleteConfirmComponent)
  deleteConfirmComponent: DeleteConfirmComponent;

  constructor(
    private mTaskService: ManagerTaskService,
    private notifyService: NotificationService
  ) {}
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
    this.deleteConfirmComponent.onOpenModalConfirmDelete(id);
  }
  deleteTask(id: number) {
    this.mTaskService
      .deleteTask(id)
      .then(() => {
        this.showListTask();
        this.notifyService.showSuccess('Xóa thành công !!', 'Success');
      })
      .catch(() => {
        this.showListTask();
        this.notifyService.showError('Xóa thất bại !!', 'Error');
      });
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
