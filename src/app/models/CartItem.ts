import {ProductModel} from "./ProductModel"
export class CartItem{
  constructor(public product:ProductModel ){
}
id:number=0;
quantity:number=1;
price:number=this.product.price;
supplements:any[] =[];

}
