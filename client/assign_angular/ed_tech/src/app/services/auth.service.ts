import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { API_URL } from 'src/injectibles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUser: any = ''
  // apiUrl = 'http://localhost:3000'

  constructor( private http:HttpClient, private router: Router, @Inject(API_URL) private apiUrl:string) { }

  gotoHome(){
    this.router.navigate(['/dashboard']);  
}

goToLogin(){
  this.router.navigate(['/login']);  
}

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Cache-Control' : 'no-cache',
      'Pragma' : 'no-cache'
    }),
    observe: "response" as 'body'
  };

  // getUsers() {
  //   return this.http.get<User[]>(`${this.apiUrl}/users`)

  // }

  createUser(username:string, password:string){
    return this.http.post<{success: boolean, message: string}>(`${this.apiUrl}/auth/register`, {username, password})
  }

loginUser(username: string, password:string){
  return this.http.post< {success: boolean, data: {
    user: User,
    token: string
  }, message: string }>(`${this.apiUrl}/auth/login`, {username, password})
}

getToken(): string | null{
  return localStorage.getItem("authToken")
}

AuthorizeUser(){
   this.http.get(`${this.apiUrl}/auth`).subscribe((val:any) => {
    if(val.success){
      this.authUser = val.data
    }
   },
   (error:any) => {
    if(error.error.message){
  this.removeTokenAndNavigateToLogin()
      alert(error.error.message)
    }
    console.error('Error handler:', error);
   }
  )
}


  checkAuth(): boolean {
    if(this.getToken()){

      return true
    }else{
      return false
    }
  }

  setAuthUser(data: any){
    this.authUser = data
  }

  getAuthUser(){
    return this.authUser
  }

  logout(){
    // this.http.post(`${this.apiUrl}/auth/logout`, {}).subscribe((val:any) => {
      
    // }, (error:any) => {
    //   if(error.error.message){
        
    //         alert(error.error.message)
    //       }
    //       console.error('Error handler:', error);
    // }, () => {
    //   this.removeTokenAndNavigateToLogin()
    // })

    this.http.post(`${this.apiUrl}/auth/logout`, {}).subscribe({
      next: (val) => {
        this.removeTokenAndNavigateToLogin()
      },
      error: (error:any) => {
        if(error.error.message){
                  alert(error.error.message)
                }
                console.error('Error handler:', error);
                this.removeTokenAndNavigateToLogin()
      },
      complete: () => {
        
      }
    })


  }

  removeTokenAndNavigateToLogin(){
    localStorage.removeItem("authToken")
    this.goToLogin()
  }

  // setAuth(value:boolean):void {
  //   this.authState = value
  // }
}
