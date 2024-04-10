import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { strongPassword } from '../shared/password-val.validator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginFrom: FormGroup;
  responseData: any;

  constructor(private router: Router,private formBuilder: FormBuilder,private authService: AuthService) { }
  ngOnInit() {
    this.loginFrom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),strongPassword()]]
    });
  }
  onSubmit() {
    this.authService.login(this.loginFrom.value).subscribe(
      data => {
        this.responseData = data;
        sessionStorage.setItem("Profile",this.responseData.profiles);
        localStorage.setItem("Token",this.responseData.token);
        localStorage.setItem("userid",this.responseData.profiles.uId)
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    // Handle form submission
  }
 
}
