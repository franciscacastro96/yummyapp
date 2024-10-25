import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.models';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  recipeId: string | null = null;
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    // Obtener el ID de la receta desde la URL
    this.recipeId = this.route.snapshot.paramMap.get('id');

    if (this.recipeId) {
      // Obtener la receta desde Firebase usando el ID
      this.recipeService.getRecipeById(this.recipeId).subscribe((data) => {
        this.recipe = data;
        console.log('Receta cargada:', this.recipe); // Verificar que los datos se carguen correctamente
      });
    }
  }

  // Método para volver a la página anterior
  goBack() {
    history.back();
  }
}
