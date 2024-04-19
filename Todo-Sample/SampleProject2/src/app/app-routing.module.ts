import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { CodeVerificationComponent } from './forgot-password/code-verification/code-verification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TodolistComponent } from './todolist/todolist.component';
import { UserUpdateComponent } from './user-update/user-update.component';


export const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'todo_list',component:TodolistComponent},
  {path:'profile',component:UserUpdateComponent},
  {path:'forgotPass',component:ForgotPasswordComponent},
  {path:'VerifyCode',component:CodeVerificationComponent},
  {path: 'error', component: ErrorComponent },
  {path: '**', redirectTo:'todo_list',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{bindToComponentInputs:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
