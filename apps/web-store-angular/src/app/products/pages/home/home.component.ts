import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router, Route } from "@angular/router";
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../../models/product';
import { CartService } from '../../../services/cart/cart.service';
import { LoggerService } from '../../../core/logger.service';



@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  loading : boolean= false;
  featured : Product[] = [];
  error = '';
  fallbackImage = "/images/cornershop-banner.jpg";
  constructor(private productSvc: ProductsService, 
    private cart: CartService, 
    private router: Router,
    private logger: LoggerService){
    
  }

  ngOnInit(): void {
    this.productSvc.getAll().subscribe({
      next: (featured) => this.featured = featured,
      error:(err) => console.error(err)
    });
  }

  addToCart(p: Product){
    this.logger.info(`Home - addToCart called with ${p.id}`);
     this.cart.addItem(p.id, 1).subscribe({
      next: ()=> {console.log("item added to cart"),
        this.router.navigate(["/cart"])
      },
      error:()=> alert("Please login to add items to cart")
    });
  }

}