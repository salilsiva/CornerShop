import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart/cart.service';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../../services/cart/checkout.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  items: CartItem[] = [];
  quantity = 1;  
  constructor(private cartService: CartService, private checkoutService: CheckoutService){}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.cartService.getMyCart().subscribe({
      next: (data)=> this.items = data,
      error: () => this.items = []
    });
  }

  updateQty(productId: number, qty: number){
    this.cartService.updateQty(productId, qty).subscribe({
      next: ()=> this.refresh()
    });
    
  }

  total() : number{
    return this.items.reduce((sum, x) => sum + x.price * x.quantity, 0);
  }

  async checkout(){ 
    console.log("Car: checkout called");
    await this.checkoutService.startCheckout(this.items);
  }

}
