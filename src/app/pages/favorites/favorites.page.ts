import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { NavController } from '@ionic/angular';
import { Recipe } from 'src/app/models/recipe.models';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoriteRecipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.favoriteRecipes = recipes.filter(recipe => recipe.status === 'Favorito');
    });
  }

  // Navegar al detalle de la receta
  viewRecipe(recipeId: string) {
    this.navCtrl.navigateForward(`/details/${recipeId}`);
  }

  navigateToProfile(){
    this.navCtrl.navigateForward('/user-profile');
  }
}
