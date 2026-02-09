import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, AuthLayoutComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  error: string |null = null;
  registerForm! : FormGroup;
  showPassword = false;
  loading = false;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder){

  }

   ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  onRegister()
  {
     const{email, password} = this.registerForm.value;
     if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.error = null;
    this.auth.register(email, password).subscribe({
      next: ()=> this.router.navigateByUrl('/products'),
      error: (e) => {
        const err = e?.error;

        if (Array.isArray(err)) {
          const emailErr = err.find((x: string) =>
          x.toLowerCase().includes('email')
        );
        this.error = emailErr ?? err[0] ?? 'Register failed';
        return;
        }
        this.error= 'Register failed';
      }
    });
  }
}
