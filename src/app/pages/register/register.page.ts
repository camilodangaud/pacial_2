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
  birthDate = '';
  country = '';
  city = '';
  gender = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    const user = {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      birthDate: this.birthDate,
      country: this.country,
      city: this.city,
      gender: this.gender,
      showGenderProfile: true,
      passions: [
        { category: 'Harry potter' },
        { category: 'Music' },
        { category: 'Video games' },
        { category: 'Travel' },
      ],
      photos: ['/profile/name.jpg', '/profile/name.jpg'],
    };

    const ok = await this.authService.register(user);

    if (ok) {
      alert('Usuario registrado con éxito');
      this.router.navigate(['/login']);
    } else {
      alert('Error al registrar el usuario');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
