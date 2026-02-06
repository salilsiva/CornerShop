import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { tap } from 'rxjs';

type AuthResponse = {token: string; email: string};

const KEY = 'cornershop.jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  get token(): string | null{
    return localStorage.getItem(KEY);
  }

  isLoggedIn(): boolean{
    return !!this.token;
  }

  register(email: string, password: string){
    return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/api/auth/register`, {email, password})
     .pipe(tap(res=> localStorage.setItem(KEY, res.token)));
  }

  login(email: string, password: string, rememberMe: boolean){
    return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/api/auth/login`, {email, password})
      .pipe(tap(res => {
        if(rememberMe){
          localStorage.setItem(KEY, res.token);
        }else{
          sessionStorage.setItem(KEY, res.token);
        }
      })
    );
  }


  logout(){
    localStorage.removeItem(KEY);
  }
}
