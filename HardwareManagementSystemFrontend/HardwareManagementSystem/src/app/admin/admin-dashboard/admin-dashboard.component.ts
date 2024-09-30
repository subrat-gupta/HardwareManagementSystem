import { Component } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}