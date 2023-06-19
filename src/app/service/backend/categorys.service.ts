import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ProductModel } from 'src/app/models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class CategorysService {

 // baseUrl = 'https://restauration\.onrender\.com/api/category/categorys http://localhost:3000';

  constructor(private http: HttpClient) {

    }
    getCategorys() {
      return this.http.get<CategoryModel[]>('https://restauration\.onrender\.com/api/categorys/category');
    }
    getCategoryByName(data:string) {
      return this.http.get<CategoryModel[]>(`https://restauration\.onrender\.com/api/categorys/categorybyname/${data}`);
    }
    getProductscategory(data:string) {
      return this.http.get<ProductModel[]>(`https://restauration\.onrender\.com/api/products/category/${data}`);
    }
    getCategory(id: string) {
      return this.http.get<CategoryModel>(`https://restauration\.onrender\.com/api/categorys/category/${id}`);
    }
    addCategory(data: any) {
      return this.http.post('https://restauration\.onrender\.com/api/categorys/addcategory', data);
    }

    deleteCategory(id: string) {
      return this.http.delete(`https://restauration\.onrender\.com/api/categorys/category/${id}`);
    }

    updateCategory (id:string,data:any){
      return this.http.put<CategoryModel>(`https://restauration\.onrender\.com/api/categorys/updatecategory/${id}`,data)
    }

}
