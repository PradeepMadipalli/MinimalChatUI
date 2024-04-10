import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { strongPassword } from '../shared/password-val.validator';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {

  username: string;
  password: string;
  myForm: FormGroup;
  responseData: any;

  constructor(private router: Router, private formBuilder: FormBuilder,private authService: AuthService) { }
  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), strongPassword()]]
    });
  }

  onSubmit() {
    console.log("log");
    console.log(this.myForm.value);
     this.authService.register(this.myForm.value).subscribe(
      data => {
        this.responseData = data;
        alert("registration Success");
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
