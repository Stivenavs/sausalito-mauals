import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MANUAL_NAV } from '../shared/manual-nav.data';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-manual-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './manual-shell.component.html',
  styleUrl: './manual-shell.component.css',
})
export class ManualShellComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  nav = MANUAL_NAV;
  sidenavOpen = signal(false);

  toggleSidenav() {
    this.sidenavOpen.update((v) => !v);
  }

  closeSidenav() {
    this.sidenavOpen.set(false);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
