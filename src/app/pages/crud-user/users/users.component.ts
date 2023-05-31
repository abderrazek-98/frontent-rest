import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/backend/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  gerants: any[] = [];
  admins: any[] = [];

  constructor(public userService: UsersService,
    private toastr:ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.getUsers()
  }
  getUsers(){
    this.userService.getUsers().subscribe(users => {
      this.users = users;

    });
  }
  DeleteUser(id:string){
    Swal.fire({
      icon:'info',
      title:"Vous Êtes sûr ?",
      confirmButtonText:"Supprimer",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed)
    this.userService.deleteUser(id).subscribe( {next:()=>{

       this.toastr.success('User', 'User is deleted successfully');
       this.getUsers()
       //this.router.navigate(['/admin/users/']);

         }
       ,error: err=>{
         this.toastr.error(err)
  }});
    })
  }

}
