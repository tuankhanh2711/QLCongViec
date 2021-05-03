import { Component, OnInit, ViewChild } from '@angular/core';
import { DuAn } from 'src/app/shared/models/project.model';
import { CongViec } from 'src/app/shared/models/task.model';
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

  constructor(private mProjectService: ManagerProjectService) {}

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
    this.funcProjectComponont.deleteProject(id);
  }
  reloadData(result) {
    if (result) this.showListProject();
  }
}
