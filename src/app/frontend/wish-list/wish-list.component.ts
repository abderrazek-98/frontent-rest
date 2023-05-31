import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductService } from 'src/app/service/frontend/product.service';
import { WishlistService } from 'src/app/service/frontend/wishlist.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishlistItems!:any;
  product_id:string;
  product:ProductModel;
  constructor(public whishListService:WishlistService,private route:ActivatedRoute,
    public productService:ProductService,private location: Location ){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.product_id = params['id'];
      this.loadProducts();
    });
    this.wishlistItems = this.whishListService.getWishlist();
  }
  loadProducts() {
    this.productService.getProduct(this.product_id)
      .subscribe(data => {
        this.product = data;
      });
  }
  removeFromWishlist(wishlistItems: ProductModel): void {
    this.whishListService.removeFromWishlist(wishlistItems);
  }
  goBack(): void {
    this.location.back();
  }
}
