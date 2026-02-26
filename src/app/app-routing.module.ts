import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './shared/component/user-dashboard/user-dashboard.component';
import { UserFormComponent } from './shared/component/user-form/user-form.component';
import { UserSingleCardComponent } from './shared/component/user-single-card/user-single-card.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserDashboardComponent
  },
  {
    path: 'user/add',
    component: UserFormComponent
  },
  {
    path: 'user/:userId',
    component: UserSingleCardComponent
  },
  {
    path: 'user/:userId/edit',
    component: UserFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
