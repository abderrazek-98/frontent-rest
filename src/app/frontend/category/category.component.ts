import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/frontend/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categorys:any;
  category_id:any;

searchTerm = '';
  constructor(private route:ActivatedRoute,
  private categorysService: CategoryService,private router: Router) {
   this.category_id= this.route.snapshot.params['id'];
   route.params.subscribe((params) => {
    if(params['searchTermCat'])
     this.searchTerm = params['searchTermCat'];
  });
   }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if(params['searchTermCat'])

        {
          this.categorysService.searchCatsByName(params['searchTermCat'])
            .subscribe(categorys => {
              this.categorys = categorys;
            });
        }
        else{
          this.getAllCategorys();
        }
      })

  }
  search(term:string):void{
    if(term)
    this.router.navigateByUrl('/searchCat/'+ term);
  }
  getAllCategorys()
  { this.categorysService.getCategorys().subscribe(categorys => {
    console.log(categorys)
    this.categorys = categorys;

  });}

}
