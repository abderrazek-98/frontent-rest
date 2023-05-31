import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategorysService } from 'src/app/service/backend/categorys.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/service/backend/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})
export class CategorysComponent implements OnInit {
data:any;
key:any;
sortedCategorys: any[];
  categorys: any[] = [];
  private id!: string ;
  category_id:string;
  searchTerm: string;
  categories: any[];
  searchText;
  categoryForm:FormGroup;
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.categorys.length

  };
  constructor(private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,private categorysService: CategorysService,productService:ProductsService) {
   this.category_id= this.route.snapshot.params['id'];
   }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
    search:this.formBuilder.control ('')});
    this.getAllCategorys();
    this.sort('name');
  }

  getAllCategorys()
  { this.categorysService.getCategorys().subscribe(categorys => {
    console.log(categorys)
    this.categorys = categorys;

  });}

  sort(key: string) {
    this.categorys = [...this.categorys].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    console.log(this.sortedCategorys);

  }

  deleteCategory(id:any){
    Swal.fire({
      icon:'info',
      title:"Vous Êtes sûr ?",
      confirmButtonText:"Supprimer",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed)
    this.categorysService.deleteCategory(id).subscribe(result=>{
      this.getAllCategorys();
      if (result) {
       this.toastr.success('Notification', 'Categorie supprimé avec succes');

      }
    });
  })
  }

  search() {
    const search=this.categoryForm.value.search;
    console.log(search);

    this.categorysService.getCategoryByName(search).subscribe( {
     next:(data:any)=>{
      this.categorys = data;
     }

  });
  }

}
