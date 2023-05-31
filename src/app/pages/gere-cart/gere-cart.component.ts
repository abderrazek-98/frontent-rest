import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategorysService } from 'src/app/service/backend/categorys.service';
import { ProductsService } from 'src/app/service/backend/products.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gere-cart',
  templateUrl: './gere-cart.component.html',
  styleUrls: ['./gere-cart.component.css']
})
export class GereCartComponent  implements OnInit {
  cart: any[] = [];
  constructor(private toastr:ToastrService ,
    private route:ActivatedRoute,private productsService: ProductsService,
     private categoryService: CategorysService) { }

  ngOnInit(): void {
      this.getAllCarts()
  }
  getAllCarts()
  {
    this.productsService.getAllCartConfirmer().subscribe(res => {
    console.log(res)
    this.cart = res;

  });}
  config = {
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.cart.length
  };
  deleteCart(id:any){
    Swal.fire({
      icon:'info',
      title:"Vous Êtes sûr ?",
      confirmButtonText:"Confirmer",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed)
      this.productsService.deleteCart(id).subscribe(result=>{
        this.getAllCarts();
        if (result) {
          this.toastr.success('Notification', 'Commande confimer avec succès');

        }
      });
    })
}
}
