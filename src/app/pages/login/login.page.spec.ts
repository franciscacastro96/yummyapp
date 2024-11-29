import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Configuración mock para Firebase
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
};

// Mock del servicio AuthService
class AuthServiceMock {
  login(email: string, password: string) {
    return of({ user: { email } }); // Simulando una respuesta exitosa
  }
}

class NavControllerMock {
  navigateForward(path: string) {}
}

// Mock de AngularFireAuth compatible con Jasmine
const mockAngularFireAuth = {
  signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(
    Promise.resolve({ user: { uid: '12345', email: 'test@example.com' } })
  ),
  signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve(true)),
};

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authServiceMock: AuthServiceMock;
  let navCtrlMock: NavControllerMock;

  beforeEach(async () => {
    authServiceMock = new AuthServiceMock();
    navCtrlMock = new NavControllerMock();

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),       // Agrega el módulo de Ionic
        ReactiveFormsModule,         // Para formularios reactivos
        FormsModule,                 // Para formularios de plantilla
        AngularFireModule.initializeApp(firebaseConfig), // Configuración de Firebase
        AngularFireAuthModule        // Módulo de autenticación de Firebase
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth }, // Mock de AngularFireAuth
        { provide: AuthService, useValue: authServiceMock },
        { provide: NavController, useValue: navCtrlMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // PRUEBA 1: Verificar que el componente se haya creado correctamente
  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  // PRUEBA 2: Verificar que el formulario sea válido cuando email y contraseña son correctos
  it('should make the form valid when email and password are provided', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.valid).toBeTruthy();
  });

  // PRUEBA 3: Verificar que el método login() se llame correctamente y navegue a home en caso de éxito
  it('should call login and redirect to home on successful login', async () => {
    spyOn(navCtrlMock, 'navigateForward'); // Espiar la función de navegación

    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    await component.onLogin(); // Llamar al método de login

    expect(mockAngularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
    expect(navCtrlMock.navigateForward).toHaveBeenCalledWith('/home');
  });
});
