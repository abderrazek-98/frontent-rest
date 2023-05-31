import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategorysService } from 'src/app/service/backend/categorys.service';
import { ProductsService } from 'src/app/service/backend/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  private id: string | null;
  deleteProductMessage:string;
  category:any;
  searchText:any;
  productForm!:FormGroup;

  constructor(private toastr:ToastrService ,
    private formBuilder: FormBuilder,private route:ActivatedRoute,private productsService: ProductsService, private categoryService: CategorysService) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      search:this.formBuilder.control ('')});
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.sort('name');
    this.getAllProducts();
  }
  sort(key: string) {
    this.products = [...this.products].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  }
  getAllProducts()
  {
    this.productsService.getProducts().subscribe(res => {
    console.log(res)
    this.products = res;

  });}
  config = {
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.products.length
  };
  deleteProduct(id:any){
    Swal.fire({
      icon:'info',
      title:"Vous Êtes sûr ?",
      confirmButtonText:"Supprimer",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed)
      this.productsService.deleteProduct(id).subscribe(result=>{
        this.getAllProducts();
        if (result) {
          this.toastr.success('Notification', 'Plat supprimé avec succès');

        }
      });
    })
    }


  search() {
    const search=this.productForm.value.search;

    this.productsService.getProductByName(search).subscribe( {
     next:(data:any)=>{
      this.products = data;
     }

  });
  }


}
