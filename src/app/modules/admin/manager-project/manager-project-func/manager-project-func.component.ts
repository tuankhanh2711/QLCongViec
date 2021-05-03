import { NotificationService } from './../../../../shared/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NguoiDung } from '../../../core/login/user.model';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CongViec } from 'src/app/shared/models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerProjectService } from '../manager-project.service';
import { ManagerStaffService } from '../../manager-staff/manager-staff.service';
import { ManagerTaskService } from '../../manager-task/manager-task.service';
import { DuAn } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-manager-project-func',
  templateUrl: './manager-project-func.component.html',
  styleUrls: ['./manager-project-func.component.scss'],
})
export class ManagerProjectFuncComponent implements OnInit {
  taskListOfProject: CongViec[] = [];
  userList: NguoiDung[] = [];
  taskList: CongViec[] = [];
  createProjectForm: FormGroup;
  modalRef: BsModalRef;
  isEdited: boolean = false;
  @ViewChild(TemplateRef) template: TemplateRef<any>;
  @Output() callBackEventEmitter = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private mProjectService: ManagerProjectService,
    private mStaffService: ManagerStaffService,
    private modalService: BsModalService,
    private notifyService: NotificationService
  ) {
    this.createProjectForm = this.fb.group({
      id: this.fb.control(0),
      tenDuAn: this.fb.control('', [Validators.required]),
      trangThai: this.fb.control(null, [Validators.required]),
    });
    this.mStaffService.getStaff().then((el) => {
      this.userList = el.filter((f) => {
        return f.role === 'nhanvien';
      });
    });
  }

  ngOnInit() {}
  onSave() {
    let project: DuAn = {
      ...this.createProjectForm.value,
      CongViecs: this.taskListOfProject,
    };
    if (this.createProjectForm.invalid) {
      return;
    }
    if (this.isEdited == true) {
      this.mProjectService
        .editProject(project)
        .then(() => {
          this.notifyService.showSuccess('Sửa thành công !!', 'Success');
        })
        .catch(() => {
          this.notifyService.showError('Sửa thất bại !!', 'Error');
        });
      this.callBackEventEmitter.emit(true);
      this.onClose();
    } else {
      this.mProjectService
        .addProject(project)
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
  onAddTask() {
    this.taskListOfProject.push({
      id: 0,
      noiDung: '',
      nguoiDungId: null,
      trangThai: false,
      duAnId: this.createProjectForm.controls.id.value,
    });
  }
  editProject(id: number) {
    this.isEdited = true;
    this.modalRef = this.modalService.show(this.template);
    this.showSingleProject(id);
  }
  deleteProject(id: number) {
    this.mProjectService
      .deleteProject(id)
      .then(() => {
        this.callBackEventEmitter.emit(true);
        this.notifyService.showSuccess('Xóa thành công !!', 'Success');
      })
      .catch(() => {
        this.callBackEventEmitter.emit(false);
        this.notifyService.showError('Xóa thất bại !!', 'Error');
      });
  }
  onOpenModal() {
    this.modalRef = this.modalService.show(this.template);
  }
  onClose() {
    this.modalRef.hide();
    this.resetForm();
  }
  resetForm() {
    this.createProjectForm.controls.id.setValue(0);
    this.createProjectForm.controls.tenDuAn.setValue('');
    this.taskListOfProject = [];
  }
  showSingleProject(id: number) {
    this.mProjectService.getSingleProject(id).then((el) => {
      this.createProjectForm.controls.id.setValue(el.id);
      this.createProjectForm.controls.tenDuAn.setValue(el.tenDuAn);
      this.createProjectForm.controls.trangThai.setValue(el.trangThai);
      if (el.congViecs == null) {
        this.taskListOfProject = [];
      } else {
        this.taskListOfProject = el.congViecs;
      }
    });
  }
}
