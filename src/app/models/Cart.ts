import { CartItem } from "./CartItem";
export class Cart{
  items: CartItem[] = new Array<CartItem>();
  totalPrice:number=0;
  totalCount:number=0;
  numtable:number;
  date:Date;
  confirmed:boolean=false;
}
