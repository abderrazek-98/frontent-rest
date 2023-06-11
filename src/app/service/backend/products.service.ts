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
      return this.http.get<ProductModel[]>(`https://restauration.onrender.com/api/products/productbyname/${data}`);
    }
    getProducts() {
      return this.http.get<ProductModel[]>('https://restauration.onrender.com/api/products/product/');
    }
    getAllCart() {
      return this.http.get<any[]>('https://restauration.onrender.com/api/products/allcart/');
    }
    getAllCartConfirmer()
    {
      return this.http.get<any[]>('https://restauration.onrender.com/api/products/allcartconfirmer/');
    }

    getCartById(data:string) {
      return this.http.get<any[]>(`https://restauration.onrender.com/api/products/cart/${data}`);
    }
    getProductscategory(data:string) {
      return this.http.get<ProductModel[]>(`https://restauration.onrender.com/api/products/category/${data}`);
    }

    getProduct(id: string) {
      return this.http.get<ProductModel>(`https://restauration.onrender.com/api/products/product/${id}`);
    }
    addProduct(product: any) {
      return this.http.post('https://restauration.onrender.com/api/products/addProduct', product);
    }

    deleteProduct(id: string) {
      return this.http.delete(`https://restauration.onrender.com/api/products/product/${id}`);
    }
    deleteCart(id: string) {
      return this.http.delete(`https://restauration.onrender.com/api/products/cart/${id}`);
    }

    updateProduct (product_id:string,product:FormData){
      return this.http.put<ProductModel>(`https://restauration.onrender.com/api/products/updateProduct/${product_id}`,product)

    }
    getErrorMessage(fieldName:string, error:ValidationErrors):string{
      if(error['required']){
        //Le description de la catégorie est obligatoire.
      return fieldName +  "  de produit est obligatoire.";
      } else
      if (error['minlength']){
       // Le description de la catégorie doit avoir au moins 6 caractères
      return fieldName +  "   de produit doit avoir au moins "+ error['minlength']['requiredLength']+"caractères.";
      }
      else

      if (error['min']){
        //Le description de la catégorie ne peut pas dépasser 15 caractères.
      return fieldName+  "   de la produit doit avoir au moins "+ error['min']['min'];
      }
       else return"";
      }
}
