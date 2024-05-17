import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import emailjs from '@emailjs/browser';
import { AppComponent } from '../app.component';
import { UserService } from '../shared/user.service';
import { SignupComponent } from '../signup/signup.component';
import { TodolistComponent } from '../todolist/todolist.component';
import { UserModel } from '../user-data/user-model.model';

var mailid_:string;
var _user:UserModel;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone:true,
  imports: [RouterOutlet,SignupComponent,TodolistComponent,RouterLink,RouterLinkActive,CommonModule,
    NgFor,NgForOf,FormsModule,AppComponent
  ],
  styles: [
  ]
})

export class ForgotPasswordComponent implements OnInit {
  // [x:string]:any;
mailId:string='';EnteredMail:string="";
VerfCode:string='';VerfCodeResent:string='';Otp:string='';
 resendOtpbtn:any;resendOtpOption:boolean=false;
  timer:any=null;

forms:FormGroup=this.fb.group({
    to_name:'',
    from_name:'SK',
    message:'',
    subject:'',
    from_email:''
});


  constructor(public service:UserService,private fb:FormBuilder,private router:Router){}

  ngOnInit(): void {
    this.mailId!=window.sessionStorage.getItem('userMail');
    if (this.mailId) {
      mailid_=this.mailId;
      this.isValidMail(mailid_);

    }
  }

  VerfForm(form:NgForm){
    if(form.valid){
      console.log("VerfFcode: "+this.VerfCode.trim()+" ,OTP: "+form.form.get('VerfCode')?.getRawValue().trim())
     if(this.VerfCode.trim()==form.form.get('VerfCode')?.getRawValue().trim()){
      alert("Verification Code is Correct,Autoloading to next page")
      this.router.navigate(['/VerifyCode']);

     }else{
      alert(" Incorrect Code ")

     }
    }
  }

  isValidMail(mail:string){
    var isMailFound:boolean=false;
    var otpbtn=document.getElementById('BtnOTp');
    var otpbtnResend=document.getElementById('BtnOTpResend');
    var result=document.getElementById('Result');
    var CodeTimeout:number=0;
    if(mail!=null){

    for(let _user of this.service.list_User ){
        if(_user.userMail==mail){
          console.log("mailID(db): "+_user.userMail +" ,mailID(form): "+mail )
          if(!this.resendOtpOption){
            alert('Acc found');
          }
          isMailFound=true
          this.mailId=_user.userMail;
          if(window.sessionStorage.getItem('VerificationCode')!=null){
            window.sessionStorage.removeItem('VerificationCode');
          }
          window.sessionStorage.setItem('VerificationMail',_user.userMail);
          this.VerfCode=""+String(Math.random()).substring(2,8);
          sessionStorage.setItem('VerificationCode', JSON.stringify({
            value: this.VerfCode,
            timeout: Date.now() + 1 * 60 * 1000
          }));
          var VerfCodeSession=window.sessionStorage.getItem('VerificationCode');
          if(VerfCodeSession!=null){
            CodeTimeout=JSON.parse(VerfCodeSession).timeout;
            otpbtn?.toggleAttribute('disabled');
          }

          try{
            emailjs.init("UfyB-rgHJPWNkFukZ");  //Initializing with Public Key
            emailjs.send("service_d2hk2g7","template_z7in0gh",{
              to_name:  this.EnteredMail.split('@')[0]+"",
              to_mail:window.sessionStorage.getItem('VerificationMail'),
              from_name: "Admin",
              message: "Your Verification Code is :"+this.VerfCode,
              subject: "Verification Code for ToDOListz",
              from_email: "manjusk1793@gmail.com",

            });
          if(!this.resendOtpOption){

                alert('Verification Cod Sent');

          }
    this.timer= setInterval(()=>{
                result!.innerHTML= "Code is Sent and will be available for a minute(1:00)"+
                  Math.trunc((CodeTimeout-Date.now())/1000);
                  if(Math.trunc((CodeTimeout-Date.now())/1000)<1){
                    console.log("VerfCOde timeout: "+this.VerfCode);
                    window.sessionStorage.removeItem("VerificationCode");

                    otpbtn?.toggleAttribute('disabled');
                    otpbtnResend?.toggleAttribute('disabled');
                    clearInterval(this.timer);

                  }
                },1000);

                +"sec";

          }catch(Exception){
           console.log("Error!Some Exception caused while Sending Mail")
          }

        }
    }
    if(!isMailFound){
      alert('Acc not found');

    }

  }else{
    alert("enter Correct Mail Id to Proceed");
  }

  }

Verification(form:NgForm){
  this.isValidMail(form.form.get('UserMail')?.value)
}

ResendOtp(){
  this.resendOtpOption=true;
  if(window.sessionStorage.getItem('VerificationMail')?.toString()!=null){
    this.isValidMail(window.sessionStorage.getItem('VerificationMail')!.toString());
    document.getElementById('BtnOTpResend')?.toggleAttribute('disabled');
  }else{
    alert("enter email Id Again and verify");
  }

}



}
