import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PROCESS_STAGES } from '../shared/manual-nav.data';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  stages = PROCESS_STAGES;

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
