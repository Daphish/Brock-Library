export interface Cart {
    _id?: string;
  userId: string;
  items: [
    {
      bookId: string;
      quantity: number;
    }
  ];
}
