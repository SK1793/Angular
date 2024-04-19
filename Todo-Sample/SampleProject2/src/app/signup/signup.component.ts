import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AppComponent } from '../app.component';
import { UserService } from '../shared/user.service';

var isSignedIn:boolean=false;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AppComponent,CommonModule,FormsModule],
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit,OnChanges{
[x: string]: any;
 UserPasswordMatch: string='';
  isMailExist:boolean=false;

  constructor(public service:UserService){}

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes['isSignedIn']){

    // }
  }

  ngOnInit(): void {

  }


  onsubmitSignup(form:NgForm){
    this.service.SignupSubmitted=true;
    if(form.valid){
      for(let _user of this.service.list_User){

        if(String(form.form.get('userMail')?.getRawValue)==_user.userMail){
          this.isMailExist=true;
        }
      }
      if(this.isMailExist){

        this.UserPasswordMatch=String(form.form.get('UserPassMatch'));
        this.service.putUsers(form);
      }else{
        alert('user already exist with this Mail ID');
      }

    }
  }
}
