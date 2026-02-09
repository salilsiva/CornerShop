import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
  private cartItems: CartItem[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  constructor(private http:HttpClient) { }

  getItems(){
    return this.cartItems;
  }

  getMyCart(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(`${environment.apiBaseUrl}/api/cart`).pipe(
      tap(items => {
        this.cartItems = items ?? [];
        this.updateCount();
      })
    );
  }

  addItem(productId: number, quantity: number){
    return this.http.post(`${environment.apiBaseUrl}/api/cart/items`, {productId, quantity});
    this.updateCount();
  }

  updateQty(productId: number, qty: number){
    return this.http.put(`${environment.apiBaseUrl}/api/cart/items/${productId}?qty=${qty}`,{});
  }

  remove(productId: number){
    return this.http.delete(`${environment.apiBaseUrl}/api/cart/items/{productId}`);
    this.updateCount();
  }

  clear(){
    this.cartItems = [];
    this.updateCount();
  }

  private updateCount(){
    const count = this.cartItems.reduce((sum, x) => sum + (x.quantity ?? 0), 0);
    this.cartCountSubject.next(count);
  }

}
