import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { profile } from 'console';
import { Observable } from 'rxjs';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  profile:any;
  private configUrl = 'assets/config.json';
  constructor(private http: HttpClient,private router: Router) { }

  getConfig(): Observable<any> {
    return this.http.get(this.configUrl);
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      // Access localStorage here
      return localStorage.getItem('Token');
    }
    return null;
  }
getCuurectuserid():string{
  if (typeof localStorage !== 'undefined') {
 return  localStorage.getItem('userid');

  }
 return null;
}
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
