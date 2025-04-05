import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  users:User[] = []

  formGroup!: FormGroup;

  constructor(private authService:AuthService){

  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,  Validators.minLength(4),])
    });

    // this.authService.getUsers().subscribe((res) => {
    //   // this.users = res.data
    //   this.users = res
    // })

    if(this.authService.checkAuth()){
      this.authService.gotoHome()
    }
  }
  

  onSubmit(){
    
    const {username, password} = this.formGroup.value
    
    if(username === "" || password === ""){
      alert("Please enter both username and password");
      return
    }

    // const user = this.users.find((user:User) => {
    //   return user.username === username
    // })

    // if(user){
    //   alert("User already exists")
    //   return
    // }

    this.authService.createUser(username,password).subscribe((res) => {
      console.log(res)
        if(res.success){
          alert("Registration successful! Please login to continue")
        }
      
      this.authService.goToLogin()
    }, (error) => {
      if(error.error.message){
        alert(error.error.message)
      }
      console.error('Error handler:', error);
    }
  )

    

    
  }
}
