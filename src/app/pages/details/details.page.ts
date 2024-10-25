import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.models';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  recipe: Recipe | undefined; // Asegúrate de declarar esta propiedad

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.recipeService.getRecipeById(recipeId).subscribe((data) => {
        this.recipe = data;
      });
    }
  }

  goToEdit() {
    if (this.recipe?.id) {
      this.navCtrl.navigateForward(`/edit-recipe/${this.recipe.id}`);
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/recipes');
  }

  toggleFavorite() {
    if (this.recipe) {
      const newStatus = this.recipe.status === 'Favorito' ? 'Normal' : 'Favorito';
      this.recipeService.updateFavorite(this.recipe.id!, newStatus).then(() => {
        this.recipe!.status = newStatus;
      });
    }
  }
}


