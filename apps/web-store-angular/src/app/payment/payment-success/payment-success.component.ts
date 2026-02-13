import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, timer, switchMap,takeWhile } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CheckoutService, CheckoutSessionStatus } from '../../services/cart/checkout.service';
import { LoggerService } from '../../core/logger.service';


@Component({
  selector: 'app-payment-success',
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnDestroy{
  loading = true;
  data?: CheckoutSessionStatus;
  errorMsg = '';
  private sub?: Subscription;

  constructor(private route: ActivatedRoute, public checkout: CheckoutService, private logger:LoggerService){
    this.sub = this.route.queryParamMap.subscribe(params=>{
      const sessionId = params.get('session_id');
      logger.info(`PaymentSuccessComponent: constructer has ${{sessionId}}`);
      if(!sessionId){
        this.loading = false;
        this.errorMsg = 'Missing session_id in the URL';
        return;
      }
      this.loading = true;
      this.errorMsg = '';

      this.sub?.unsubscribe(); // ensure no old polling
      this.sub = timer(0, 2000).pipe(
        switchMap(() => this.checkout.getCheckoutSession(sessionId)),
        takeWhile((res, index) => {
          // stop when paid/failed OR after 10 polls (~20s)
          const done = res.status === 'paid';
          const timedOut = index >= 10;
          return !(done || timedOut);
        }, true)
      ).subscribe({
        next: (res) => {
          logger.info(`res: ${{res}}`);
          this.data = res;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.errorMsg = 'Server error while confirming payment.';
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe;
  }

  formatAmount(amountMinor: number, currency?: string){
    const cur = (currency || 'gbp').toUpperCase();
    return new Intl.NumberFormat('en-GB', {style: 'currency', currency: cur}).format(amountMinor /100);
  }
}
