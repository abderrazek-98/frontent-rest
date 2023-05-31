import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { CategorysService } from 'src/app/service/backend/categorys.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{

  categoryData!:CategoryModel;
  categoryForm!:FormGroup;
  category_id!:string;
  selectedFile: File;
  imageSrc: string;
 constructor(private route:ActivatedRoute, private formBuilder:FormBuilder,private router:Router,private toastr:ToastrService, private activeRoute:ActivatedRoute ,private categoryService:CategorysService)
 {
  this.category_id= this.route.snapshot.params['id'];
 }
 ngOnInit(): void {
  this.categoryForm = this.formBuilder.group({
    name:new FormControl ('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    description: new FormControl ('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    slug: new FormControl ('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
  });
  this.categoryService.getCategory(this.category_id).subscribe({
    next: (categoryData :CategoryModel)=>{
     console.log(categoryData);
this.categoryForm.setValue({
  name:categoryData.name,
  description:categoryData.description,
  slug:categoryData.slug
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
{ if (this.categoryForm.invalid) {
  const controls = this.categoryForm.controls;
  Object.keys(controls).forEach(controlName =>
    controls[controlName].markAsTouched()
  );
}else{
  const formData = new FormData();
  formData.append('name', this.categoryForm.value.name);
  formData.append('description', this.categoryForm.value.description);
  formData.append('slug', this.categoryForm.value.slug);
  formData.append('image', this.selectedFile);
  this.categoryService.updateCategory(this.category_id,formData).subscribe( {
    next:(result:CategoryModel)=>{
   this.toastr.success('Notification', 'Catégorie modifié avec succes');
    this.router.navigate(['/admin/categorys/']);

      }
    ,error: err=>{
      this.toastr.error(err)
    }});
  }}
    getErrorMessage(fieldName:string, error:ValidationErrors):string{
      if(error['required']){
        //Le description de la catégorie est obligatoire.
      return fieldName +  "  de la catégorie est obligatoire.";
      } else
      if (error['minlength']){
       // Le description de la catégorie doit avoir au moins 6 caractères
      return fieldName +  "   de la catégorie doit avoir au moins "+ error['minlength']['requiredLength']+"caractères.";
      }
      else
      if (error['maxlength']){
        //Le description de la catégorie ne peut pas dépasser 15 caractères.
      return fieldName+  "   de la catégorie ne peut pas dépasser "+ error['maxlength']['requiredLength']+"caractères.";
      }
       else return"";
      }

}

