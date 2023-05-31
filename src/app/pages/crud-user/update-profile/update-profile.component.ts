import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { UsersService } from 'src/app/service/backend/users.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/backend/auth.service';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  userData!:UserModel;
  userForm!:FormGroup;
  user_id!:string;
  patternphone=(/(\+216|00216)?[2459]\d{7}/);
 constructor(private route:ActivatedRoute, private formBuilder:FormBuilder,
  private router:Router,private toastr:ToastrService,
   private activeRoute:ActivatedRoute ,public userService:UsersService
   ,private authService:AuthService)
 {

  this.authService.init()
  let admin=localStorage.getItem('currentAdmin');
 console.log(admin);
 //this.user_id=this.admin.id;
 this.user_id= this.route.snapshot.params['id'];


 }

 ngOnInit(): void {



      this.userForm = this.formBuilder.group({
        name:this.formBuilder.control ('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
        firstname: this.formBuilder.control ('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
        role: this.formBuilder.control (''),
        email: this.formBuilder.control ('', [Validators.required, Validators.email]),
        phone:this.formBuilder.control ('', [Validators.required, Validators.pattern(this.patternphone)]),
        password: this.formBuilder.control ('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]),

      });
      this.userService.getUser(this.user_id).subscribe({
        next: (userData :UserModel)=>{
         console.log(userData);
    this.userForm.setValue({
      name:userData.name,
      firstname:userData.firstname,
      role:userData.role,
      email:userData.email,
      phone:userData.phone,
      password:userData.password,


    })}
    ,error:(err)=>{
      this.toastr.error(err);

    }
  })
  }
onUpdate()
{ if (this.userForm.invalid) {
  const controls = this.userForm.controls;
  Object.keys(controls).forEach(controlName =>
    controls[controlName].markAsTouched()
  );
}else{
  const user=this.userForm.value;

  this.userService.updateUser(this.user_id,user).subscribe( {
    next:(_result:UserModel)=>{
      this.toastr.success('Notification', 'Admin modifier avec succés');
        this.router.navigate(['/admin/']);

         }
       ,error: err=>{
         this.toastr.error(err)
  }});
}
}
}
