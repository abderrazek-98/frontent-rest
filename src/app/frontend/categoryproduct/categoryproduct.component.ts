import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/frontend/category.service';

@Component({
  selector: 'app-categoryproduct',
  templateUrl: './categoryproduct.component.html',
  styleUrls: ['./categoryproduct.component.css']
})
export class CategoryproductComponent {
  categorys:any;
  category_id:any;
  selectedCategory: string;
filteredProducts: any[];
products:any;
category:any;
  constructor(private route:ActivatedRoute,
  private categorysService: CategoryService,private router: Router) {

   }

  ngOnInit() {


    this.getAllCategorys();
  }

  getAllCategorys()
  { this.categorysService.getCategorys().subscribe(categorys => {
    console.log(categorys)
    this.categorys = categorys;

  });}
  onCategoryClick(categoryId: string) {


    this.router.navigate(['/category/', categoryId], { queryParams: { refresh: true } });
    this.categorysService.getCategory(categoryId).subscribe((result)=>{
      this.category= result;
    });
  }
}
