import { Component ,OnInit} from '@angular/core';
import { AuthService } from 'src/app/service/backend/auth.service';
import { CategorysService } from 'src/app/service/backend/categorys.service';
import { ProductsService } from 'src/app/service/backend/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  categorys:any;
  products:any;
  carts:any;
  catp:any;
  date:Date;
totalDay:Number=0;
totalMonth:Number=0;
totalYear:Number=0;
totalPrices:Number;
cartDate:any;
filteredCarts:any;
totalcounts:any;
totalcountDay:any;
totalcountMonth:any;
totalcountYear:any;
  currentDate: Date = new Date();
  currentAdmin:any;
  constructor(public categorysService:CategorysService,
     public productsService:ProductsService,private authService:AuthService){
      this.authService.init()
      let admin=localStorage.getItem('currentAdmin');
      console.log(admin)
      if(admin)
        this.currentAdmin=JSON.parse(admin)
  }
  ngOnInit(): void {
    this.getAllCategorys()
    this.getAllProducts()
    this.getAllCarts()
    this.getAllCartsMonth()
    this.getAllCartsToday()
    this.getAllCartsYear()
    this.getAllCountToday()
    this.getAllCountMonth()
    this.getAllCountYear()
  }

  getAllCategorys()
  { this.categorysService.getCategorys().subscribe(categorys => {
    console.log(categorys)
    this.categorys = categorys;

  });}
  getAllProducts()
  { this.productsService.getProducts().subscribe(pro => {
    console.log(pro)
    this.products = pro.length;

  });}
  getAllCarts()
  { this.productsService.getAllCart().subscribe(pro => {
    console.log(pro)
    this.carts = pro.length;
  });}
  getAllCartsToday(): void {
    this.productsService.getAllCart().subscribe(cart => {
      console.log(cart);
      this.filteredCarts = cart.filter(cart => {
       this.cartDate = new Date(cart.date);
        return (
          this.cartDate.getDate() === this.currentDate.getDate() &&
          this.cartDate.getMonth() === this.currentDate.getMonth() &&
          this.cartDate.getFullYear() === this.currentDate.getFullYear()
        );
      });
      this.totalPrices = this.filteredCarts.reduce((sum, cart) => sum + Number(cart.totalPrice), 0);
      this.totalDay = this.totalPrices;
      console.log(this.totalPrices);
    });
  }
  getAllCartsMonth(): void {
    this.productsService.getAllCart().subscribe(cart => {
      console.log(cart);
      this.filteredCarts = cart.filter(cart => {
       this.cartDate = new Date(cart.date);
        return (

          this.cartDate.getMonth() === this.currentDate.getMonth() &&
          this.cartDate.getFullYear() === this.currentDate.getFullYear()
        );
      });
      this.totalPrices = this.filteredCarts.reduce((sum, cart) => sum + Number(cart.totalPrice), 0);
      this.totalMonth = this.totalPrices;
      console.log(this.totalPrices);
    });
  }
  getAllCartsYear(): void {
    this.productsService.getAllCart().subscribe(cart => {
      console.log(cart);
      this.filteredCarts = cart.filter(cart => {
       this.cartDate = new Date(cart.date);
        return (


          this.cartDate.getFullYear() === this.currentDate.getFullYear()
        );
      });
      this.totalPrices = this.filteredCarts.reduce((sum, cart) => sum + Number(cart.totalPrice), 0);
      this.totalYear = this.totalPrices;
      console.log(this.totalPrices);
    });
  }
  getAllCountToday(): void {
    this.productsService.getAllCart().subscribe(cart => {
      console.log(cart);
      this.filteredCarts = cart.filter(cart => {
       this.cartDate = new Date(cart.date);
        return (
          this.cartDate.getDate() === this.currentDate.getDate() &&
          this.cartDate.getMonth() === this.currentDate.getMonth() &&
          this.cartDate.getFullYear() === this.currentDate.getFullYear()
        );
      });
      this.totalcounts = this.filteredCarts.reduce((sum, cart) => sum + Number(cart.totalCount), 0);
      this.totalcountDay = this.totalcounts;

    });
  }
    getAllCountMonth(): void {
      this.productsService.getAllCart().subscribe(cart => {
        console.log(cart);
        this.filteredCarts = cart.filter(cart => {
         this.cartDate = new Date(cart.date);
          return (

            this.cartDate.getMonth() === this.currentDate.getMonth() &&
            this.cartDate.getFullYear() === this.currentDate.getFullYear()
          );
        });
        this.totalcounts = this.filteredCarts.reduce((sum, cart) => sum + Number(cart.totalCount), 0);
        this.totalcountMonth = this.totalcounts;

      });
    }
    getAllCountYear(): void {
      this.productsService.getAllCart().subscribe(cart => {
        console.log(cart);
        this.filteredCarts = cart.filter(cart => {
         this.cartDate = new Date(cart.date);
          return (


            this.cartDate.getFullYear() === this.currentDate.getFullYear()
          );
        });
        this.totalcounts = this.filteredCarts.reduce((sum, cart) => sum + Number(cart.totalCount), 0);
        this.totalcountYear = this.totalcounts;

      });
    }
  }


