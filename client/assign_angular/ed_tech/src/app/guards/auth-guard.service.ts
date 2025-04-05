import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuardService implements CanActivate{

    constructor(private authService:AuthService, private router:Router){

    }

    // gotoHome(){
    //     this.router.navigate(['/dashboard']);  
    // }
    
    // goToLogin(){
    //   this.router.navigate(['/login']);  
    // }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
            if(this.authService.checkAuth()){
                
                return true
            }else{
                this.authService.goToLogin()
                return false
            }
    }
}