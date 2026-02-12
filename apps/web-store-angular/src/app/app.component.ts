import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart/cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'web-store-angular';
  cartCount = 1;

  constructor(public auth: AuthService, private cartService: CartService, private router: Router){}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
    this.cartCount = count;
  });
  }
  logout(){
    this.auth.logout();
    this.router.navigate(["/login"]);
    
  }


}
