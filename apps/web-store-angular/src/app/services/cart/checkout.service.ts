import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CartItem } from './cart.service';

export interface CreateIntentResponse{
  clientSecret: string;
  paymentIntentId: string;
}

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  constructor(private http: HttpClient) {}

  async startCheckout(cartItems: CartItem[]) {
    const body = {
      items: cartItems.map(i => ({
        productId: i.productId,
        quantity: i.quantity
      }))
    };

    const res = await firstValueFrom(
      this.http.post<{url: string}>(
        'http://localhost:5093/payments/checkout-session', body)
    );

    window.location.assign(res.url);
  }
}