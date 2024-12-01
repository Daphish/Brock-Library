import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ CardModule, ButtonModule, RippleModule, NgFor ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private primengConfig: PrimeNGConfig) { } 
  
    ngOnInit() { 
        this.primengConfig.ripple = true; 
    }
  cards=Array(15);
}
