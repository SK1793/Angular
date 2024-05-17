import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from '../shared/user.service';
import { UserModel } from '../user-data/user-model.model';

@Component({
  selector: 'app-user-update',
  standalone:true,
  templateUrl: './user-update.component.html',
  imports: [AppComponent,NgFor,NgForOf,CommonModule,FormsModule,RouterOutlet],
  styleUrls: ['../styles.css']
})
export class UserUpdateComponent implements OnInit{

  usr_Id:number=0;
  isUpdate:boolean=false;
   editContainer=document.getElementById('formSubmitNotes');
    updatebtn=document.getElementById('UserUpdatebtn');
    UpdateSubmitted:boolean=false;

  constructor(public service:UserService,private router:Router){}
  ngOnInit(): void {
    this.getUserDetails();

    this.usr_Id=Number(window.sessionStorage.getItem('userid'));
    if(this.isUpdate){
      this.updatebtn?.toggleAttribute('enabled');

    }else{
      this.updatebtn?.toggleAttribute('disabled')


    }
    console.log("User_id: "+this.usr_Id)
    if(this.usr_Id<1){
    this.router.navigate(['/todo_list']);
    console.log("LoggedOut");
    }


  }

  getUserDetails(){
    this.service.refreshUserList();
  }



  Edit(item:UserModel){
        this.isUpdate=!this.isUpdate;
    if( this.isUpdate){
      document.getElementById('formUpdateUser')!.style.display="block";
      this.service.UserDataObj=Object.assign({},item);
      if(this.editContainer!=null){

        this.editContainer.style.display='block';

      }
    }else{
      this.service.UserDataObj=new UserModel;
      if(this.editContainer!=null){
        this.editContainer.style.display='none';
      }
      document.getElementById('formUpdateUser')!.style.display="none";
    }
    document.getElementById('formUpdateUser')!.scrollIntoView();

  }

  UpdateUserform(form:NgForm){
    if(form.valid){
      console.log(form.form.value);
    if(form.form.get('userName')?.getRawValue==null ){
        alert('please fill all cumpulsory data ');
    }else{
      this.service.userUpdate(form,this.usr_Id);
      this.UpdateSubmitted=true;
      document.getElementById('formSubmitNotes')!.style.display="none";
    }
  }

  }

}
