import {Component} from '@angular/core';
import users from 'src/app/db/users';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // imports: [MatCardModule],
  // standalone: true
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  auth: boolean = false
  users:any = []
  
  constructor(private router: Router, private authService: AuthService, private http:HttpClient) {
    
  }

//   gotoHome(){
//     this.router.navigate(['/dashboard']);  
// }

ngOnInit(): void{
  // this.authService.getUsers().subscribe((res) => {
  //   // this.users = res.data
  //   this.users = res
  // })
  if(this.authService.checkAuth()){
    this.authService.gotoHome()
  }
}


  onSubmit() {
    if(this.username === "" || this.password === ""){
      window.alert("Please enter both username and password");
      return
    }

    // const user = this.users.find((user:any) => user.username === this.username)

    this.authService.loginUser(this.username, this.password).subscribe((res) => {
      if(res.success){
        localStorage.setItem("authToken", res.data.token)
        this.authService.setAuthUser(res.data.user)
        // localStorage.setItem("username", res.data.user.username)
        alert(res.message)
        this.authService.gotoHome()
      }
    },
    (error) => {
      // This block will only execute if catchError is used
      if(error.error.message){
        alert(error.error.message)
      }
      console.error('Error handler:', error);
    })
  }

}
