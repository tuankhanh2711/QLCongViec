import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DuAn } from 'src/app/shared/models/project.model';
import { CongViec } from 'src/app/shared/models/task.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manager-project',
  templateUrl: './manager-project.component.html',
  styleUrls: ['./manager-project.component.scss'],
})
export class ManagerProjectComponent implements OnInit, DoCheck {
  projectList: DuAn[] = [];
  taskListOfProject: CongViec[] = [];
  closeResult: string;
  idProject: string = null;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.adminService.getProject().then((el) => {
      this.projectList = el;
    });
  }
  ngDoCheck() {
    if (this.idProject === null) {
      localStorage.setItem('idProject', '1');
    }
    this.adminService
      .getTaskByProject(localStorage.getItem('idProject'))
      .then((el) => {
        this.taskListOfProject = el;
      });
  }

  onAddProject(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  onViewTaskByIdProject(id: number) {
    this.idProject = id.toString();
    localStorage.setItem('idProject', this.idProject);
    this.router.navigate(['/quan-ly']);
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
