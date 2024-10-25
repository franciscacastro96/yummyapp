import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  constructor(private navCtrl: NavController) {}

  // Función para regresar a la página anterior
  goBack() {
    this.navCtrl.navigateBack('/recipes'); // Vuelve a la página de recetas
  }
}

