import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddShiftComponent } from './components/add-shift/add-shift.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { MyShiftsComponent } from './components/my-shifts/my-shifts.component';

import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'MyShifts', component: MyShiftsComponent },
  { path: 'AddShift', component: AddShiftComponent },
  { path: 'EditProfile', component: EditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
