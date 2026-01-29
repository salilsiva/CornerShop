import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { environment } from '../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/api/products`);
  }

  getById(id: number): Observable<Product>{
    return this.http.get<Product>(`${environment.apiBaseUrl}/api/products/${id}`);
  }
}


