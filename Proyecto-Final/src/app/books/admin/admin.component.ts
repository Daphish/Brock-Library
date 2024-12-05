import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BooksService } from '../../services/books.service';
import { Book } from '../../interfaces/book.interface';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableModule , ButtonModule, RippleModule, DialogModule, InputTextModule, InputTextareaModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  isEditDialogVisible = false;
  isAddDialogVisible = false;
  edit: boolean = false;
  initialBook: Book = {
    name: "",
    author: "",
    image: "",
    description: "",
    genre: "",
    editorial: "",
    year: 0,
  }
  selectedBook: Book = {
    _id: "",
    name: "",
    author: "",
    image: "",
    description: "",
    genre: "",
    editorial: "",
    year: 0,
  };

  openAddDialog(){
    this.isAddDialogVisible = true;
  }

  openEditDialog(book: any) {
    this.selectedBook = { ...book };
    this.isEditDialogVisible = true;
  }

  constructor(private primengConfig: PrimeNGConfig) { }

  private booksService = inject(BooksService);

  ngOnInit() {
    this.booksService.fetchBooks();
    this.primengConfig.ripple = true;
}

public get books(): Book[]{
  return this.booksService.books;
}

saveBook() {
  this.booksService.updateBook(this.selectedBook!, this.selectedBook!._id!)
  this.isEditDialogVisible = false;
}

addBook() {
  this.booksService.createBook(this.initialBook);
  this.isAddDialogVisible = false;
  this.initialBook = {
    name: "",
    author: "",
    image: "",
    description: "",
    genre: "",
    editorial: "",
    year: 0,
  }
}

deleteBook(book: Book) {
  this.booksService.deleteBook(book._id!);
}
}
