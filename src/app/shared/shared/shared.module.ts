import { EditProfileComponent } from './../../modules/core/edit-profile/edit-profile.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeleteConfirmComponent } from 'src/app/modules/core/delete-confirm/delete-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [EditProfileComponent,DeleteConfirmComponent],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    EditProfileComponent,
    DeleteConfirmComponent,
    ModalModule,
  ],
})
export class SharedModule {}
