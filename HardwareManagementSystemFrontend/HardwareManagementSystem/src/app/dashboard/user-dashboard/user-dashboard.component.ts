import { Component } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: 'user-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

}
