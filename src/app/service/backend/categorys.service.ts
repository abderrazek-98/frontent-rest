import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ProductModel } from 'src/app/models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class CategorysService {

 // baseUrl = 'http://localhost:3000/api/category/categorys';

  constructor(private http: HttpClient) {

    }
    getCategorys() {
      return this.http.get<CategoryModel[]>('http://localhost:3000/api/categorys/category');
    }
    getCategoryByName(data:string) {
      return this.http.get<CategoryModel[]>(`http://localhost:3000/api/categorys/categorybyname/${data}`);
    }
    getProductscategory(data:string) {
      return this.http.get<ProductModel[]>(`http://localhost:3000/api/products/category/${data}`);
    }
    getCategory(id: string) {
      return this.http.get<CategoryModel>(`http://localhost:3000/api/categorys/category/${id}`);
    }
    addCategory(data: any) {
      return this.http.post('http://localhost:3000/api/categorys/addcategory', data);
    }

    deleteCategory(id: string) {
      return this.http.delete(`http://localhost:3000/api/categorys/category/${id}`);
    }

    updateCategory (id:string,data:any){
      return this.http.put<CategoryModel>(`http://localhost:3000/api/categorys/updatecategory/${id}`,data)
    }

}
