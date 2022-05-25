import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddShiftComponent } from './components/add-shift/add-shift.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditShiftComponent } from './components/edit-shift/edit-shift.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { MyShiftsComponent } from './components/my-shifts/my-shifts.component';

import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'MyShifts', component: MyShiftsComponent, canActivate: [AuthGuard] },
  { path: 'AddShift', component: AddShiftComponent, canActivate: [AuthGuard] },
  {
    path: 'EditProfile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editShift/:shiftName',
    component: EditShiftComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
