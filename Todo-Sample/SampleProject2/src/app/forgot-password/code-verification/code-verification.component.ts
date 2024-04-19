import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-code-verification',
  standalone:true,
  templateUrl: './code-verification.component.html',
  imports: [AppComponent,NgFor,NgForOf,CommonModule,FormsModule,RouterOutlet],
  styles: [
  ]
})
export class CodeVerificationComponent implements OnInit{
  user_id:number=0;VerfMail:string='';Session_id:number=0;
  user_pass:string='';peek:boolean=false;user_Name:string='';confirmPass:string='';
  user_dob:string='';

  constructor(public service:UserService,private router:Router){}
  ngOnInit(): void {
    var code=sessionStorage.getItem('VerificationCode');

    if(window.sessionStorage.getItem('VerificationMail')==undefined){
      alert('Session Invalid,Autoloading to signin')
      this.router.navigate(['/signin']);
    }


    this.service.refreshUserList;

    if(code){
      console.log('date.now :'+Date.now()+", Seesion Timeout: "+JSON.parse(code).timeout);

      if(Date.now() > JSON.parse(code).timeout){
        sessionStorage.removeItem('VerificationCode');
        alert('Session Over Reloading back');
        this.router.navigate(['/forgotPass']);

      }
    }else{
      console.log('Session Code Expired!');

    }

    this.VerfMail=String(window.sessionStorage.getItem('VerificationMail'));
    this.Session_id=Number(window.sessionStorage.getItem('userid'));
    console.log("User DOB: "+this.user_dob);
  }

  fetchDetails(){

    for(let _user of this.service.list_User){
      if(_user.userMail==this.VerfMail){
      this.service.UserDataObj=Object.assign({},_user);

        this.user_pass=String(_user.userPassword);
        this.user_id=_user.userId;
        this.user_Name=_user.userName;
        this.user_dob=String(_user.userDob);
        console.log("User ID: "+this.user_id+", User Name: "+this.user_Name+", User DOB: "+this.user_dob)
      // console.log(_user as UserModel);

      }
    }

  }

  PeekPass(){
    this.fetchDetails();
    this.peek=!this.peek;
    if(this.peek){
      console.log('user_pass: '+this.user_pass);
    }
  }

  UpdatePass(){
    this.fetchDetails();
    var btnpassUpdate=document.getElementById('UserPassbtn');
    btnpassUpdate?.toggleAttribute('disabled');
  }

  UpdateUserPassform(form:NgForm){

    if(form.valid){


    console.log(form.form.get('userPassword')?.getRawValue().trim()+" , "+this.confirmPass)
        console.log('Form Valid')

        if(form.form.get('userPassword')?.getRawValue().trim()!=null){
          console.log('inside not null')
        if(form.form.get('userPassword')?.getRawValue().trim()==this.confirmPass){
          console.log('Form');
          console.log(form.form.value);

          this.service.userUpdate( form,this.user_id);
        }else{
          alert('Password not matching!');
        }
        }else{
          alert("please enter the fields before reset");
        }

  }
}
}
