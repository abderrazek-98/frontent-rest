import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { UsersService } from 'src/app/service/backend/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  implements OnInit{
  userForm!:FormGroup;
  patternphone=(/(\+216|00216)?[2459]\d{7}/);
  patternpaswword=(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
  constructor( private router: Router,private formBuilder:FormBuilder  ,private toastr:ToastrService,public userService:UsersService){}
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name:this.formBuilder.control ('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      firstname: this.formBuilder.control ('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      role: this.formBuilder.control ('Admin'),
      email: this.formBuilder.control ('', [Validators.required, Validators.email]),
      phone:this.formBuilder.control ('', [Validators.required, Validators.pattern(this.patternphone)]),
      password: this.formBuilder.control ('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]),

    });

  }
  onSubmit(data: UserModel) {
    if (this.userForm.invalid) {
      const controls = this.userForm.controls;
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
    }else{
    const user=this.userForm.value;
    console.log(user);

    this.userService.addUser(user).subscribe( {
     next:(result:UserModel)=>{
      this.toastr.success('Notification', 'Admin ajouter avec succés');
     this.router.navigate(['/admin/admins/']);
      }
    ,error: err=>{
      this.toastr.error(err)
    }});
  }
}

}
