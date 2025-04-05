import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

// @Injectable({
//     providedIn: 'root'
//   })
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){

    }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(event => {
        if (event.type === HttpEventType.Response) {
            
        }
        // console.log(event)
      }, (err) => {
        if(err.status === 401){
            this.authService.removeTokenAndNavigateToLogin()
        }
      }));
  }
}