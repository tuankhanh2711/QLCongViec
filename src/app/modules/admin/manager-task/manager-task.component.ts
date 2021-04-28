import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CongViec } from 'src/app/shared/models/task.model';
import { ManagerTaskService } from './manager-task.service';

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
    private mTaskService: ManagerTaskService,
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
    this.mTaskService.getTask().then((el) => {
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
      this.mTaskService.editTask(this.createTaskForm.value);
      this.onClose();
      this.reLoad();
    } else {
      this.mTaskService.addTask(this.createTaskForm.value);
      this.onClose();
      this.reLoad();
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
    this.mTaskService.deleteTask(task.id);
    this.reLoad();
  }
  reLoad() {
    window.location.reload();
  }
  onClose() {
    this.modalRef.hide();
    this.resetForm();
  }
  resetForm() {
    this.createTaskForm.controls.id.setValue(0);
    this.createTaskForm.controls.noiDung.setValue('');
    this.createTaskForm.controls.duAnId.setValue(null);
    this.createTaskForm.controls.nguoiDungId.setValue(null);
  }
}
