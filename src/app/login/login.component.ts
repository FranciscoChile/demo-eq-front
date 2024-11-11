import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators  } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SecurityService } from '../services/security.service';
import { LoginRecord } from '../services/login';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

   loginForm = new FormGroup({
     user: new FormControl('', Validators.required),
     password: new FormControl('', Validators.required),
   });
   
   constructor(public router: Router, public api: SecurityService, private localStorageService: LocalStorageService) {}

    onSubmit() {
      if (this.loginForm.valid) {

        var loginRecord = new LoginRecord();

        loginRecord.email = this.loginForm.get("user")!.value!;
        loginRecord.password = this.loginForm.get("password")!.value!;

        this.api.login(loginRecord).subscribe({
          next: (data : any) => {
            this.localStorageService.setItem('token', data.token);
            this.router.navigate(['/home']);
          },
          error: (e) => {
            console.log('Error');
          }
        });

        
      }
    }
  
}
