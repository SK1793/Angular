import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from '../shared/user.service';
import { SignupComponent } from '../signup/signup.component';
import { TodolistComponent } from '../todolist/todolist.component';
import { UserModel } from '../user-data/user-model.model';

var isRemember:boolean=false;

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterOutlet,SignupComponent,TodolistComponent,RouterLink,RouterLinkActive,CommonModule,
    NgFor,NgForOf,FormsModule,AppComponent
  ],
  templateUrl: './signin.component.html',
  styles: []
})


export class SigninComponent implements OnInit{
  [x: string]: any;

  constructor(public service:UserService,public router:Router){}

  ngOnInit(): void {
    var user_:UserModel;
    if(window.sessionStorage.getItem('userid')?.trim()=="0"  ||window.sessionStorage.getItem('userid')==null){

    }else{
      console.log("already logged in")
      // alert("already logged in,Redirecting...")
      console.log("session_id: "+window.sessionStorage.getItem('userid'))
      this.router.navigate(['/todo_list']);
    }
  }

  onsubmitSignin(form:NgForm){
    this.service.SigninSubmitted=true;
    if(form.valid){

      this.service.isRemember=isRemember?isRemember:false;
      console.log("isRemember: "+isRemember);

    if(this.isMailExist(form)){
      for(let user_ of this.service.list_User){

        // console.log("Form values-\nMail: "+form.form.get('userMail')?.getRawValue()+", Pass:"+form.form.get('userPassword')?.getRawValue());
        // console.log("User Mail: "+user_.userMail);
        // console.log("User Id: "+user_.userId.toString());
        // console.log("User Pass: "+user_.userPassword);
        // console.log("User name: "+user_.userName);

        if(user_.userMail==form.form.get('userMail')?.getRawValue()){
                  if( user_.userPassword==form.form.get('userPassword')?.getRawValue()){
                    window.sessionStorage.setItem('userid',String(user_.userId));
                    console.log("Session Id : "+window.sessionStorage.getItem('userid'));
                  alert("Logged In");
                  this.router.navigate(['/todo_list']);
                  location.reload();
                }else{
                  alert("password incorrect!");
                  console.log("Password Incorrect!");

                }
        }



      }
    }
  }

    }

    isMailExist(form:NgForm):boolean{
      var isexist:boolean=false;
      for(let user_ of this.service.list_User){
        var usermail:string=user_.userMail;
        // console.log("usr_mail: "+user_.userMail+",form_mail: "+form.form.get('userMail')?.getRawValue());
        if( usermail.match(form.form.get('userMail')?.getRawValue())){
          console.log("MailId exist")
          isexist= true;
        }else{
          console.log("MailId doesn't exist!")
        }
      }
      return isexist;
    }


}
