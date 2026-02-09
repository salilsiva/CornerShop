import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../../models/product';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  loading = true;
  error: string |null = null;
  constructor(private productService : ProductsService){}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => {this.products = data; this.loading = false;},
      error: (err) =>  { this.error = String(err?.message ?? err); this.loading= false;}

    });      
  }

}
