import { Component,OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/models/ProductModel';
import { CategorysService } from 'src/app/service/backend/categorys.service';
import { ProductsService } from 'src/app/service/backend/products.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{
  addProductMessage:string;
  productForm!: FormGroup;
  selectedImage: File;
  categorys:any
  images:any;
  submitted:boolean=false;
  imageURL: string;
  selectedFile: File;
  imageSrc: string;
  product_id:string;

  productData:ProductModel

 constructor(private toastr:ToastrService,private router:Router,private route:ActivatedRoute,public productService:ProductsService,private formBuilder: FormBuilder,private categorysService:CategorysService)
 {
  this.product_id= this.route.snapshot.params['id'];
 }
  ngOnInit(): void {

      this.productForm = this.formBuilder.group({
        name:this.formBuilder.control ('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
        description:this.formBuilder.control ('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
        image:this.formBuilder.control( '', [Validators.required]),
        category: this.formBuilder.control('',[Validators.required]),
        price: this.formBuilder.control (0, [Validators.required]),
       supplement:this.formBuilder.array([this.formBuilder.group({supplement:'',prix:''})]),
        details:this.formBuilder.group({
          time: ['', Validators.required],
          calory: [0, Validators.required],
          cooking: [0, Validators.required]
        })
      });
      this.categorysService.getCategorys().subscribe(categorys => {
        //console.log(categorys)
        this.categorys = categorys;
    });
        this.productService.getProduct(this.product_id).subscribe({
          next: (productData :ProductModel)=>{

      this.productForm.setValue({
        name:productData.name,
        description:productData.description,
        price:productData.price,

        image:productData.image,
        category:productData.category,
        supplement:productData.supplements,
        details:productData.details

      })

      }

      ,error:(err)=>{
        this.toastr.error(err);

      }
    })
   }
  showPreview(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
  onUpdate()
  { if (this.productForm.invalid) {
    const controls = this.productForm.controls;
    Object.keys(controls).forEach(controlName =>
      controls[controlName].markAsTouched()
    );
  }else{
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('quantity', this.productForm.value.quantity);
    formData.append('description', this.productForm.value.description);
    formData.append('category', this.productForm.value.category);
    formData.append('image', this.selectedFile);
    formData.append('supplements', JSON.stringify(this.productForm.value.supplement));
    formData.append('details', JSON.stringify(this.productForm.value.details));

    this.productService.updateProduct(this.product_id,formData).subscribe( {
      next:(result:ProductModel)=>{
     this.toastr.success('Notification', 'Plat modifié avec succes');
      this.router.navigate(['/admin/products/']);

        }
      ,error: err=>{
        this.toastr.error(err)
      }});
    }}



  getSupplement(){
    return (this.productForm.get('supplement') as FormArray).controls
  }

  addSupplementItem(){
    let items=this.productForm.get('supplement') as FormArray;
    items.push(this.formBuilder.group({supplment:'',prix:''}))
  }
deleteSupplement(item){
  if(this.getSupplement().length>0){
    this.getSupplement().splice(item,1)
  }
}
e_trackByFn(index,item){
  return index
}

}
