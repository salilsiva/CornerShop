import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  error: string |null = null;

  constructor(private auth: AuthService, private router: Router){

  }

  register(){
    this.error = null;
    this.auth.register(this.email, this.password).subscribe({
      next: ()=> this.router.navigateByUrl('/products'),
      error: (e) => this.error = e?.error?? 'Register failed'
    });
  }
}
