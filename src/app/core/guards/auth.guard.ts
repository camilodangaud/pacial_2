import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      const autorizado = await this.auth.isAuthenticated();
      if (!autorizado) {
        console.warn('Acceso denegado: usuario no autenticado.');
        return this.router.createUrlTree(['/login']);
      }
      console.log('Usuario autenticado, acceso permitido.');
      return true;
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      return this.router.createUrlTree(['/login']);
    }
  }
}
