import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../../models/product';



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
  constructor(private productSvc: ProductsService){
    
  }

  ngOnInit(): void {
    this.productSvc.getAll().subscribe({
      next: (featured) => this.featured = featured,
      error:(err) => console.error(err)
    });
  }
  addToCart(){

  }
}
