import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DuAn } from 'src/app/shared/models/project.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manager-project',
  templateUrl: './manager-project.component.html',
  styleUrls: ['./manager-project.component.scss'],
})
export class ManagerProjectComponent implements OnInit {
  projectList: DuAn[] = [];
  closeResult: string;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.adminService.getProject().then((el) => {
      this.projectList = el;
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
