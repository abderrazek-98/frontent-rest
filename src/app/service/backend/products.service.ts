import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ProductModel } from 'src/app/models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {

    }
    getProductByName(data:string) {
      return this.http.get<ProductModel[]>(`http://localhost:3000/api/products/productbyname/${data}`);
    }
    getProducts() {
      return this.http.get<ProductModel[]>('http://localhost:3000/api/products/product/');
    }
    getAllCart() {
      return this.http.get<any[]>('http://localhost:3000/api/products/allcart/');
    }
    getAllCartConfirmer()
    {
      return this.http.get<any[]>('http://localhost:3000/api/products/allcartconfirmer/');
    }

    getCartById(data:string) {
      return this.http.get<any[]>(`http://localhost:3000/api/products/cart/${data}`);
    }
    getProductscategory(data:string) {
      return this.http.get<ProductModel[]>(`http://localhost:3000/api/products/category/${data}`);
    }

    getProduct(id: string) {
      return this.http.get<ProductModel>(`http://localhost:3000/api/products/product/${id}`);
    }
    addProduct(product: any) {
      return this.http.post('http://localhost:3000/api/products/addProduct', product);
    }

    deleteProduct(id: string) {
      return this.http.delete(`http://localhost:3000/api/products/product/${id}`);
    }
    deleteCart(id: string) {
      return this.http.delete(`http://localhost:3000/api/products/cart/${id}`);
    }

    updateProduct (product_id:string,product:FormData){
      return this.http.put<ProductModel>(`http://localhost:3000/api/products/updateProduct/${product_id}`,product)

    }
    getErrorMessage(fieldName:string, error:ValidationErrors):string{
      if(error['required']){
        //Le description de la catégorie est obligatoire.
      return fieldName +  "  de la catégorie est obligatoire.";
      } else
      if (error['minlength']){
       // Le description de la catégorie doit avoir au moins 6 caractères
      return fieldName +  "   de la produit doit avoir au moins "+ error['minlength']['requiredLength']+"caractères.";
      }
      else
      if (error['maxlength']){
        //Le description de la catégorie ne peut pas dépasser 15 caractères.
      return fieldName+  "   de la produit ne peut pas dépasser "+ error['maxlength']['requiredLength']+"caractères.";
      }else
      if (error['min']){
        //Le description de la catégorie ne peut pas dépasser 15 caractères.
      return fieldName+  "   de la produit doit avoir au moins "+ error['min']['min'];
      }
       else return"";
      }
}
