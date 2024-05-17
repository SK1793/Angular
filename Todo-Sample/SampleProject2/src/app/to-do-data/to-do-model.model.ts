
export class ToDoModel {
        id=0;
        userId= Number(window.sessionStorage.getItem('userid'));
        userMessage= "";
        userTitle="";
        submittedDate="";
        updatedDate="";

set setid(val:number){this.id=val;}
set setuserid(val:number){this.userId=val;}
set setusermessage(val:string){this.userMessage=val;}
set setusertitle(val:string){this.userTitle=val;}
set setsubmittedDate(val:string){this.submittedDate=val;}
set setupdatedDate(val:string){this.updatedDate=val;}

get getid(){return this.id;}
get getuserid(){return this.userId;}
get getusermessage(){return this.userMessage;}
get getusertitle(){return this.userTitle;}
get getsubmittedDate(){return this.submittedDate;}
get getupdatedDate(){return this.updatedDate;}

}
