import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import { ProductModel } from 'src/app/models/ProductModel';
import { CartService } from 'src/app/service/frontend/cart.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
cart: any;
dateActuelle:Date;
selectedTable:any;
selectedOption:any;
isButtonActive:any;
numt:any;
cartLc = JSON.parse(localStorage.getItem('Cart'));

constructor(private cartService:CartService,
  private http: HttpClient,private router: Router,private location: Location){
  this.cartService.getCartObservable().subscribe((cart) => {
    this.cart = cart;


  })


}
  ngOnInit():void{
  }
  inc(cartItem){
    if(cartItem.quantity != 5){
      cartItem.quantity += 1;
    }
    this.changeQuantity(cartItem, cartItem.quantity);
  }
  goBack(): void {
    this.location.back();
  }
  dec(cartItem){
    if(cartItem.quantity != 1){
      cartItem.quantity -= 1;
    }
    this.changeQuantity(cartItem, cartItem.quantity)
  }

removeFromCart(cartItem:any){
  this.cartService.removeFromCart(cartItem.id);
  //console.log(cartItem.product._id);

}
updateFromCart(cartItem:any)
{this.router.navigateByUrl('/detail/'+cartItem.product._id);
  this.cartService.removeFromCart(cartItem.id);
}
changeQuantity(cartItem:any,quantityInString:any){
  const quantity =parseInt(quantityInString);
  console.log(quantity);
console.log(cartItem.product._id);

  this.cartService.changeQuantity(cartItem.product._id, quantity);
}

/*removeAllFromCart(){
  this.cartService.clearCart();
}*/
addTable(selectedTable:any){
  if (this.selectedTable) {
    this.isButtonActive = true;
  } else {
    this.isButtonActive = false;
  }
   this.numt =selectedTable;
  console.log(this.numt);
this.cartLc.numtable=this.numt;
this.cartService.setCartToLocalStorage()
}
sendCart() {
  this.isButtonActive = false;
  this.http.post('https://restauration.onrender.com/api/products/cart', this.cartLc)
  .subscribe(
    () => {
      console.log('Panier envoyé avec succès');
     },
    (error) => {
      console.error('Erreur lors de l\'envoi du panier :', error);

    }
  );
}

}
