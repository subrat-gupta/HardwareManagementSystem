import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  constructor(private authService: AuthService) {}
  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
