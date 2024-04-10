// auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { Router } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { TagContentType } from '@angular/compiler';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: ConfigService, private router: Router, private confirser: ConfigService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.confirser.getToken();
    console.log(token)
    if (token) {
      let headers = request.headers.set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
      .set('mode','no-cors' );
      request = request.clone({ headers: headers});
    }
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Successful response
          // Check response status and redirect if needed
          if (event.status === 200) {
            // Successful authentication response, navigate to dashboard
            this.router.navigate(['/dashboard']);
          }
        }
      }, (error: any) => {
        if (error instanceof HttpErrorResponse) {
          // Error response
          // Check error status and redirect if needed
          if (error.status === 401 || error.status === 403) {
            // Unauthorized or Forbidden error
            // Redirect to error page
            this.router.navigate(['/login']);
          }
        }
      })
    );
  }
}
