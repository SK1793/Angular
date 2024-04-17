import { Component, NO_ERRORS_SCHEMA, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app-routing.module';
import { UserService } from './shared/user.service';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from "./signup/signup.component";
import { TodolistComponent } from './todolist/todolist.component';


var isLoggedin:boolean;

@Component({
    selector: 'app-root',
    standalone: true,
    schemas:[NO_ERRORS_SCHEMA],
    templateUrl: './app.component.html',
    styleUrls:['./styles.css'],
    imports: [RouterOutlet, SignupComponent,SigninComponent,TodolistComponent,RouterLink,HttpClientModule,CommonModule,
      RouterModule]
})

export class AppComponent implements OnInit,OnChanges{
  public SessionStore:any;public userid:string='';public userName:string='';
constructor(public service:UserService,private router:Router){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['userid']){
      this.userid=String(window.sessionStorage.getItem('userid'));
      this.userName=String(window.sessionStorage.getItem('userName'));
      console.log("userName(OnChange): "+this.userName);
      console.log("id(OnChange): "+this.userid);
    }
  }

  ngOnInit(): void {
    this.userid=String(window.sessionStorage.getItem('userid'));
    this.userName=String(window.sessionStorage.getItem('userName'));

    console.log("Session Id: "+sessionStorage.getItem('userid'));
    console.log("Session Id(UserName): "+sessionStorage.getItem('userName'));

this.service.refreshUserList();
this.service.refreshNotesList();

if(window.sessionStorage.getItem('userid')?.trim()!="0"){
  isLoggedin=true;
}else{ isLoggedin=false;

}

RouterModule.forRoot(routes)
    // if(sessionStorage.getItem('userid')==null){
      //   sessionStorage.setItem('userid',JSON.stringify('0'));
      // }else if (JSON.stringify(sessionStorage.getItem('userid'))=='0') {
        //   sessionStorage.setItem('userid',JSON.stringify('0'));
        //   throw new Error('Method not implemented.');
        // }
        if(typeof window!="undefined"){
            this.SessionStore=window.sessionStorage;

            if(window.sessionStorage.getItem('userid')!=null || undefined){
              if(window.sessionStorage.getItem('userid')=='0'){
              }
            }else{
              window.sessionStorage.setItem('userid','0');
            }

            if(window.sessionStorage.getItem('userName')!=null || undefined){
              if(window.sessionStorage.getItem('userName')=='NA'){
              }
            }else{ window.sessionStorage.setItem('userName','NA');
            }

        this.userid=String(window.sessionStorage.getItem('userid'));
        this.userName=String(window.sessionStorage.getItem('userName'));
        }
  }

  Signout()
  {
    window.sessionStorage.setItem('userid','0');
    window.sessionStorage.removeItem('userName');
    alert("Logged Out!");
    // console.log("Logged Out!");
    this.router.navigate(['/todo_list']);
    location.reload();
  }

  get Username(){
    return this.userName;
  }
    get UserId(){
    return this.userid;
  }

[x: string]: any;
  title = 'SampleProject2';

}



