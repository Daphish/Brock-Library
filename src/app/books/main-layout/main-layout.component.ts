import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
