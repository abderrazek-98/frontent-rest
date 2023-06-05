import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ProductModel } from 'src/app/models/ProductModel';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }
  getProducts() {
    return this.http.get<ProductModel[]>('https://restauration.onrender.com/api/products/product/');
  }
  getProductscategory(data:string) {
    return this.http.get<ProductModel[]>(`https://restauration.onrender.com/api/products/category/${data}`);
  }

  getProduct(id: string) {
    return this.http.get<ProductModel>(`https://restauration.onrender.com/api/products/product/${id}`);
  }
  searchProductsByName(search: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('https://restauration.onrender.com/api/products/product/').pipe(
      map(products => products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())))
    );

}
getProductByName2(data:string) {
  return this.http.get<ProductModel[]>(`https://restauration.onrender.com/api/products/productbyname/${data}`);
}
}
