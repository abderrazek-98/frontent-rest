import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlist: ProductModel[] = [];

  constructor() { }
  addToWishlist(product: ProductModel): void {
    if (!this.wishlist.includes(product)) {
      this.wishlist.push(product);
  console.log(this.wishlist);

    }
  }

  getWishlist(): ProductModel[] {
    return this.wishlist;
  }

  clearWishlist(): void {
    this.wishlist = [];
  }
  removeFromWishlist(product: ProductModel): void {
    const index = this.wishlist.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.wishlist.splice(index, 1);

    }
  }
}
