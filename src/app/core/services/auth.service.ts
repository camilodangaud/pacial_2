import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor() {}

  async login(email: string, password: string): Promise<any> {
    const result = await FirebaseAuthentication.signInWithEmailAndPassword({ email, password });
    return result.user; 
  }

 async register(data: { name: string; lastName: string; email: string; password: string }): Promise<any> {
  const { name, lastName, email, password } = data;
  try {
    const result = await FirebaseAuthentication.createUserWithEmailAndPassword({ email, password });
    if (result.user) {
      await FirebaseAuthentication.updateProfile({
        displayName: `${name} ${lastName}`
      });
    }
    return result.user;
  } catch (error) {
    return false;
  }
}

  async logout(): Promise<void> {
    await FirebaseAuthentication.signOut();
  }

  async isAuthenticated(): Promise<boolean> {
    const result = await FirebaseAuthentication.getCurrentUser();
    return result.user !== null;
  }
}