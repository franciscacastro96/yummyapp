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

  constructor(private navCtrl: NavController, private recipeService: RecipeService) { }

  ngOnInit() {
        // Obtener las recetas desde Firebase
        this.recipeService.getRecipes().subscribe((data) => {
          this.recipes = data;
        });
  }

  navigateTohome(){
    this.navCtrl.navigateForward('/home');
  }

  navigateToDetail(){
    this.navCtrl.navigateForward('/details');
  }

  viewRecipe(recipeId: string){
    if(recipeId){
      console.log('Ver receta: ', recipeId)
    }else{
      console.error('No hay recetas');
    }
    
  }
}