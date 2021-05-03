import { ManagerTaskService } from './../../manager-task/manager-task.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NguoiDung } from 'src/app/modules/core/login/user.model';
import { CongViec } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-manager-project-detail',
  templateUrl: './manager-project-detail.component.html',
  styleUrls: ['./manager-project-detail.component.scss'],
})
export class ManagerProjectDetailComponent implements OnInit {
  userList: NguoiDung[] = [];
  taskList: CongViec[] = [];
  modalRef: BsModalRef;
  @ViewChild(TemplateRef) detail: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private mTaskService: ManagerTaskService
  ) {}

  ngOnInit() {}
  onOpenModalDetail(id: number) {
    this.modalRef = this.modalService.show(this.detail);
    this.viewTaskByIdProject(id);
  }
  onClose() {
    this.modalRef.hide();
    // this.resetForm();
  }
  viewTaskByIdProject(id: number) {
    this.mTaskService.getTaskByProject(id).then((el) => {
      this.taskList = el;
    });
  }
}
