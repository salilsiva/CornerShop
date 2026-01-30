import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment';

export type CartItem={
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  getMyCart(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(`${environment.apiBaseUrl}/api/cart`);
  }

  addItem(productId: number, quantity: number){
    return this.http.post(`${environment.apiBaseUrl}/api/cart/items`, {productId, quantity});
  }

  updateQty(productId: number, qty: number){
    return this.http.put(`${environment.apiBaseUrl}/api/cart/items/${productId}?qty=${qty}`,{});
  }

  remove(productId: number){
    return this.http.delete(`${environment.apiBaseUrl}/api/cart/items/{productId}`);
  }

}
