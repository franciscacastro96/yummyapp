import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';  // Importar ActivatedRoute para obtener parámetros de la URL
import { RecipeService } from 'src/app/services/recipe.service';  // Importar el servicio de recetas
import { Recipe } from 'src/app/models/recipe.models';  // Importar el modelo de recetas

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  recipe: Recipe | undefined;  // Variable para almacenar los detalles de la receta

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,  // Inyectar ActivatedRoute
    private recipeService: RecipeService  // Inyectar el servicio de recetas
  ) {}

  ngOnInit() {
    // Obtener el ID de la receta desde la URL
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      // Obtener los detalles de la receta desde Firebase
      this.recipeService.getRecipeById(recipeId).subscribe((data) => {
        this.recipe = data;
      });
    }
  }
    // Función para marcar como favorito
  async toggleFavorite() {
    if (this.recipe) {
      const newStatus = this.recipe.status === 'Normal' ? 'Favorito' : 'Normal';
      try {
        await this.recipeService.updateFavorite(this.recipe.id!, newStatus);
        this.recipe.status = newStatus; // Actualizamos el estado localmente
        console.log(`Receta marcada como ${newStatus}`);
      } catch (error) {
        console.error('Error al actualizar el estado:', error);
      }
    }
  }
  // Función para regresar a la página anterior
  goBack() {
    this.navCtrl.navigateBack('/recipes');  // Vuelve a la página de recetas
  }
}

