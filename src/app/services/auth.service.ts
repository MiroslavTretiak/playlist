import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthResponseData } from '../models/authResponseDdata';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public auth:AuthResponseData|null=null;
  public isLoggedin=false;
  public onUserStatusChange= new EventEmitter<boolean>();

  constructor(private http:HttpClient, private router:Router) { }

  public register(email:string, password:string, newUser:boolean){
    const method=(newUser)?'signUp':'signInWithPassword';

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:'+method+'?key=AIzaSyAsWHY7p3xCmFrjWOiL6vZUN1zJp7AQ8hk',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(tap( (response)=>{
      this.auth=response;
      this.isLoggedin=true;
      localStorage.setItem("user", JSON.stringify(this.auth));
      this.onUserStatusChange.emit(true);
    }));
  }

  public autoLogin() {
    let user=localStorage.getItem("user");
    if(user!=null){
      this.auth=JSON.parse(user)
      this.isLoggedin=true;
      this.onUserStatusChange.emit(true);
      
    }
  }

  public logout(){
    this.isLoggedin=false;
    this.auth=null;
    localStorage.removeItem("user");
    this.onUserStatusChange.emit(false);
    this.router.navigate(['/']);
  }
}
