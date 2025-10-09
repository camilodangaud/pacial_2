import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  name = '';
  lastName = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    const ok = await this.authService.register({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });

    if (ok) {
      alert('Usuario registrado con éxito');
      this.router.navigate(['/login']);
    } else {
      alert('El correo ya está registrado');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
