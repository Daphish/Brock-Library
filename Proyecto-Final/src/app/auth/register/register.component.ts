import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ButtonModule, RippleModule, CheckboxModule, InputTextModule, NgIf, FormsModule, DialogModule, RouterModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  visible: boolean = false;
  username: string = "";
  password: string = "";
  errorMessage: boolean = false;
  fieldsNotFull: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, private authService : AuthService, private router: Router) { } 
  
  ngOnInit() { 
      this.primengConfig.ripple = true;
  }

  public showmodal() {
    this.visible = true;
  }

  public redirect() {
    this.visible = false;
    this.router.navigate(['/auth/login']);
  }

  public submit() {
    if(this.username !== "" && this.password !== ""){
      this.authService.register(this.username, this.password).subscribe({
        next: (response) => {
          console.log("Registro exitoso");
          this.showmodal();
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
