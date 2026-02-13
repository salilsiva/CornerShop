import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CartItem } from './cart.service';
import { LoggerService } from '../../core/logger.service';

export interface CheckoutSessionStatus{
  status: 'paid'|'unpaid'|'pending'|'not-found';
  amountTotal?: number;
  currency?: string;
  customerEmail?: string;
  paymentIntentId?: string;
  receiptUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private baseUrl = 'http://localhost:5093';

  constructor(private http: HttpClient, private logger: LoggerService) {}

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

  getCheckoutSession(sessionId: string){
    this.logger.info(`checkout.service: getCheckoutSession called with ${{sessionId}}`);
    return this.http.get<CheckoutSessionStatus>(
      `${this.baseUrl}/payments/checkout-session/${encodeURIComponent(sessionId)}`
    );
  }
}