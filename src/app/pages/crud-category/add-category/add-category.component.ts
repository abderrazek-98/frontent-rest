import { Component,OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { CategorysService } from 'src/app/service/backend/categorys.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

  categoryForm:FormGroup;

  selectedFile: File;
  imageSrc: string;


 constructor(private categoryService:CategorysService,
  public toastr:ToastrService,
   private router: Router,private formBuilder: FormBuilder,)
 {}
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name:this.formBuilder.control ('', [Validators.required ]),
      description: this.formBuilder.control ('', [Validators.required]),
      slug: this.formBuilder.control ('', [Validators.required]),
    });
  }

  get f() {
    return this.categoryForm.controls;
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      const controls = this.categoryForm.controls;
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
    }else{
      const category=this.categoryForm.value;

      const formData = new FormData();
    formData.append('name', this.categoryForm.value.name);
    formData.append('slug', this.categoryForm.value.slug);
    formData.append('description', this.categoryForm.value.description);
    formData.append('image', this.selectedFile);

    this.categoryService.addCategory(formData).subscribe( {
     next:(result:CategoryModel)=>{
      this.toastr.success('Notification', 'Categorie ajouté avec succés');
     this.router.navigate(['/admin/categorys/']);
      }
   });
    }
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
  getErrorMessage(fieldName:string, error:ValidationErrors):string{
    if(error['required']){
      //Le description de la catégorie est obligatoire.
    return fieldName +  "  de la catégorie est obligatoire.";
    } else
    if (error['minlength']){
     // Le description de la catébgorie doit avoir au moins 6 caractères
    return fieldName +  "   de la catégorie doit avoir au moins "+ error['minlength']['requiredLength']+"caractères.";
    }
    else
    if (error['maxlength']){
      //Le description de la catégorie ne peut pas dépasser 15 caractères.
    return fieldName+  "   de la catégorie ne peut pas dépasser "+ error['maxlength']['requiredLength']+"caractères.";
    }
    else

     return"";
    }
  }

