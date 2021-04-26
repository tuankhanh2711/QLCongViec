import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CongViec } from 'src/app/shared/models/task.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manager-task',
  templateUrl: './manager-task.component.html',
  styleUrls: ['./manager-task.component.scss'],
})
export class ManagerTaskComponent implements OnInit {
  TaskList: CongViec[] = [];
  createTaskForm: FormGroup;
  modalRef: BsModalRef;
  isEdited: boolean = false;
  constructor(
    private adminService: AdminService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {
    this.createTaskForm = this.fb.group({
      id: this.fb.control(0),
      noiDung: this.fb.control(''),
      duAnId: this.fb.control(null),
      nguoiDungId: this.fb.control(null),
    });
  }
  ngOnInit() {
    this.adminService.getTask().then((el) => {
      this.TaskList = el;
    });
  }

  onAddTask(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onSave() {
    if (this.createTaskForm.invalid) {
      return;
    }
    if (this.isEdited == true) {
      this.adminService.editTask(this.createTaskForm.value);
      this.onClose();
    } else {
      this.adminService.addTask(this.createTaskForm.value);
      this.onClose();
    }
  }
  onEditTask(template: TemplateRef<any>, task: CongViec) {
    this.isEdited = true;
    this.modalRef = this.modalService.show(template);
    this.createTaskForm.controls.id.setValue(task.id);
    this.createTaskForm.controls.noiDung.setValue(task.noiDung);
    this.createTaskForm.controls.duAnId.setValue(task.duAnId);
    this.createTaskForm.controls.nguoiDungId.setValue(task.nguoiDungId);
  }
  onDeleteTask(task: CongViec) {
    this.adminService.deleteTask(task.id);
  }
  onClose() {
    this.modalRef.hide();
    this.resetForm();
  }
  resetForm() {}
}
