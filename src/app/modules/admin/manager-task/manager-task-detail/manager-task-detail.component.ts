import { NotificationService } from './../../../../shared/services/notification.service';
import { ManagerStaffService } from './../../manager-staff/manager-staff.service';
import { DuAn } from './../../../../shared/models/project.model';
import { NguoiDung } from './../../../core/login/user.model';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ManagerTaskService } from '../manager-task.service';
import { ManagerProjectService } from '../../manager-project/manager-project.service';

@Component({
  selector: 'app-manager-task-detail',
  templateUrl: './manager-task-detail.component.html',
  styleUrls: ['./manager-task-detail.component.scss'],
})
export class ManagerTaskDetailComponent implements OnInit {
  createTaskForm: FormGroup;
  isEdited: boolean = false;
  modalRef: BsModalRef;
  userList: NguoiDung[] = [];
  projectList: DuAn[] = [];
  @ViewChild(TemplateRef) template: TemplateRef<any>;
  @Output() callBackEventEmitter = new EventEmitter<boolean>();

  constructor(
    private mTaskService: ManagerTaskService,
    private mStaffService: ManagerStaffService,
    private mProjectService: ManagerProjectService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private notifyService: NotificationService
  ) {
    this.createTaskForm = this.fb.group({
      id: this.fb.control(0),
      noiDung: this.fb.control(''),
      duAnId: this.fb.control(null),
      nguoiDungId: this.fb.control(null),
    });
  }

  ngOnInit() {
    this.mStaffService.getStaff().then((el) => {
      this.userList = el.filter((f) => {
        return f.role === 'nhanvien';
      });
    });
    this.mProjectService.getProject().then((el) => {
      this.projectList = el;
    });
  }
  editTask(id: number) {
    this.isEdited = true;
    this.modalRef = this.modalService.show(this.template);
    this.showSingleTask(id);
  }
  onSave() {
    if (this.createTaskForm.invalid) {
      return;
    }
    if (this.isEdited == true) {
      this.mTaskService
        .editTask(this.createTaskForm.value)
        .then(() => {
          this.notifyService.showSuccess('Sửa thành công !!', 'Success');
        })
        .catch(() => {
          this.notifyService.showError('Sửa thất bại !!', 'Error');
        });
      this.callBackEventEmitter.emit(true);
      this.onClose();
    } else {
      this.mTaskService
        .addTask(this.createTaskForm.value)
        .then(() => {
          this.notifyService.showSuccess('Thêm thành công !!', 'Success');
        })
        .catch(() => {
          this.notifyService.showError('Thêm thất bại !!', 'Error');
        });
      this.callBackEventEmitter.emit(true);
      this.onClose();
    }
  }
  onOpenModal() {
    this.modalRef = this.modalService.show(this.template);
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
  showSingleTask(id: number) {
    this.mTaskService.getSingleTask(id).then((el) => {
      this.createTaskForm.controls.id.setValue(el.id);
      this.createTaskForm.controls.noiDung.setValue(el.noiDung);
      this.createTaskForm.controls.duAnId.setValue(el.duAnId);
      this.createTaskForm.controls.nguoiDungId.setValue(el.nguoiDungId);
    });
  }
}
``;
