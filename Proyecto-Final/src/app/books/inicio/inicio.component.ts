import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { NgFor } from '@angular/common';
import { BooksService } from '../../services/books.service';
import { Book } from '../../interfaces/book.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ CardModule, ButtonModule, RippleModule, NgFor, RouterModule ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private primengConfig: PrimeNGConfig) { } 
  
    private booksService = inject(BooksService);

    ngOnInit() { 
        this.primengConfig.ripple = true;
        this.booksService.fetchBooks();
    }

    public get filteredBooks(): Book[]{
      return this.booksService.filteredBooks;
    }
}
