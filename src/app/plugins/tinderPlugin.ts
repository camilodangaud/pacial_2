import { registerPlugin } from '@capacitor/core';

export interface IFirebasePlugin {
  registerUser(data: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    country?: string;
    city?: string;
    gender?: string;
  }): Promise<{ success: boolean; message?: string }>;

  loginUser(credentials: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; token?: string; message?: string }>;
}

const FirebasePlugin = registerPlugin<IFirebasePlugin>('FirebasePlugin');
export default FirebasePlugin;
