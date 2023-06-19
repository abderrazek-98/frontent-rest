import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ProductModel } from 'src/app/models/ProductModel';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {

  }
  getCategorys() {
    return this.http.get<CategoryModel[]>('https://restauration.onrender.com/api/categorys/category');
  }
  getCategoryByName(data:string) {
    return this.http.get<CategoryModel[]>(`https://restauration.onrender.com/api/categorys/categorybyname/${data}`);
  }
  getProductscategory(id:any) {
    return this.http.get<ProductModel[]>(`https://restauration.onrender.com/api/products/category/${id}`);
  }
  getCategory(id: string) {
    return this.http.get<CategoryModel>(`https://restauration.onrender.com/api/categorys/category/${id}`);
  }
  searchCatsByName(search: string): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>('https://restauration.onrender.com/api/categorys/category/').pipe(
      map(cats => cats.filter(cat => cat.name.toLowerCase().includes(search.toLowerCase())))
    );

}




}
