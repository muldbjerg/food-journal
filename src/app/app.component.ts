import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'food-journal';
  showMenu = false;

  constructor(private authService: AuthService) {}

  signOut() {
    this.showMenu = false;
    this.authService.SignOut();
  }
}
