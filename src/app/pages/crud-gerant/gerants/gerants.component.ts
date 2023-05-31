import { Component,OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/backend/users.service';
 import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gerants',
  templateUrl: './gerants.component.html',
  styleUrls: ['./gerants.component.css']
})
export class GerantsComponent implements OnInit {
  gerants: any[];
  deleteUserMessage:string
  constructor(  private router: Router,private toastr:ToastrService,private userService: UsersService) { }
  ngOnInit() {
    this.getGerants();
  }
  private getGerants()
 { this.userService.getUsers().subscribe(users => {
    this.gerants = users.filter(user => user.role === 'Gerant');
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
      this.userService.getUsers();
      if (result) {
        this.toastr.success('Gerant', 'Gerant is delete successfully');
      //  this.deleteUserMessage = 'user is delete successfully';
        this.router.navigate(['/admin/gerants/']);
      }
    });
  })
}
}
