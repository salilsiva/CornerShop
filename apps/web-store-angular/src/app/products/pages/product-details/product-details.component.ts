import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { CartService } from '../../../services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  product: Product |null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, 
    private ProductsService: ProductsService, 
    private cartService: CartService,
    private router: Router){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ProductsService.getById(id).subscribe({
      next: (p) => {this.product = p; this.loading = false;},
      error: (err) => {this.error = String(err?.message ?? err); this.loading= false;}
    });
  }

  addToCart(){
    if(!this.product) return;
    this.cartService.addItem(this.product.id, 1).subscribe({
      next: ()=> {console.log("item added to cart"),
        this.router.navigate(["/cart"])
      },
      error:()=> alert("Please login to add items to cart")
    });
  }
}
