import { registerPlugin } from '@capacitor/core';

export interface IFirebasePlugin {
  registerUser(data: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    birthDate?: string;
    country?: string;
    city?: string;
    gender?: string;
    showGenderProfile?: boolean;
    passions?: { category: string }[];
    photos?: string[];
  }): Promise<{ success: boolean; uid?: string; message?: string }>;

  loginUser(credentials: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; uid?: string; email?: string; message?: string }>;
}

const FirebasePlugin = registerPlugin<IFirebasePlugin>('FirebasePlugin');
export default FirebasePlugin;
