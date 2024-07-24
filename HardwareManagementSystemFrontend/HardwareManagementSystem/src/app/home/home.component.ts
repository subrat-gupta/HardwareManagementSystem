import { Component } from '@angular/core';
import { AppComponent } from "../app.component";
import { AuthModule } from '../auth/auth.module';

@Component({
  selector: 'home',
  standalone: true,
  imports: [AppComponent,AuthModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
