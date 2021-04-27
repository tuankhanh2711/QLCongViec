import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  modalRef: BsModalRef;
  editTaskForm: FormGroup;
  constructor(
    private staffService: StaffService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {
    this.editTaskForm = this.fb.group({
      id: this.fb.control(0),
      noiDung: this.fb.control(''),
      duAnId: this.fb.control(0),
      nguoiDungId: this.fb.control(0),
      trangThai: this.fb.control(null),
    });
  }

  ngOnInit() {
    this.idUser = localStorage.getItem('id');
    this.staffService.getTaskOfStaff(this.idUser).then((el) => {
      this.taskList = el;
    });
  }
  onEditTask(template: TemplateRef<any>, task: CongViec) {
    debugger;
    this.modalRef = this.modalService.show(template);
    this.editTaskForm.controls.id.setValue(task.id);
    this.editTaskForm.controls.noiDung.setValue(task.noiDung);
    this.editTaskForm.controls.duAnId.setValue(task.duAnId);
    this.editTaskForm.controls.nguoiDungId.setValue(task.nguoiDungId);
    this.editTaskForm.controls.trangThai.setValue(task.trangThai);
  }
  onSave() {
    if (this.editTaskForm.invalid) {
      return;
    }
    this.staffService.editTaskbyStaff(this.editTaskForm.value);
    this.onClose();
  }
  onClose() {
    this.modalRef.hide();
    this.resetForm();
  }
  resetForm() {}
}
