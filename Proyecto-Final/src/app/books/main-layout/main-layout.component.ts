import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../services/auth.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Cart } from '../../interfaces/book.interface';
import { ButtonModule } from 'primeng/button';
import { BooksService } from '../../services/books.service';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';

interface Genre {
  name: String
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ NgIf, RippleModule, RouterOutlet, ButtonModule, ToolbarModule, AvatarModule, RouterLink, IconFieldModule, InputIconModule, InputTextModule, FormsModule, DropdownModule, NgClass, NgFor],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  constructor(private authService : AuthService, private bookServices : BooksService, private primengConfig: PrimeNGConfig) { } 

  public menuVisible: boolean = false;

  botonVaciar: boolean = false;

  genres: Genre[] | undefined;

  admin: boolean = false;

  query: string = "";

  selectedGenre: Genre | undefined;

  ngOnInit() {
      this.primengConfig.ripple = true;
      const role = localStorage.getItem('role');
      if(role === "admin"){
        this.admin = true;
      }
      this.genres = [
          {name: "Suspenso"},
          {name: "Drama"},
          {name: "Infantil"},
          {name: "Autoayuda"},
          {name: "Fantasía"}
      ];
  }

  public logout(){
    this.authService.logout();
  }

  public toggleMenu(){
    this.menuVisible = !this.menuVisible;
  }

  public get cart(): Cart{
    if(this.authService.cart.items.length === 0){
      this.botonVaciar = false;
    }else{
      this.botonVaciar = true;
    }
    return this.authService.cart;
  }

  public deleteFromCart(bookId: string){
    return this.authService.deleteFromCart(bookId);
  }

  public busca(){
    this.bookServices.searchBooks(this.query);
  }
}
