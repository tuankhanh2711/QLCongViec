import { Component, DoCheck, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DuAn } from 'src/app/shared/models/project.model';
import { CongViec } from 'src/app/shared/models/task.model';
import { NguoiDung } from '../../core/login/user.model';
import { ManagerStaffService } from '../manager-staff/manager-staff.service';
import { ManagerTaskService } from '../manager-task/manager-task.service';
import { ManagerProjectService } from './manager-project.service';

@Component({
  selector: 'app-manager-project',
  templateUrl: './manager-project.component.html',
  styleUrls: ['./manager-project.component.scss'],
})
export class ManagerProjectComponent implements OnInit {
  projectList: DuAn[] = [];
  taskListOfProject: CongViec[] = [];
  taskList: CongViec[] = [];
  userList: NguoiDung[] = [];
  closeResult: string;
  idProject: string = null;
  createProjectForm: FormGroup;
  modalRef: BsModalRef;
  isEdited: boolean = false;

  constructor(
    private mProjectService: ManagerProjectService,
    private mStaffService: ManagerStaffService,
    private mTaskService: ManagerTaskService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {
    this.createProjectForm = this.fb.group({
      id: this.fb.control(0),
      tenDuAn: this.fb.control('', [Validators.required]),
      trangThai: this.fb.control(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.mProjectService.getProject().then((el) => {
      this.projectList = el;
    });
    this.mStaffService.getStaff().then((el) => {
      this.userList = el.filter((f) => {
        return f.role === 'nhanvien';
      });
    });
  }
  // ngDoCheck() {
  //   if (this.idProject === null) {
  //     localStorage.setItem('idProject', '1');
  //   }
  //   this.mProjectService
  //     .getTaskByProject(localStorage.getItem('idProject'))
  //     .then((el) => {
  //       this.taskListOfProject = el;
  //     });
  // }

  onAddProject(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onShowDetail(template: TemplateRef<any>, project: DuAn) {
    this.modalRef = this.modalService.show(template);
    this.onViewTaskByIdProject(project);
  }
  onAddTask() {
    this.taskListOfProject.push({
      id: 0,
      noiDung: '',
      nguoiDungId: null,
      trangThai: true,
      duAnId: this.createProjectForm.controls.id.value,
    });
  }
  onEditProject(template: TemplateRef<any>, project: DuAn) {
    this.isEdited = true;
    this.modalRef = this.modalService.show(template);
    this.createProjectForm.controls.id.setValue(project.id);
    this.createProjectForm.controls.tenDuAn.setValue(project.tenDuAn);
    this.createProjectForm.controls.trangThai.setValue(project.trangThai);
    if (project.congViecs == null) {
      this.taskListOfProject = [];
    } else {
      this.taskListOfProject = project.congViecs;
    }
  }
  onDeleteProject(project: DuAn) {
    this.mProjectService.deleteProject(project.id);
    this.reLoad();
  }
  onSave() {
    let project: DuAn = {
      ...this.createProjectForm.value,
      CongViecs: this.taskListOfProject,
    };
    if (this.createProjectForm.invalid) {
      return;
    }
    if (this.isEdited == true) {
      this.mProjectService.editProject(project);
      this.onClose();
      this.reLoad();
    } else {
      this.mProjectService.addProject(project);
      this.onClose();
      this.reLoad();
    }
  }
  onViewTaskByIdProject(project: DuAn) {
    this.idProject = project.id.toString();
    this.mTaskService.getTaskByProject(this.idProject).then((el) => {
      this.taskList = el;
    });
  }
  reLoad() {
    window.location.reload();
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
}
