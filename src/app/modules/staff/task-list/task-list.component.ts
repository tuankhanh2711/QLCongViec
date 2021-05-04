import { Component, OnInit, ViewChild } from '@angular/core';
import { CongViec } from 'src/app/shared/models/task.model';
import { StaffService } from '../staff.service';
import { TaskSuccessConfirmComponent } from '../task-success-confirm/task-success-confirm.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  idUser: string;
  taskList: CongViec[] = [];
  task: CongViec;
  @ViewChild(TaskSuccessConfirmComponent)
  successedTaskComponent: TaskSuccessConfirmComponent;

  constructor(private staffService: StaffService) {
    // this.editTaskForm = this.fb.group({
    //   id: this.fb.control(0),
    //   noiDung: this.fb.control(''),
    //   duAnId: this.fb.control(0),
    //   nguoiDungId: this.fb.control(0),
    //   trangThai: this.fb.control(null),
    // });
  }

  ngOnInit() {
    this.idUser = localStorage.getItem('id');
    this.onShowTaskList();
  }
  onShowTaskList() {
    alert();
    this.staffService.getTaskOfStaff(this.idUser).then((el) => {
      this.taskList = el;
    });
  }
  onEditTask(id: number, trangThai:boolean) {
    this.successedTaskComponent.onOpenModalCorfirmSuccessTask(id, trangThai);
  }
  editTask(id: number) {
    this.staffService.getSingleTask(id).then((el) => {
      if (el.trangThai == true) {
        el.trangThai = false;
      } else {
        el.trangThai = true;
      }
      this.task = el;
      this.staffService.editTaskbyStaff(this.task);
      this.onShowTaskList();
      // this.editTaskForm.controls.id.setValue(el.id);
      // this.editTaskForm.controls.noiDung.setValue(el.noiDung);
      // this.editTaskForm.controls.duAnId.setValue(el.duAnId);
      // this.editTaskForm.controls.nguoiDungId.setValue(el.nguoiDungId);
      // this.editTaskForm.controls.trangThai.setValue(el.trangThai);
    });
  }
  // onSave() {
  //   if (this.editTaskForm.invalid) {
  //     return;
  //   }
  //   this.staffService.editTaskbyStaff(this.editTaskForm.value);
  // }
}
