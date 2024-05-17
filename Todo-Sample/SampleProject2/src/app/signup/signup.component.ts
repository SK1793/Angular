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
    this.isMailExist=false;
    this.service.SignupSubmitted=true;
    let ispassMatch:boolean=false;
    if(form.valid){
      for(let _user of this.service.list_User){
          console.log('usermail(form): '+form.form.get('userMail')?.value + ' ,Mail(DB): '+_user.userMail);
          console.log('password(2): '+ String(form.form.get('UserPassMatch')?.value)+
          ' password(1): '+ form.form.get('userPassword')?.value);
          if( String(form.form.get('UserPassMatch')?.value)==(form.form.get('userPassword')?.value)){
            ispassMatch=true;
          }
        if( _user.userMail.match(form.form.get('userMail')?.value)){
          console.log("Mail Matched!")
          this.isMailExist=true;
        }
      }

      if(!this.isMailExist && ispassMatch){

        this.UserPasswordMatch=String(form.form.get('UserPassMatch')?.value);
        this.service.putUsers(form);
        this.service.SignupSubmitted=true;
        this.isMailExist=false;

      }else if (!ispassMatch) {
        alert('Password not Matching.');
      }
      else{
        alert('user already exist with this Mail ID');
      }

    }
  }
}
