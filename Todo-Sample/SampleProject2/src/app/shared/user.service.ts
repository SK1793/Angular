import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { ToDoModel } from '../to-do-data/to-do-model.model';
import { UserModel } from '../user-data/user-model.model';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

  url:string=environment.apiBaseUrl;
  public headers:any = new HttpHeaders()
  .append('Content-Type', 'application/json');

  list_Todo:ToDoModel[]=[];
  list_User:UserModel[]=[];
  UserDataObj:UserModel=new UserModel();
  TodoDataObj:ToDoModel=new ToDoModel();
   isOptionUpdate:boolean=false;
   isRemember:boolean=false;
   TodoFormSubmitted:boolean=false;
   SignupSubmitted:boolean=false;
   SigninSubmitted:boolean=false;

  constructor(private http:HttpClient) { }

  refreshUserList(){
    this.http.get(this.url+'/UserDetails',{headers:this.headers})
    .subscribe({
      next:value=> {
        this.list_User=value as UserModel[];
          // console.log("User Details: \n");
          // console.log(value);
      },error(err: any) {
        console.log("Error(reading Api data):\n ");
        console.info(err);
      }
    })
  }
    userUpdate(form:NgForm,id:Number){
    this.http.put(this.url+'/UserDetails/'+id,this.UserDataObj,{headers:this.headers})
    .subscribe({
      next:value=> {
        console.log(value as UserModel)
        this.list_User=value as UserModel[];
          // console.log("User Details: \n");
          // console.log(value);
          form.form.get('userName')?.setValue('');
          form.form.get('userDob')?.setValue('');
          form.form.get('userGender')?.setValue('');
          alert("User Updated!")
          window.location.reload();
      },error(err: any) {
        console.log("Error(reading Api data):\n ");
        console.info(err);
      }
    })
  }



  refreshNotesList(){
    this.http.get(this.url+'/NotesDetails',{headers:this.headers})
    .subscribe({
      next:val=> {
        this.list_Todo=val as ToDoModel[];
          // console.log("Notes Details: \n");
          // console.log(val);
      },error(err: any) {
        console.log("Error(reading Api data):\n ");
        console.info(err);
      }
    })
  }


  //Add TO-do tasks to DB
  putNotes(form:NgForm){
    this.http.post(this.url+'/NotesDetails',this.TodoDataObj,{headers:this.headers})
    .subscribe({
      next:val=> {
        this.list_Todo=val as ToDoModel[];
        console.log(val);
        // console.log("values: "+this.list_Todo.forEach(e=>console.log(e)));
        this.isOptionUpdate=false;
        form.form.get('UserTitle')?.setValue('');
        form.form.get('UserMessage')?.setValue('');
        alert("Task Added!");
      },error(err: any) {
        alert("Some Error while Adding Task");
        console.log("Error(reading Api data):\n ");
        console.info(err);
      }
    })
  }

  updateNotes(form:NgForm,id:string){

    this.http.put(this.url+'/NotesDetails/'+id,this.TodoDataObj,{headers:this.headers})
    .subscribe({
      next:val=> {
        this.list_Todo=val as ToDoModel[];
        console.log(val);
        // console.log("values: "+this.list_Todo.forEach(e=>console.log(e)));
        this.isOptionUpdate=false;
        form.form.get('UserTitle')?.setValue('');
        form.form.get('UserMessage')?.setValue('');
        alert("Task Updated!");
      },error(err: any) {
        alert("Some Error while Updating Task");
        console.log("Error(reading Api data):\n ");
        console.info(err);
      }
    })
  }

  deleteNotes(id:number){

    this.http.delete(this.url+'/NotesDetails/'+id)
    .subscribe({
      next:val=> {

        console.log(val);
        // console.log("values: "+this.list_Todo.forEach(e=>console.log(e)));
        this.isOptionUpdate=false;
        this.list_Todo=val as ToDoModel[];
        alert("Task Deleted!");
        // window.location.reload();
      },error(err: any) {
        alert("Some Error while Deleting Task");
        console.log("Error(reading Api data):\n ");
        console.info(err);
      }
    })
  }

  //Add Users to DB
  putUsers(form:NgForm){
    this.http.post(this.url+'/UserDetails',this.UserDataObj,{headers:this.headers})
    .subscribe({
      next:val=> {
        this.list_User=val as UserModel[];
        console.log(val);
        this.resetForm(form);
        alert("User Added!");
      },error(err: any) {
        alert("Some Error while Adding User(Check values try again later)");
        console.log("Error(reading Api data):\n ");
        console.info(err);
      }
    })
  }






  resetForm(form:NgForm){
    form.form.reset();
    this.TodoDataObj=new ToDoModel();
  }

  settoeditmode(){
    this.isOptionUpdate=false;
    return this.isOptionUpdate;
  }

}
