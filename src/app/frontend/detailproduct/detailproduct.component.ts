import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import { ProductModel } from 'src/app/models/ProductModel';
import { CartService } from 'src/app/service/frontend/cart.service';
import { CategoryService } from 'src/app/service/frontend/category.service';
import { ProductService } from 'src/app/service/frontend/product.service';
import { WishlistService } from 'src/app/service/frontend/wishlist.service';
import { Location } from '@angular/common';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {

  productData:any;
  cartItem!:CartItem;
  selectedSupplements: any[] = [];
  supplementPrice: number = 0;
  supp:any="";
  cart:Cart;
  productId:string;
  constructor(public activeRoute:ActivatedRoute,public productService:ProductService,
    private router: Router,public cartService:CartService,private location: Location,
    private wishlistService: WishlistService){

   }

  ngOnInit(): void {
     this.productId= this.activeRoute.snapshot.paramMap.get('id');

    this.productId && this.productService.getProduct(this.productId).subscribe((result)=>{
      this.productData= result;
    });
    console.log( this.productData._id);

  }

  addToCart(): void {

   // let cartItem = this.cart.items.find(item => item.product._id === this.productData._id);
    //  let cartItem = this.cart.items.find(item => item.product._id === this.productData._id);


      /*  this.cartItem = new CartItem(this.productData);
        //this.cart.items.push(this.cartItem);


      if (this.selectedSupplements.includes(this.productData.supplements)) {
        // supprimer le supplément
        this.selectedSupplements = this.selectedSupplements.filter(s => s !== this.productData.supplements);
        this.productData.price = Number(this.productData.price) - Number(this.productData.supplements.prix);
        this.cartItem.supplements = null;
      } else {
        // ajouter le supplément
        this.selectedSupplements.push(this.productData.supplements);
        this.productData.price = Number(this.productData.price) + Number(this.productData.supplements.prix);
        this.cartItem.supplements = this.productData.supplements.supplement;
      }

      console.log(this.selectedSupplements);
      console.log(this.productData.price);
      this.cart.items.push(this.cartItem);
      this.cartService.setCartToLocalStorage();

*/

  this.cartService.addToCart(this.productData);
 // this.addToSupp(this.productData.supplements)
 // this.addToSupp(this.productData.sup);
this.router.navigateByUrl('/cart-page');
}
/*addToSupp(supplement:any) {
  if (this.selectedSupplements.includes(supplement)) {
    // supprimer le supplément
    this.selectedSupplements = this.selectedSupplements.filter(s => s !== supplement);
    this.productData.price=Number(this.productData.price)-Number(supplement.prix);
    //this.supp=this.supp-supplement.supp
  } else {
    // ajouter le supplément
    this.selectedSupplements.push(supplement);
    this.productData.price=Number(this.productData.price)+Number(supplement.prix);
    this.supp=supplement.supp


// ajouter le supplément sélectionné au tableau supplements du cartItem

  }
  console.log(this.supp);


}*/
addToWishlist(product:ProductModel): void {
  this.wishlistService.addToWishlist(product);
}
goBack(): void {
  this.location.back();
}

addToSuppPrice(supplement: any) {

  this.cartService.addToSuppPrice(supplement,this.productData)
  this.cartService.addToSupp(supplement,this.cartItem.id)
}
inc(cartItem){
  if(cartItem.quantity != 5){
    cartItem.quantity += 1;
  }
}

dec(cartItem){
  if(cartItem.quantity != 1){
    cartItem.quantity -= 1;
  }
}
changeQuantity(cartItem:any,quantityInString:string){
  const quantity =parseInt(quantityInString);
  this.cartService.changeQuantity(cartItem.product._id, quantity);
}
}
