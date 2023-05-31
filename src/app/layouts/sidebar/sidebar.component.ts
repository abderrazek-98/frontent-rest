import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/backend/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentAdmin:any;
  constructor(private authService:AuthService){
    this.authService.init()
    let admin=localStorage.getItem('currentAdmin');
    console.log(admin)
    if(admin)
      this.currentAdmin=JSON.parse(admin)
  }
ngOnInit(): void {

}

logout() {
   this.authService.logout()
  }

}
