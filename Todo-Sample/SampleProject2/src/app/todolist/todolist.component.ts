import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from '../shared/user.service';
import { ToDoModel } from '../to-do-data/to-do-model.model';
import { UserModel } from '../user-data/user-model.model';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [AppComponent,NgFor,NgForOf,CommonModule,FormsModule,RouterOutlet],
  templateUrl: './todolist.component.html',
  styleUrls: ['../styles.css']
})

export class TodolistComponent implements OnInit,OnChanges{
[x: string]: any;

 userid:string='';
 usr_id:number=0; usr_name:string='';usr_mail:string='';usr_pass:string='';usr_gender:string='';usr_dob:string='';
 isOptionUpdate:boolean=false;
 isLoggedin:boolean=false;
 selectedUpdateId:number=0;
 UpdateModel:ToDoModel=new ToDoModel;

constructor(public service:UserService){

}
  ngOnChanges(changes: SimpleChanges): void {
    // if(changes['usr_id']){
    //   usr_id=String(window.sessionStorage.getItem('userid'));
    //   usr_name=String(window.sessionStorage.getItem('userName'));
    //   console.log("userName(OnChange): "+usr_name);
    //   console.log("id(OnChange): "+usr_id);
    // }
  }

  ngOnInit(): void {

    let usr_:UserModel;
    this.service.refreshNotesList();
    this.service.refreshUserList();

    this.usr_id=Number(sessionStorage.getItem('userid'));
    this.usr_name=String(sessionStorage.getItem('userName'));
     console.log("userName(Init): "+this.usr_name);
     console.log("id(Init): "+this.usr_id);

  }

  checkUser(usr_id:string){
    for(let usr_ of this.service.list_User){
      // console.log(usr_.userName);
      if(String(usr_.userId).trim()==usr_id){
          this.usr_name=usr_.userName;
          this.usr_mail=String(window.sessionStorage.setItem('userName',usr_.userName));
          this.usr_mail=String(window.sessionStorage.setItem('userMail',usr_.userMail));
          this.usr_pass=String(window.sessionStorage.setItem('userPass',String(usr_.userPassword)));
          this.usr_gender=String(window.sessionStorage.setItem('userGender',usr_.userGender));
          this.usr_dob=String(window.sessionStorage.setItem('userDob',String(usr_.userDob)));
      }
    }
  }

  get User_id(){
    this.checkUser(String(this.usr_id));
    return sessionStorage.getItem('userid')?sessionStorage.getItem('userid'):'0';
  }

  get UserName(){

  this.checkUser(String(this.usr_id));

    return sessionStorage.getItem('userName')?sessionStorage.getItem('userName'):'Unknown';
  }

  onsubmitNotes(form:NgForm){
    this.service.TodoFormSubmitted=true;
    if(this.isOptionUpdate){
      if(form.valid){
        console.log("for Update")
        console.log("id:"+this.selectedUpdateId)
        // this.service.UpdateNotes(form);
        if(Number(this.selectedUpdateId)>0){
          // console.log("form: "+this.UpdateModel)
      this.service.updateNotes(form,String(this.selectedUpdateId));
        }
      }
    }else{
    if(form.valid){
      console.log("for New Note")

      this.service.putNotes(form);
    }
    }


  }

deleteNote(item:ToDoModel){
      console.log("Deleted: ");
      console.log(item as ToDoModel);
      this.service.deleteNotes(item.id)

}

settoeditmode(item:ToDoModel){
  this.isOptionUpdate=!this.isOptionUpdate;
  this.selectedUpdateId=item.id;
  this.UpdateModel=item ;
  var form=document.getElementById("formeditdiv");
  var title=document.getElementById("userTitle");
  var message=document.getElementById("userMessage");
  var btn=document.getElementById("NotesAddBtn");
  console.log("UpadteItem: ");
  console.log(item as ToDoModel);
  console.log(item.id);


  // title?.toggleAttribute('enabled');
  // message?.toggleAttribute('enabled');

if(this.isOptionUpdate){
  this.service.TodoDataObj=Object.assign({},item);
  if(btn!=null)
  btn.innerText='Update';
}else{
  this.service.TodoDataObj=new ToDoModel  ;
  if(btn!=null)
  btn.innerText='Add';

}




  // if(title?.checkVisibility()){
  //   title?.toggleAttribute('disabled');
  // }else{
  //   title?.toggleAttribute('enabled');
  // }
  //   if(message?.checkVisibility()){
  //     message?.toggleAttribute('disabled');
  // }else{
  //   message?.toggleAttribute('enabled');
  // }

  }

}
