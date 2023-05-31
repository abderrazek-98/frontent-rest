import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/ProductModel';
import { CategoryService } from 'src/app/service/frontend/category.service';
import { ProductService } from 'src/app/service/frontend/product.service';
import { WishlistService } from 'src/app/service/frontend/wishlist.service';
import { toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit{
  categorys:any;
  category_id:any;
  products:any;
  selectedCategory: string;
filteredProducts: any[];
product:ProductModel
category:any;

searchTerm = '';

products$: Observable<ProductModel[]>;
  constructor(private route:ActivatedRoute,
    private categorysService: CategoryService,
    public productService:ProductService,private router: Router,
    private wishlistService: WishlistService) {

      route.params.subscribe((params) => {
        if(params['searchTerm'])
         this.searchTerm = params['searchTerm'];
      });
  }

    ngOnInit() {
      this.route.params.subscribe((params) => {
        if(params['searchTerm'])
        {
          {
            this.productService.searchProductsByName(params['searchTerm'])
              .subscribe(products => {
                this.products = products;
              });
          }
          //console.log(params['searchTerm']);

        }
       // this.searchProduct();
      else
        this.category_id = params['id'];
        this.loadProducts();
      })

    }
    searchProduct()
    {
      this.route.params.subscribe((params) => {
        if(params['searchTerm'])
        {

            this.productService.searchProductsByName(params['searchTerm'])
              .subscribe(products => {
                this.products = products;
              });

          console.log(params['searchTerm']);

        }})
    }
    addToWishlist(product:ProductModel): void {
      this.wishlistService.addToWishlist(product);
    }
    search(term:string):void{
      if(term)
      this.router.navigateByUrl('/search/'+ term);
    }
    loadProducts() {
      this.categorysService.getProductscategory(this.category_id)
        .subscribe(data => {
          this.products = data;
        });
    }

   /* this.route.params.subscribe(params => {
      if (params['id']) {
        const categoryId = params['id'];
        this.products = this.categorysService.getProductscategory(categoryId);
      }
    });*/

   /*this. getProductsByCategory()
  }


  getProductsByCategory()
  {this.categorysService.getProductscategory(this.route.snapshot.paramMap.get('id'))
  .subscribe(products => {
    this.products = products;
  });}

 /* this.route.params.subscribe((params) => {
    if (params['id'])
         this.products = this.categorysService.getProductscategory(params['id']);
         console.log(this.products);
     })*/
}

