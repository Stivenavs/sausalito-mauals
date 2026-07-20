import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'manual-hidraulico-auth';
const USERNAME = 'sausalito';
const PASSWORD = 'kafereterra';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authenticated = signal(localStorage.getItem(STORAGE_KEY) === 'true');
  readonly isAuthenticated = this.authenticated.asReadonly();

  login(username: string, password: string): boolean {
    const ok = username === USERNAME && password === PASSWORD;
    if (ok) {
      localStorage.setItem(STORAGE_KEY, 'true');
      this.authenticated.set(true);
    }
    return ok;
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.authenticated.set(false);
  }
}
