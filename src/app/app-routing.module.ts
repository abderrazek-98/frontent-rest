import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts/layouts.component';
import { AddCategoryComponent } from './pages/crud-category/add-category/add-category.component';
import { AddProductComponent } from './pages/crud-product/add-product/add-product.component';
import { AdminsComponent } from './pages/crud-user/admins/admins.component';
import { CategorysComponent } from './pages/crud-category/categorys/categorys.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GerantsComponent } from './pages/crud-gerant/gerants/gerants.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/crud-product/products/products.component';
import { ShowCategoryComponent } from './pages/crud-category/show-category/show-category.component';
import { UpdateCategoryComponent } from './pages/crud-category/update-category/update-category.component';
import { UsersComponent } from './pages/crud-user/users/users.component';
import { ShowProductComponent } from './pages/crud-product/show-product/show-product.component';
import { UpdateUserComponent } from './pages/crud-user/update-user/update-user.component';
import { AddUserComponent } from './pages/crud-user/add-user/add-user.component';
import { AddGerantComponent } from './pages/crud-gerant/add-gerant/add-gerant.component';
import { UpdateGerantComponent } from './pages/crud-gerant/update-gerant/update-gerant.component';
import { UpdateProductComponent } from './pages/crud-product/update-product/update-product.component';
import { AuthGuardService  } from 'src/app/service/backend/auth-guard.service';
import { UpdateProfileComponent } from './pages/crud-user/update-profile/update-profile.component';
import { ImageComponent } from './frontend/image/image.component';
import { CategoryComponent } from './frontend/category/category.component';
import { DetailproductComponent } from './frontend/detailproduct/detailproduct.component';

import { ProduitsComponent } from './frontend/produits/produits.component';
import { CategoryproductComponent } from './frontend/categoryproduct/categoryproduct.component';
import { CartPageComponent } from './frontend/cart-page/cart-page.component';
import { WishListComponent } from './frontend/wish-list/wish-list.component';
import { GereCartComponent } from './pages/gere-cart/gere-cart.component';
import { ShowCartComponent } from './pages/show-cart/show-cart.component';



const routes: Routes = [

 {path:'', component:LoginComponent},
 {path:'layout', component:LayoutsComponent},
 {path:'acceuil', component:ImageComponent},
 {path:'category', component:CategoryComponent},
 {path:'cart-page', component:CartPageComponent},
 {path:'category/:id', component:ProduitsComponent},
 {path:'detail/:id', component:DetailproductComponent},
 {path:'wishlist', component:WishListComponent},
 {path:'search/:searchTerm', component:ProduitsComponent},
 {path:'searchCat/:searchTermCat', component:CategoryComponent},

 {
  path:'admin',
  component:LayoutsComponent,
  children:[
    {
      path:'',
      component:DashboardComponent, canActivate: [AuthGuardService]
    },
    {
      path:'updateprofile/:id',
      component:UpdateProfileComponent, canActivate: [AuthGuardService]
    },
    {
      path:'addusers',
      component:AddUserComponent, canActivate: [AuthGuardService]
    },
    {
      path:'updateusers/:id',
      component:UpdateUserComponent, canActivate: [AuthGuardService]
    },
    {
      path:'categorys',
      component:CategorysComponent, canActivate: [AuthGuardService]
    },
    {
      path:'addcategorys',
      component:AddCategoryComponent, canActivate: [AuthGuardService]
    },
    {
      path:'updatecategory/:id',
      component:UpdateCategoryComponent, canActivate: [AuthGuardService]
    },
    {
      path:'showcategory/:id',
      component:ShowCategoryComponent, canActivate: [AuthGuardService]
    },
    {
      path:'products',
      component:ProductsComponent, canActivate: [AuthGuardService]
    },
    {
      path:'addproducts',
      component:AddProductComponent, canActivate: [AuthGuardService]
    },
    {path:'showproduct/:id',
    component:ShowProductComponent, canActivate: [AuthGuardService]
    },
    {path:'updateproduct/:id',
    component:UpdateProductComponent, canActivate: [AuthGuardService]
    },
    {
      path:'users',
      component:UsersComponent, canActivate: [AuthGuardService]
    },
    {
      path:'admins',
      component:AdminsComponent, canActivate: [AuthGuardService]
    },
    {
      path:'gerants',
      component:GerantsComponent, canActivate: [AuthGuardService]
    },
    {
      path:'allcart',
      component:GereCartComponent, canActivate: [AuthGuardService]
    },
    {
      path:'cart/:id',
      component:ShowCartComponent, canActivate: [AuthGuardService]
    },
    {
      path:'addgerants',
      component:AddGerantComponent, canActivate: [AuthGuardService]
    },
    {
      path:'updategerants/:id',
      component:UpdateGerantComponent, canActivate: [AuthGuardService]
    },
  ]

}


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
