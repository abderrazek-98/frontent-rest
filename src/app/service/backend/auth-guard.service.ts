import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/service/backend/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  ok=false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  canActivate(): boolean {

    if (this.authService._isLogged()) {
      console.log("connecte");
      return true;
    } else {
      console.log("non connecte ");
      this.router.navigate(['/']);
      return false;
    }
  }
}
