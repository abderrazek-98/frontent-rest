import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorysService } from 'src/app/service/backend/categorys.service';
import { ProductsService } from 'src/app/service/backend/products.service';
import { CartService } from 'src/app/service/frontend/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.css']
})
export class ShowCartComponent  {
  cartData:any;

  cartId:any;
  constructor(private toastr:ToastrService ,private activeRoute:ActivatedRoute,
    private productservice:ProductsService,private router:Router,public cartservice:CartService) { }
  ngOnInit(): void {
    this.cartId= this.activeRoute.snapshot.paramMap.get('id');
    this.cartId && this.productservice.getCartById(this.cartId).subscribe((result)=>{
      this.cartData= result;
      console.log(this.cartData.items);


  });}
  print() {
    console.log(this.cartId)
    this.productservice.deleteCart(this.cartId);
    this.productservice.deleteCart(this.cartId).subscribe(result=>{
      this.router.navigate(['/admin/allcart/']);
      if (result) {
        this.toastr.success('Notification', 'cart supprimé avec succès');

      }})
    window.print();

    //this.router.navigate(['/admin/allcart/']);

  }
}
