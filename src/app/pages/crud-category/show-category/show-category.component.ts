import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ProductModel } from 'src/app/models/ProductModel';
import { CategorysService } from 'src/app/service/backend/categorys.service';
import { ProductsService } from 'src/app/service/backend/products.service';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {
  categoryData:CategoryModel;
  products: any[] = [];
  constructor(private activeRoute:ActivatedRoute,
    private categoryservice:CategorysService,private productService:ProductsService) {
      const categoryId= this.activeRoute.snapshot.paramMap.get('id');
    }
  ngOnInit(): void {


    this.categoryservice.getCategory(this.activeRoute.snapshot.paramMap.get('id')).subscribe((result)=>{
      this.categoryData= result;
      this.getProductsByCategory();

  });}
  getProductsByCategory()
  {this.categoryservice.getProductscategory(this.activeRoute.snapshot.paramMap.get('id'))
  .subscribe(products => {
    this.products = products;
  });}

  }

