import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);

  username = '';
  password = '';
  error = signal(false);

  constructor() {
    this.titleService.setTitle('Iniciar sesión · Manual Hidráulico');
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/');
    }
  }

  submit(): void {
    if (this.authService.login(this.username, this.password)) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigateByUrl(returnUrl);
    } else {
      this.error.set(true);
      this.password = '';
    }
  }
}
