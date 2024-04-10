import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string; // Replace with your API URL

  constructor(private http: HttpClient, private configService: ConfigService) {

    this.configService.getConfig().subscribe(config => {
      this.apiUrl = config.apiUrl;
    });
  }

  
  register(user: any): Observable<any> {
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
    });
    
    const jsonString = JSON.stringify(user);
    return this.http.post(`${this.apiUrl}/register`, jsonString, {headers:headers,responseType:'text'});
  }

  login(credentials: any): Observable<any> {
    const httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    const jsonString = JSON.stringify(credentials);
    return this.http.post(`${this.apiUrl}/login`, jsonString,httpOptionss);
  }


}
