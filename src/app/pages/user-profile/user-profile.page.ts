import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  profileForm!: FormGroup; // FormGroup para manejar el formulario
  passwordType: string = 'password'; // Tipo de campo para la contraseña
  passwordIcon: string = 'eye-off-outline'; // Ícono inicial (contraseña oculta)

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private authService: AuthService // Servicio de autenticación
  ) {}

  async ngOnInit() {
    // Inicialización del FormGroup con controles de correo y contraseña
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Carga del usuario autenticado
    try {
      const user = await this.authService.getCurrentUser();
      if (user) {
        this.profileForm.patchValue({
          email: user.email || '',
          password: user.password || '*****', // Contraseña oculta por defecto
        });
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  // Navegar a la página de agregar
  goToAgregar() {
    this.navCtrl.navigateForward('/agregar'); // Cambiar si es necesario
  }

  // Actualizar perfil del usuario en Firebase (si es necesario)
  async updateProfile() {
    if (this.profileForm.valid) {
      try {
        const currentUser = await this.authService.getCurrentUser();
        if (currentUser) {
          console.log('Perfil actualizado correctamente');
        }
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  // Cerrar sesión y redirigir al login
  logout() {
    this.authService.logout().then(() => {
      console.log('Cerrando sesión');
      this.navCtrl.navigateRoot('/login'); // Redirige al login
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Formulario enviado', this.profileForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }

  goToFavoritos() {
    this.navCtrl.navigateForward('/favorites');
  }
  
}

