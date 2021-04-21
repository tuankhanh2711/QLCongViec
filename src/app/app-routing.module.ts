import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/modules/core/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'nhan-vien',
    loadChildren: () =>
      import('src/app/modules/staff/staff.module').then((m) => m.StaffModule),
  },
  {
    path: 'quan-ly',
    loadChildren: () =>
      import('src/app/modules/admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
