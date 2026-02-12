import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {
   constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.document.body.classList.add('no-scroll');   // ✅ stop scroll only on auth pages
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('no-scroll'); // ✅ restore scroll on other pages
  }
}

