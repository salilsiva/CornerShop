import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  items: CartItem[] = [];
  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.items = this.cartService.getCart();
  }

  updateQty(productId: number, qty: number){
    this.cartService.updateQty(productId, qty);
    this.items = this.cartService.getCart();
  }

  total() : number{
    return this.items.reduce((sum, x) => sum + x.price * x.quantity, 0);
  }
}
