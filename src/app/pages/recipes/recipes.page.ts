import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.models';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  
  recipes: Recipe[] = [
    {
      id: '1',
      title: 'Cazuela de pollo',
      description: 'Platillo de papas carne de pollo y zapallo',
      imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/F3K5PQNPDNB5JDDD6HJRK5ATN4.jpeg'
    },
    {
      id: '2',
      title: 'Porotos con rienda',
      description: 'Platillo tipico de legumbres y fideos',
      imageUrl: 'https://cocinalocal.cl/wp-content/uploads/2021/08/porotos-con-rienda.jpg'
    },
    {
      id: '3',
      title: 'Garbanzos',
      description: 'Platillo tipico de legumbres y fideos',
      imageUrl: 'https://content-cocina.lecturas.com/medio/2023/10/27/garbanzos-con-champinones_00000000_231030134920_1200x1200.jpg'
    },
    {
      id: '4',
      title: 'Porotos con mote',
      description: 'Platillo tipico de legumbres y mote',
      imageUrl: 'https://comohacer.cl/wp-content/uploads/2022/07/porotos-con-mote-1200x900.jpg'
    },
    {
      id: '5',
      title: 'Arverjas',
      description: 'Platillo tipico de legumbres y verduras',
      imageUrl: 'https://img-global.cpcdn.com/recipes/1bff4302fd968a8f/1200x630cq70/photo.jpg'
    }
  ];
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  navigateToIngredients(){
    this.navCtrl.navigateForward('/ingredients');
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
