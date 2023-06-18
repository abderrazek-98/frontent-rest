import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import { ProductModel } from 'src/app/models/ProductModel';
import { CartService } from 'src/app/service/frontend/cart.service';
import { Location,CommonModule} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
cart: Cart;
cartItems:CartItem[];
dateActuelle:Date;
selectedTable:any;
selectedOption:any;
isButtonActive:any;
message:any;
numt:any;
allcart:any[];
cartAvecNumeroTable:any[];
numeroTableExiste:any
cartLc = JSON.parse(localStorage.getItem('Cart'));
cartNonConf: any[] = [];
constructor(private cartService:CartService,
  private http: HttpClient,private router: Router,private location: Location,  private toastr:ToastrService){
  this.cartService.getCartObservable().subscribe((cart) => {
    this.cart = cart;
    this.cartItems=cart.items;
  console.log( this.cartItems)


  })


}
  ngOnInit():void{
    this.message='Ajouter Votre numméro de table  SVP';
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;})
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

  /*this.cartService.searchCartsByName(selectedTable)
            .subscribe(cart => {
              this.allcart = cart;
            });
if (this.allcart){
  console.log('Le numéro de table existe dans au moins un panier !');
  this.isButtonActive = false;
  this.message="verifier votre numéro de table "
}
else
{*/
console.log(this.selectedTable);
this.cartService.getAllCartConfirmer().subscribe(res => {
  console.log(res)
  this.cartAvecNumeroTable = res.find(cart => cart.numtable.toString() === this.selectedTable.toString());
  if (this.cartAvecNumeroTable) {
    console.log('Le numéro de table existe dans l\'un des paniers.');
    this.message='Verifier votre numéro table';
    this.isButtonActive = false;
  } else {
    console.log('Le numéro de table n\'existe pas dans les paniers.');
    this.numt =selectedTable;
  console.log(this.numt);
  this.message="Votre numero table est correct ";
this.cartLc.numtable=this.numt;
this.isButtonActive = true;
this.cartService.setCartToLocalStorage()
  }
});


}

sendCart() {
  this.isButtonActive = false;
  this.http.post('http://localhost:3000/api/products/cart', this.cartLc)
  .subscribe(
    () => {

     // console.log('Commande envoyé avec succès');

     },
    (error) => {
      console.error('Erreur lors de l\'envoi du panier :', error);

    }
  );
  const dateObj = new Date(this.cartLc.date);
const heure = dateObj.getHours();
const minutes = dateObj.getMinutes();
const secondes = dateObj.getSeconds();

this.message =`Commande envoyé avec succès a  ${heure}h ${minutes}min ${secondes}s.`;

  this.toastr.success('Notification', 'Commande envoyé avec succès');
 // this.cartService.clearCart();
}

}
