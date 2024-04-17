import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserModel } from '../user-data/user-model.model';

var mailid_:string;
var _user:UserModel;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [
  ]
})

export class ForgotPasswordComponent implements OnInit {
  // [x:string]:any;


  constructor(public service:UserService){}

  @Input('id') mailId ='';
  ngOnInit(): void {
    if (this.mailId) {
      mailid_=this.mailId;
      this.isValidMail(mailid_);
    }
  }

  isValidMail(mail:string){
    for(let _user of this.service.list_User ){
        if(_user.userMail==mailid_){
          alert('Acc found');

        }else{
          alert('Account is not registered!')
        }
    }

  }

}
