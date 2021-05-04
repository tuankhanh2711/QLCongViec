import { Component, OnInit, ViewChild } from '@angular/core';
import { DuAn } from 'src/app/shared/models/project.model';
import { CongViec } from 'src/app/shared/models/task.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DeleteConfirmComponent } from '../../core/delete-confirm/delete-confirm.component';
import { ManagerProjectDetailComponent } from './manager-project-detail/manager-project-detail.component';
import { ManagerProjectFuncComponent } from './manager-project-func/manager-project-func.component';
import { ManagerProjectService } from './manager-project.service';

@Component({
  selector: 'app-manager-project',
  templateUrl: './manager-project.component.html',
  styleUrls: ['./manager-project.component.scss'],
})
export class ManagerProjectComponent implements OnInit {
  projectList: DuAn[] = [];
  taskList: CongViec[] = [];
  closeResult: string;
  idProject: string = null;
  @ViewChild(ManagerProjectFuncComponent)
  funcProjectComponont: ManagerProjectFuncComponent;
  @ViewChild(ManagerProjectDetailComponent)
  detailComponent: ManagerProjectDetailComponent;
  @ViewChild(DeleteConfirmComponent)
  deleteConfirmComponent: DeleteConfirmComponent;

  constructor(
    private mProjectService: ManagerProjectService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    this.showListProject();
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

  onAddProject() {
    this.funcProjectComponont.onOpenModal();
  }
  showListProject() {
    alert();
    this.mProjectService.getProject().then((el) => {
      this.projectList = el;
    });
  }
  onShowDetail(id: number) {
    this.detailComponent.onOpenModalDetail(id);
  }

  onEditProject(id: number) {
    this.funcProjectComponont.editProject(id);
  }
  onViewTaskByIdProject(id: number) {
    // this.funcProjectComponont.onOpenModalDetail();
  }
  onDeleteProject(id: number) {
    this.deleteConfirmComponent.onOpenModalConfirmDelete(id);
  }
  deleteProject(id: number) {
    this.mProjectService
      .deleteProject(id)
      .then(() => {
        this.showListProject();
        this.notifyService.showSuccess('Xóa thành công !!', 'Success');
      })
      .catch(() => {
        this.showListProject();
        this.notifyService.showError('Xóa thất bại !!', 'Error');
      });
  }
  reloadData(result) {
    if (result) this.showListProject();
  }
}
