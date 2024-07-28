import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const user = this.authService.getCurrentUser();
    if (user && user.userTypeId === 1) { // Assuming 1 is the admin userTypeId
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
