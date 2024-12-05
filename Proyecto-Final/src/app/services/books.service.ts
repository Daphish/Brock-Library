import { inject, Injectable } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { Review } from '../interfaces/review.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class BooksService {
  
    private http = inject(HttpClient);
    private apiUrlBooks = "http://localhost:8080/api/books";
    private apiUrlReviews = "http://localhost:8080/api/reviews";
  
    private _books: Book[] =[];
    private _filteredBooks : Book[] = [];
    private _detailedBook: Book = {
        _id: "",
        name: "",
        year: 0,
        image: "",
        description: "",
        genre: "",
        editorial: "",
        author: "",
    };
    private _reviews: Review[] = [];
  
    private getToken() : string | null {
        return localStorage.getItem('authToken');
    }

    public get books(): Book[]{
      return this._books;
    }

    public get filteredBooks(): Book[]{
        return this._filteredBooks;
    }

    public get detailedBook(): Book{
        return this._detailedBook;
    }

    public get reviews(): Review[]{
        return this._reviews;
    }
  
    public fetchBooks(): void{
      this.http.get<Book[]>(this.apiUrlBooks).subscribe({
        next: (response)=>{
          this._books = response;
          this._filteredBooks = this._books;
        },
        error: (error)=>{
          console.log(error);
        }
      })
    }

    public getBookById(id: string): void {
        this.http.get<{ book: Book; reviews: Review[] }>(`${this.apiUrlBooks}/${id}`).subscribe({
            next: (response) => {
                this._detailedBook = response.book;
                this._reviews = response.reviews;
            },
            error: (error) => {
                console.error('Error al obtener el libro:', error);
            }
        });
    }

    public filterBooks(genre: string): void{
        this._filteredBooks = this._books;
        if(genre === "Todos"){
            return;
        }
        this._filteredBooks = this._filteredBooks.filter(book => book.genre === genre);
    }

    public searchBooks(query: string): void{
        this._filteredBooks = this._books;
        if(query === ""){
            return;
        }
        this._filteredBooks = this._filteredBooks.filter(book => book.name.toLowerCase().includes(query.toLowerCase()));
    }

    public deleteBook(id: string): void{
        const token = this.getToken();
        if (!token) {
            console.log("No hay token");
            return;
        }

        this.http.delete(`${this.apiUrlBooks}/${id}`, {
            headers: {
                "Authorization": `${token}`
            }
        }).subscribe({
            next: () => {
                console.log("Libro eliminado");
                this._books = this._books.filter(book => book._id !== id);
            }
        })
    }

    public createBook(newBook: Book): void{
        const token = this.getToken();
        if(!token) {
            console.log("No hay token");
            return;
        }

        this.http.post<Book>(this.apiUrlBooks, newBook, {
            headers: {
                "Authorization": `${token}`
            }
        }).subscribe({
            next: (response) => {
                console.log(response);
                this._books.push(response);
            }, error: (error) => {
                console.log("Error agregando un libro", error);
            }
        })
    }

    public updateBook(updatedBook: Book, id: string): void{
        const token = this.getToken();
        if(!token) {
            console.log("No hay token");
            return;
        }

        this.http.put<Book[]>(`${this.apiUrlBooks}/${id}`, updatedBook, {
            headers: {
                "Authorization": `${token}`
            }
        }).subscribe({
            next: (response) => {
                this._books = response;
            }, error: (error) => {
                console.log("Error actualizando libro", error);
            }
        })
    }

    public deleteReview(id: string): void {
        const token = this.getToken();
        if (!token) {
            console.log("No hay token");
            return;
        }
    
        this.http.delete(`${this.apiUrlReviews}/${id}`, {
            headers: {
                "Authorization": `${token}`
            }
        }).subscribe({
            next: () => {
                console.log(`Reseña con ID ${id} eliminada.`);
                this._reviews = this._reviews.filter(review => review._id !== id);
            },
            error: (error) => {
                console.log("Error al eliminar la reseña", error);
            }
        });
    }

    public createReview(comment: string, bookId: string): void {
        const token = this.getToken();
        if(!token) {
            console.log("No hay token");
            return;
        }

        const body = { comment };

        this.http.post<Review>(`${this.apiUrlReviews}/${bookId}/review`, body, {
            headers: {
                "Authorization": `${token}`
            }
        }).subscribe({
            next: (response) => {
                console.log(response);
                this._reviews.push(response);
            }, error: (error) => {
                console.log("Error creando reseña", error);
            }
        })
    }
    
  }
  