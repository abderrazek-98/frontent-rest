import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/backend/auth.service';
import { LoginModel } from 'src/app/models/LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  msg:string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.init()
  }

  ngOnInit() {
    console.log(this.authService._isLogged());

    if (this.authService._isLogged()) {
      this.router.navigate(['/admin/']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.msg="verifier votre information";
    }
    let loginData: LoginModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.login(loginData).subscribe(
      (data: any) => {
        console.log(data.token),
        localStorage.setItem('jwt', data.token);
this.authService.init()
        this.router.navigate(['/admin/']);
      },
      (err: any) => console.log(err)
    );
  }
  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }


}

