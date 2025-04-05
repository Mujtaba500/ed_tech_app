import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

// @Injectable({
//     providedIn: 'root'
//   })
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){

    }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.authService.getToken()}`,
      },
    });

    return next.handle(req);
  }
}