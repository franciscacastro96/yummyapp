import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.models';
import { Ingredient } from 'src/app/models/ingredient.models';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  

  ingredients: Ingredient[] =[
    {
      id:'1',
      title:'Lechuga',
      imageUrl: ''
    },
    {
      id:'2',
      title:'Zapallo',
      imageUrl: ''
    },
    {
      id:'3',
      title:'Pollo',
      imageUrl: ''
    },
    {
      id:'4',
      title:'Papa',
      imageUrl: ''
    },
    {
      id:'5',
      title:'Porotos',
      imageUrl: ''
    },
    {
      id:'6',
      title:'Garbanzos',
      imageUrl: ''
    },
    {
      id:'7',
      title:'Ajos',
      imageUrl: ''
    },
    {
      id:'8',
      title:'Fideos',
      imageUrl: ''
    },
    {
      id:'9',
      title:'Arverjas',
      imageUrl: ''
    },
    {
      id:'10',
      title:'Tomate',
      imageUrl: ''
    }
  ];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  navigateToIngredients(){
    this.navCtrl.navigateForward('/ingredients');
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

  viewIngredient(ingredientId: string){
    console.log('El ingrediente es: ', ingredientId)
  }
}
