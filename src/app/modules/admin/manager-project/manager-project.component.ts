import { Component, DoCheck, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DuAn } from 'src/app/shared/models/project.model';
import { CongViec } from 'src/app/shared/models/task.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manager-project',
  templateUrl: './manager-project.component.html',
  styleUrls: ['./manager-project.component.scss'],
})
export class ManagerProjectComponent implements OnInit {
  projectList: DuAn[] = [];
  taskListOfProject: CongViec[] = [];
  closeResult: string;
  idProject: string = null;
  createProjectForm: FormGroup;
  modalRef: BsModalRef;
  isEdited: boolean = false;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {
    this.createProjectForm = this.fb.group({
      id: this.fb.control(0),
      tenDuAn: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.adminService.getProject().then((el) => {
      this.projectList = el;
    });
    this.adminService
      .getTaskByProject(localStorage.getItem('idProject'))
      .then((el) => {
        this.taskListOfProject = el;
      });
  }
  // ngDoCheck() {
  //   if (this.idProject === null) {
  //     localStorage.setItem('idProject', '1');
  //   }
  //   this.adminService
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
  }
  onAddTask() {
    this.taskListOfProject.push({
      noiDung: '',
      nguoiDungId: null,
      duAnId: this.createProjectForm.controls.id.value,
    });
  }
  onEditProject(template: TemplateRef<any>, project: DuAn) {
    this.isEdited = true;
    this.modalRef = this.modalService.show(template);
    this.createProjectForm.controls.id.setValue(project.id);
    this.createProjectForm.controls.tenDuAn.setValue(project.tenDuAn);
    this.taskListOfProject = project.congViecs;
  }
  onDeleteProject(project: DuAn) {
    this.adminService.deleteProject(project.id);
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
      this.adminService.editProject(project);
      this.onClose();
    } else {
      this.adminService.addProject(project);
      this.onClose();
    }
  }
  onViewTaskByIdProject(id: number) {
    this.idProject = id.toString();
    localStorage.setItem('idProject', this.idProject);
    this.router.navigate(['/quan-ly']);
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
