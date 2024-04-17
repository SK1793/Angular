export class UserModel {

    userId= Number(window.sessionStorage.getItem('userid'));
    userName= "";
    userPassword= 0;
    userMail= "";
    userGender= "";
    userDob= 0;

set setuserid(val:number){this.userId=val;}
set setusermail(val:string){this.userMail=val;}
set setuserpassword(val:number){this.userPassword=val;}
set setusername(val:string){this.userName=val;}
set setusergender(val:string){this.userGender=val;}
set setuserdob(val:number){this.userDob=val;}

get getuserdob(){return this.userDob}
get getusermail(){return this.userMail}
get getusername(){return this.userName}
get getusergender(){return this.userGender}
get getuserpassword(){return this.userPassword}
get getuserid(){return this.userId}


}


