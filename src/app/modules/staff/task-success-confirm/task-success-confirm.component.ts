import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-task-success-confirm',
  templateUrl: './task-success-confirm.component.html',
  styleUrls: ['./task-success-confirm.component.scss'],
})
export class TaskSuccessConfirmComponent implements OnInit {
  modalRef: BsModalRef;
  idTask: number;
  trangThai: boolean;
  @ViewChild(TemplateRef) template: TemplateRef<any>;
  @Output() agreeSuccess = new EventEmitter<number>();

  constructor(
    private modalService: BsModalService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {}
  onOpenModalCorfirmSuccessTask(id: number, trangThai: boolean) {
    this.modalRef = this.modalService.show(this.template);
    this.idTask = id;
    this.trangThai = trangThai;
  }
  onConfirm() {
    this.agreeSuccess.emit(this.idTask);
    this.modalService.hide();
  }

  onDecline() {
    this.modalService.hide();
    // this.callBackEventEmitter.emit(false);
    this.notifyService.showInfo('Đã hủy !!', 'Thông báo');
  }
}
