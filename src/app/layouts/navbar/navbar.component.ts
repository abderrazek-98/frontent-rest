import { Component ,OnInit} from '@angular/core';
import { AuthService } from 'src/app/service/backend/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private router: Router
  currentAdmin:any=null;

  user:any;
  ngOnInit(): void {
    let admin=localStorage.getItem('currentAdmin')
    if(admin)
  this.currentAdmin=JSON.parse(admin)

  }
  constructor(private authService: AuthService) { }
  logout() {
     this.authService.logout()
    }

  }




