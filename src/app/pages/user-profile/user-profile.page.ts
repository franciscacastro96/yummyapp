import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  
  // Asegúrate de que tu formulario esté bien definido
  profileForm: any; // Esto puede ser un FormGroup si estás usando Reactive Forms
  
  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    // Aquí inicializas tu formulario y otras cosas si es necesario
  }

  // Función para navegar a la página de agregar
  goToAgregar() {
    this.navCtrl.navigateForward('/agregar'); // Cambia '/agregar' si esta no es la ruta correcta
  }

  // Función para actualizar el perfil
  updateProfile() {
    console.log('Perfil actualizado');
  }

  // Función para cerrar sesión
  logout() {
    console.log('Cerrando sesión');
  }
}
