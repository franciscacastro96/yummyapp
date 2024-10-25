import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.models';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  recipeForm!: FormGroup;
  recipeId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    // Obtener el ID de la receta desde la URL
    this.recipeId = this.route.snapshot.paramMap.get('id');

    if (this.recipeId) {
      // Cargar la receta y rellenar el formulario
      this.recipeService.getRecipeById(this.recipeId).subscribe((recipe) => {
        if (recipe) {
          this.recipeForm.patchValue(recipe);
        }
      });
    }

    // Inicializar el formulario
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      preparationLocation: [''],
      imageUrl: [''],
      preparationTime: [''],
      difficulty: ['', Validators.required],
      serves: [''],
      preparationSteps: ['']
    });
  }

  // Guardar cambios en la receta
  saveChanges() {
    if (this.recipeForm.valid && this.recipeId) {
      const updatedRecipe = this.recipeForm.value;
      this.recipeService.updateRecipe(this.recipeId, updatedRecipe).then(() => {
        console.log('Receta actualizada');
        this.navCtrl.navigateBack(`/details/${this.recipeId}`);
      });
    }
  }

  // Eliminar la receta
  deleteRecipe() {
    if (this.recipeId) {
      this.recipeService.deleteRecipe(this.recipeId).then(() => {
        console.log('Receta eliminada');
        this.navCtrl.navigateBack('/recipes');
      });
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/favorites');
  }


  
}
