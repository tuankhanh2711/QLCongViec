import { NotificationService } from './../../../../shared/services/notification.service';
import { ManagerStaffService } from './../manager-staff.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss'],
})
export class DeleteConfirmComponent implements OnInit {
  modalRef: BsModalRef;
  idDelete: number;
  @ViewChild(TemplateRef) template: TemplateRef<any>;
  @Output() callBackEventEmitter = new EventEmitter<boolean>();

  constructor(
    private modalService: BsModalService,
    private mStaffService: ManagerStaffService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {}
  onOpenModalConfirmDelete(id: number) {
    this.modalRef = this.modalService.show(this.template);
    this.idDelete = id;
  }
  onConfirm() {
    this.deleteStaff(this.idDelete);
    this.modalService.hide();
  }
  onDecline() {
    this.modalService.hide();
    this.callBackEventEmitter.emit(false);
    this.notifyService.showInfo('Đã hủy !!', 'Thông báo');
  }
  deleteStaff(id: number) {
    this.mStaffService
      .deleteStaff(id)
      .then(() => {
        this.callBackEventEmitter.emit(true);
        this.notifyService.showSuccess('Xóa thành công !!', 'Success');
      })
      .catch(() => {
        this.callBackEventEmitter.emit(false);
        this.notifyService.showError('Xóa thất bại !!', 'Error');
      });
  }
}
