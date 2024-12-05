import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Book } from '../../interfaces/book.interface';
import { Review } from '../../interfaces/review.interface';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [ ButtonModule, RippleModule, NgIf, RouterModule, NgFor, FormsModule, InputTextModule ],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent {

  constructor(private route: ActivatedRoute, private primengConfig: PrimeNGConfig, private router: Router) { } 
  
  private booksService = inject(BooksService);
  private authService = inject(AuthService);
  comment: string = "";

  admin: boolean = false;

  quantity: number = 1;

    ngOnInit() {
        const bookId = this.route.snapshot.paramMap.get('id');
        this.primengConfig.ripple = true;
        this.booksService.getBookById(bookId!);
    }

    public get detailedBook(): Book{
      return this.booksService.detailedBook;
    }

    public get reviews(): Review[]{
        return this.booksService.reviews;
    }

    public addOne(){
      this.quantity = this.quantity + 1;
    }

    public substractOne(){
      if(this.quantity !== 1){
        this.quantity = this.quantity - 1;
      }
    }

    public addToCart(){
      const role = localStorage.getItem('role');
      if(role === "admin" || role === "user"){
        this.authService.updateCart(this.detailedBook._id!, this.quantity);
        this.router.navigate(['/inicio']);
      } else {
        this.router.navigate(['/auth/login']);
      }
    }

    public addReview(){
      const role = localStorage.getItem('role');
      if(role === "admin" || role === "user"){
        this.booksService.createReview(this.comment, this.booksService.detailedBook._id!);
      } else {
        this.router.navigate(['/auth/login']);
      }
    }
}
