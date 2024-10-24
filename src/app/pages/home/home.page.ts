import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.models';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  navigateToRecipes(){
    this.navCtrl.navigateForward('/recipes');
  }

  viewRecipe(recipeId: string){
    if(recipeId){
      console.log('Ver receta: ', recipeId)
    }else{
      console.error('No hay recetas');
    }
    
  } 
}
