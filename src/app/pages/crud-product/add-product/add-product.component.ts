import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductModel } from 'src/app/models/ProductModel';
import { CategorysService } from 'src/app/service/backend/categorys.service';
import { ProductsService } from 'src/app/service/backend/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  productForm!: FormGroup;

  categorys:any
  selectedFile: File;
  imageSrc: string;
  supplementImageSrc:string;
  //product:ProductModel

 constructor(private toastr:ToastrService,private router:Router,public productService:ProductsService,private formBuilder: FormBuilder,private categorysService:CategorysService)
 {}
  ngOnInit(): void {

      this.productForm = this.formBuilder.group({
        name:this.formBuilder.control ('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
        description:this.formBuilder.control ('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
        image:this.formBuilder.control( '', [Validators.required]),
        category: this.formBuilder.control('',[Validators.required]),
        price: this.formBuilder.control (0, [Validators.required]),


        supplementProduct:this.formBuilder.array([this.formBuilder.group({supplement:'',prix:'',imageSupp:'',
       })]),

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
  showPreviewSupp(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.supplementImageSrc = reader.result as string;
      };
    }
  }


  onSubmit(){
    if (this.productForm.invalid) {
      const controls = this.productForm.controls;
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
    }else{

    const product=this.productForm.value;
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);

    formData.append('description', this.productForm.value.description);
    formData.append('category', this.productForm.value.category);
    formData.append('image', this.selectedFile);
    formData.append('supplements', JSON.stringify(this.productForm.value.supplementProduct));



formData.append('details', JSON.stringify(product.details));
    console.log(JSON.stringify(this.productForm.value.supplementProduct));
    console.log(JSON.stringify(this.productForm.value.details));
    this.productService.addProduct(formData).subscribe( {
     next:(result:ProductModel)=>{
      this.toastr.success('Notification', 'Plat ajouté avec succès');
     this.router.navigate(['/admin/products/']);
      }
    ,error: err=>{
      this.toastr.error(err)
    }});

    }

  }


  getSupplement(){
    return (this.productForm.get('supplementProduct') as FormArray).controls
  }

  addSupplementItem(){
    console.log("add");

    let items=this.productForm.get('supplementProduct') as FormArray;
    items.push(this.formBuilder.group({supplement:'',prix:'',imageSupp:''}))
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
