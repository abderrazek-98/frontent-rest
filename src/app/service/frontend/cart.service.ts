import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import { ProductModel } from 'src/app/models/ProductModel';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  cartItem:any;
  productData:any;
  CartItem:any;
  selectedSupplements: any[] = [];
  supplementPrice: number = 0;
  supp:any;
  sup:any[]=[]
  num:any;

  constructor(private http: HttpClient) { }

  setCart(cart: Cart): void {
    this.cart = cart;
    this.cartSubject.next(cart);
  }
  addToCart(food: any): void {

    let cartItem = this.cart.items.find(item => item.product._id === food._id);

    cartItem = new CartItem(food);

    cartItem.id = uuidv4();
   // this.sup=this.addToSupp(food.supplements,cartItem.id);
    this.sup=this.selectedSupplements;
    cartItem.supplements = this.sup;
    this.cart.items.push(cartItem);
    console.log(cartItem.supplements);
    console.log(cartItem);
    this.setCartToLocalStorage();
  // this.selectedSupplements=null
  }

  addToSupp(supplement: any,id:any) {
    const supplementWithId = { supplement, id };
    if (this.selectedSupplements.includes(supplement)) {

      this.selectedSupplements = this.selectedSupplements.filter(s => s.supplement === supplement);
      this.selectedSupplements= null;

    } else {

      this.selectedSupplements.push(supplementWithId);
    }



    this.setCartToLocalStorage();
    console.log(this.selectedSupplements);
    return this.selectedSupplements ;
  }
  addToSuppPrice(supplement: any,productData:any) {
    if (this.selectedSupplements.includes(supplement)) {
      // supprimer le supplément
      this.selectedSupplements = this.selectedSupplements.filter(s => s !== supplement);
      productData.price = Number(productData.price) - Number(supplement.prix);

    } else {
      // ajouter le supplément
      this.selectedSupplements.push(supplement);
      productData.price = Number(productData.price) + Number(supplement.prix);

    }

    console.log(this.selectedSupplements);
    console.log(productData.price);

  }

  removeFromCart(foodId: any) {
    this.cart.items = this.cart.items.filter(item => item.id !== foodId);
   // this.selectedSupplements=null;
    this.setCartToLocalStorage();
  }
  removeAllFromCart(cartid: any) {
    this.cart = this.cart.filter(Cart === cartid);
    this.setCartToLocalStorage();
  }
  addtable(num:any)
  {
    this.cart.numtable=num;
    console.log(this.cart);
    this.setCartToLocalStorage();

  }
  changeQuantity(foodId: any, quantity: any) {
    let cartItem = this.cart.items
      .find(item => item.product._id === foodId);
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.product.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();

  }

   setCartToLocalStorage(): void {

      this.cart.totalPrice = this.cart.items
      .reduce((total, item) => total + Number(item.price), 0);

    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity,0);

this.cart.confirmed=false;
this.cart.date=new Date();

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
  getAllCart() {
    return this.http.get<any[]>('http://localhost:3000/api/products/allcart/');
  }

  getAllCartConfirmer()
  {
    return this.http.get<any[]>('http://localhost:3000/api/products/allcartconfirmer/');
  }
  searchCartsByName(search: string): Observable<Cart[]> {
    return this.http.get<any[]>('http://localhost:3000/api/products/allcartconfirmer/').pipe(
      map(carts => carts.filter(cart => cart.numtable))
    );
  }
}
