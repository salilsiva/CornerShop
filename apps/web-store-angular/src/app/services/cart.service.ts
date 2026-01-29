import { Injectable } from '@angular/core';
import { Product } from '../models/product';

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const KEY = 'cornderShop.cart.v1';

@Injectable({
  providedIn: 'root'
})


export class CartService {

  constructor() { }

  getCart(): CartItem[]{
    const raw = localStorage.getItem(KEY);
    if(!raw) return [];
    try{
      return JSON.parse(raw) as CartItem[];
    }catch{ return [];}
    
  }

  private saveCart(items : CartItem[]){
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  addToCart(product: Product, qty: number){
    const cart = this.getCart();
    const existing = cart.find(x => x.productId === product.id);
    
    if(existing){
      existing.quantity += qty;
    }else{
       cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: qty
       });
    }

    this.saveCart(cart);

  }

  updateQty(productId: number, qty: number){
    const cart = this.getCart()
      .map(x=> x.productId === productId?{...x, quantity: qty}: x)
      .filter(x => x.quantity > 0);

      this.saveCart(cart);
  }

  clear(){
    this.saveCart([]);
  }
}
