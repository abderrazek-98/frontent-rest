import { Component,OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { UsersService } from 'src/app/service/backend/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  admins: any[];
  deleteUserMessage:string;
  isButtonActive:any;
  constructor(private userService: UsersService,
    private toastr:ToastrService, private router: Router) { }

  ngOnInit() {
    this.getAdmins();
  }
  private getAdmins()
 { this.userService.getUsers().subscribe(users => {
    this.admins = users.filter(user => user.role === 'Admin');
    if (this.admins.length<1) {
      this.isButtonActive = true;
    } else {
      this.isButtonActive = false;
    }
  });}
  DeleteUser(id:string){
     Swal.fire({
    icon:'info',
    title:"Vous Êtes sûr ?",
    confirmButtonText:"Supprimer",
    showCancelButton:true
  }).then((result)=>{
    if(result.isConfirmed)
    this.userService.deleteUser(id).subscribe(result=>{
     // this.userService.getUsers();
      this.getAdmins();
      if (result) {
        this.toastr.success('Admin', 'Admin is delete successfully');
      //  this.deleteUserMessage = 'user is delete successfully';
        this.router.navigate(['/admin/admins/']);
      }
    });
  })
  }
}
