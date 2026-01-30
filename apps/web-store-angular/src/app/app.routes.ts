import { Routes } from '@angular/router';
import { HomeComponent } from './products/pages/home/home.component';
import { ProductListComponent } from './products/pages/product-list/product-list.component';
import { producerUpdateValueVersion } from '@angular/core/primitives/signals';
import { ProductDetailsComponent } from './products/pages/product-details/product-details.component';
import { CartComponent } from './cart/pages/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'products', component: ProductListComponent},
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: 'cart', component: CartComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', redirectTo: ''},
];
