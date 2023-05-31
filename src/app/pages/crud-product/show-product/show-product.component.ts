import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models/ProductModel';
import { CategorysService } from 'src/app/service/backend/categorys.service';
import { ProductsService } from 'src/app/service/backend/products.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  productData:ProductModel;
  category:any;
  supplements: string[];
  constructor(private activeRoute:ActivatedRoute, private productservice:ProductsService,private categoryService:CategorysService) { }
  ngOnInit(): void {
    let productId= this.activeRoute.snapshot.paramMap.get('id');
    //console.log(productId);
    productId && this.productservice.getProduct(productId).subscribe((result)=>{
      this.productData= result;
      console.log(result.supplements);

     // console.log(result.name);
     /* this.categoryService.getCategory(this.productData.category_id).subscribe(category => {
       console.log(category);
        this.category = category;})*/

  });}

}
