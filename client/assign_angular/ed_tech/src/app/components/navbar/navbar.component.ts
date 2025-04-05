import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = "Ed Tech App"

  constructor(private router:Router, private authService: AuthService){

  }

  @Input() auth = true  

  onLogoutClick(){
    this.authService.logout()
  }


}
