import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routeSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routeSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('debería permitir acceso si está autenticado', async () => {
    authServiceSpy.isAuthenticated.and.returnValue(Promise.resolve(true));
    const result = await guard.canActivate({} as any, {} as any);
    expect(result).toBeTrue();
  });

  it('debería redirigir al login si NO está autenticado', async () => {
    authServiceSpy.isAuthenticated.and.returnValue(Promise.resolve(false));
    const mockUrlTree = { url: '/login' } as any;
    routerSpy.createUrlTree.and.returnValue(mockUrlTree);

    const result = await guard.canActivate({} as any, {} as any);
    expect(result).toBe(mockUrlTree);
  });
});
