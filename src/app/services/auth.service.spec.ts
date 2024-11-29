import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Mocks para Firebase y Router
class AngularFireAuthMock {
  createUserWithEmailAndPassword(email: string, password: string) {
    return of({ user: { email } });
  }
  signInWithEmailAndPassword(email: string, password: string) {
    return of({ user: { email } });
  }
  signOut() {
    return of(null);
  }
  sendPasswordResetEmail(email: string) {
    return of(null);
  }
  get authState() {
    return of({ email: 'user@example.com' });
  }
  get currentUser() {
    return Promise.resolve({ email: 'user@example.com' });
  }
}

class RouterMock {
  navigate(path: string[]) {}
}

describe('AuthService', () => {
  let service: AuthService;
  let afAuthMock: AngularFireAuthMock;
  let routerMock: RouterMock;

  beforeEach(() => {
    afAuthMock = new AngularFireAuthMock();
    routerMock = new RouterMock();

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: afAuthMock },
        { provide: Router, useValue: routerMock },
        AuthService,
      ],
    });

    service = TestBed.inject(AuthService);
  });

  // PRUEBA 1: Verificar login
  it('debería iniciar sesión correctamente', async () => {
    const email = 'user@example.com';
    const password = 'password123';
    await service.login(email, password);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  // PRUEBA 2: Verificar logout
  it('debería cerrar sesión correctamente y eliminar el usuario del localStorage', async () => {
    spyOn(localStorage, 'removeItem');
    spyOn(routerMock, 'navigate');
    await service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  afterEach(() => {
    // Limpiar mocks
    localStorage.clear();
  });
});