
export class ToDoModel {
        id=0;
        userId= Number(window.sessionStorage.getItem('userid'));
        userMessage= "";
        userTitle="";

set setid(val:number){this.id=val;}
set setuserid(val:number){this.userId=val;}
set setusermessage(val:string){this.userMessage=val;}
set setusertitle(val:string){this.userTitle=val;}

get getid(){return this.id;}
get getuserid(){return this.userId;}
get getusermessage(){return this.userMessage;}
get getusertitle(){return this.userTitle;}

}
