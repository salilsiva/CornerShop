import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email='';
  password='';
  error: string | null=null;
  constructor(private auth: AuthService, private router: Router){}

  login(){
    this.auth.login(this.email, this.password).subscribe({
      next: ()=> this.router.navigateByUrl("/products"),
      error: (err) => this.error = 'Login failed'
    });
  }
}
