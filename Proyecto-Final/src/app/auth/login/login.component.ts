import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ButtonModule, RippleModule, CheckboxModule, InputTextModule, NgIf, FormsModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  errorMessage: boolean = false;
  fieldsNotFull: boolean = false;


  constructor(private primengConfig: PrimeNGConfig, private authService : AuthService, private router: Router) { } 
  
    ngOnInit() { 
        this.primengConfig.ripple = true; 
    }

    public submit() {
      if (this.username !== "" && this.password !== ""){
        this.authService.login(this.username, this.password).subscribe({
          next: (response) => {
            console.log("Login exitoso", response);
            localStorage.setItem("authToken", response.token);
            localStorage.setItem("role", response.user.role);
            this.router.navigate(['/inicio']);
          }, error : (error) => {
            console.log(error);
            this.errorMessage = true;
            setTimeout(() => {
              this.errorMessage = false;
            }, 3000);
          }
        })
      } else {
        this.fieldsNotFull = true;
        setTimeout(() => {
          this.fieldsNotFull = false;
        }, 3000);
      }
    }
}
