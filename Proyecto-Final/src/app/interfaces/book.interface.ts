export interface Book {
    _id?: string;
    name: string;
    author: string;
    image: string;
    description: string;
    genre: string;
    editorial: string;
    year: number;
  }
  
export interface CartItem {
    bookId: Book;
    quantity: number;
  }
  
export interface Cart {
    _id?: string;
    userId: string;
    items: CartItem[];
  }