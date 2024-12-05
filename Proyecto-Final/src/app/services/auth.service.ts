import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Cart } from '../interfaces/book.interface';
import { Book } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  constructor(private router: Router) {}
  private apiUrlAuth = "http://localhost:8080/api/auth";
  private apiUrlCart = "http://localhost:8080/api/cart"

  private _cart: Cart = {
    _id: "",
    userId: "",
    items: []
  }

  login(username: string, password: string): Observable<User> {
    const loginData = { username, password };
    return new Observable((observer) => {
      this.http.post<User>(`${this.apiUrlAuth}/login`, loginData).subscribe({
        next: (response) => {
          this._cart = response.cart;
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  register(username: string, password: string): Observable<User> {
    const registerData = { username, password };
    return this.http.post<User>(`${this.apiUrlAuth}/register`, registerData);
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    this.router.navigate(['/auth/login']).then(() => {
      window.location.reload();
    });
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public get cart(): Cart{
    return this._cart;
  }

  public updateCart(bookId: string, quantity: number): void {
    const token = this.getToken();
        if(!token) {
            console.log("No hay token");
            return;
        }

        const cartItem = { bookId, quantity }
        this.http.put<Cart>(this.apiUrlCart, cartItem, {
            headers: {
                "Authorization": `${token}`
            }
        }).subscribe({
            next: (response) => {
                console.log(response);
                this._cart = (response);
            }, error: (error) => {
                console.log("Error añadiendo al carrito", error);
            }
        })
  }

  public deleteFromCart(bookId: string): void{
    const token = this.getToken();
        if(!token) {
            console.log("No hay token");
            return;
        }

        this.http.delete<Cart>(`${this.apiUrlCart}/${bookId}`, {
          headers: {
              "Authorization": `${token}`
          }
      }).subscribe({
          next: (response) => {
              console.log(response);
              this._cart = (response);
          }, error: (error) => {
              console.log("Error eliminando del carrito", error);
          }
      })
  }
}
