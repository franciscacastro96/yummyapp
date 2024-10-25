import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.models';
import { RecipeService } from 'src/app/services/recipe.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: any[] = []; 

  constructor(
    private navCtrl: NavController, 
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((data) => {
      console.log('Recetas cargadas:', data); // Verifica que cada receta tenga un ID
      this.recipes = data;
    });
  }

  viewRecipe(recipeId: string) {
    console.log('Navegando a los detalles con ID:', recipeId); // Depurar el ID
    if (recipeId) {
      this.navCtrl.navigateForward(`/details/${recipeId}`);
    } else {
      console.error('ID de receta no disponible');
    }
  }

  navigateTohome(){
    this.navCtrl.navigateForward('/home');
  }

  navigateToDetail(){
    this.navCtrl.navigateForward('/details');
  }

}