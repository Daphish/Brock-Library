import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ButtonModule, RippleModule, CheckboxModule, InputTextModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private primengConfig: PrimeNGConfig) { } 
  
    ngOnInit() { 
        this.primengConfig.ripple = true; 
    } 
}
