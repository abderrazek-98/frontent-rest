import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'src/app/service/backend/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutsComponent } from './layouts/layouts/layouts.component';
import { UsersComponent } from './pages/crud-user/users/users.component';
import { AdminsComponent } from './pages/crud-user/admins/admins.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import {  RouterLink, RouterModule } from '@angular/router';
import { ShowCategoryComponent } from './pages/crud-category/show-category/show-category.component';
import { AddCategoryComponent } from './pages/crud-category/add-category/add-category.component';
import { UpdateCategoryComponent } from './pages/crud-category/update-category/update-category.component';
import { CategorysComponent } from './pages/crud-category/categorys/categorys.component';
import { ShowProductComponent } from './pages/crud-product/show-product/show-product.component';
import { AddProductComponent } from './pages/crud-product/add-product/add-product.component';
import { ProductModel } from './models/ProductModel';
import { ProductsComponent } from './pages/crud-product/products/products.component';
import { AddUserComponent } from './pages/crud-user/add-user/add-user.component';
import { UpdateUserComponent } from './pages/crud-user/update-user/update-user.component';
import { GerantsComponent } from './pages/crud-gerant/gerants/gerants.component';
import { AddGerantComponent } from './pages/crud-gerant/add-gerant/add-gerant.component';
import { UpdateGerantComponent } from './pages/crud-gerant/update-gerant/update-gerant.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateProductComponent } from './pages/crud-product/update-product/update-product.component';
import { AuthGuardService } from './service/backend/auth-guard.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UpdateProfileComponent } from './pages/crud-user/update-profile/update-profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule  } from 'ngx-pagination';
import { ImageComponent } from './frontend/image/image.component';
import { CategoryComponent } from './frontend/category/category.component';
import { DetailproductComponent } from './frontend/detailproduct/detailproduct.component';
import { ProduitsComponent } from './frontend/produits/produits.component';
import { CategoryproductComponent } from './frontend/categoryproduct/categoryproduct.component';
import { CartPageComponent } from './frontend/cart-page/cart-page.component';
import { WishListComponent } from './frontend/wish-list/wish-list.component';
import { SearchComponent } from './frontend/search/search.component';
import { NavFooterComponent } from './frontend/nav-footer/nav-footer.component';
import { NotFoundComponent } from './frontend/not-found/not-found.component';
import { GereCartComponent } from './pages/gere-cart/gere-cart.component';
import { ShowCartComponent } from './pages/show-cart/show-cart.component';


@NgModule({
  imports: [

    BrowserModule,
    AppRoutingModule,
    RouterLink,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ScrollingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,






  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LayoutsComponent,
    UsersComponent,
    AdminsComponent,
    ShowCategoryComponent,
    AddCategoryComponent,UpdateProfileComponent,GereCartComponent,ShowCartComponent,
    UpdateCategoryComponent,CategorysComponent, ShowProductComponent,UpdateProductComponent,
    AddProductComponent,ProductsComponent, AddUserComponent, UpdateUserComponent,NotFoundComponent,
    AddUserComponent,GerantsComponent, AddGerantComponent, UpdateGerantComponent,NavFooterComponent,
    UpdateProductComponent, UpdateProfileComponent, ImageComponent, CategoryComponent, DetailproductComponent,ProduitsComponent, CategoryproductComponent, CartPageComponent, WishListComponent, SearchComponent, NavFooterComponent, NotFoundComponent, GereCartComponent, ShowCartComponent,
  ],

  providers: [AuthService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
