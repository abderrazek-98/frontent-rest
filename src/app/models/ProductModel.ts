import { CategoryModel } from "./CategoryModel";

export class ProductModel {
id:string;
  name:string;
  description:string;
  price:number;
  image:string;
  category: CategoryModel;
  supplements: any;
  details:any;
}

