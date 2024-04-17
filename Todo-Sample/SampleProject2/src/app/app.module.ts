import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule, routes } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    ErrorComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,CommonModule, HttpClientModule,FormsModule,RouterModule.forRoot(routes,{bindToComponentInputs:true})

  ],
  providers: [{provide: ToastrService, useClass: ToastrService}]
})


export class AppModule {
}


