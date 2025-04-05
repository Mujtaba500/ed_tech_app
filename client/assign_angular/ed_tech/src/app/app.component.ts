import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ed_tech';
  navDisplay = false

  constructor(private router: Router,private activatedRoute: ActivatedRoute, private authService: AuthService, ) {
    this.navDisplay = authService.checkAuth()
    router.events.subscribe((val) => {
      // see also 
      this.navDisplay = authService.checkAuth()
  });
  }

  ngOnInit(){
    this.authService.AuthorizeUser()
 
  }
  

}
