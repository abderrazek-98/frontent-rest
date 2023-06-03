import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from 'src/app/models/LoginModel';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //public router:Route;
  baseUrl = 'https://restauration.onrender.com/api/auth/login';
  isLogged:boolean=false;
  currentAdmin:any
  constructor(private http: HttpClient,private router:Router) {
    var token=localStorage.getItem('jwt');
    if (token) {
      const jwt = new JwtHelperService();//validation
      this.currentAdmin = jwt.decodeToken(token);
      console.log(this.currentAdmin);
      localStorage.setItem('currentAdmin',JSON.stringify(this.currentAdmin))
      this.isLogged = true;
      console.log(this.isLogged);

    }
  }
  init(){
    var token=localStorage.getItem('jwt');
    if (token) {
      const jwt = new JwtHelperService();//validation
      this.currentAdmin = jwt.decodeToken(token);
      console.log(this.currentAdmin);
      localStorage.setItem('currentAdmin',JSON.stringify(this.currentAdmin))
      this.isLogged = true;
    }
  }
  login(user :LoginModel):Observable<String>{
    return this.http.post<String>(this.baseUrl,user)
  }
  _isLogged(){
    return this.isLogged;
  }
 logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentAdmin');
    this.isLogged = false;
    //window.location.href = '/';
    this.router.navigate(['/']);

  }


}
