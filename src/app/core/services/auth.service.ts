import { Injectable } from '@angular/core';
import FirebasePlugin from '../../plugins/tinderPlugin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor() {}

  async login(email: string, password: string): Promise<boolean> {
    try {
      await FirebasePlugin.loginUser({ email, password });
      return true;
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
  
      return false;
    }
  }

  async register(data: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    birthDate?: string;
    country?: string;
    city?: string;
    gender?: string;
    showGenderProfile?: boolean;
    passions?: any[];
    photos?: any[];
  }): Promise<boolean> {
    try {
      const response = await FirebasePlugin.registerUser(data);

      console.log('✅ Respuesta del plugin:', response);

      if (response.success) {
        return true;
      } else {
        console.error('⚠️ Registro fallido:', response.message);
        alert('Error al registrar usuario: ' + (response.message || 'Error desconocido'));
        return false;
      }
    } catch (error: any) {
      console.error('❌ Error al registrar usuario:', error);
      alert('Detalle: ' + (error?.message || JSON.stringify(error)));
      return false;
    }
  }

  async logout(): Promise<void> {
    console.log('Sesión cerrada localmente');
  }

  async isAuthenticated(): Promise<boolean> {
    return false;
  }
}
