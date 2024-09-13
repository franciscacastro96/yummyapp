import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.models';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.page.html',
  styleUrls: ['./ingredients.page.scss'],
})
export class IngredientsPage implements OnInit {

  allIngredients: Ingredient[] =[
    {
      id:'1',
      title:'Lechuga',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJMQYzemvNS70R4aDQw_yP0r5X7r7VVtUiDA&s'
    },
    {
      id:'2',
      title:'Zapallo',
      imageUrl: 'https://mandarinadelivery.cl/wp-content/uploads/2019/12/Zapallo-camote.jpg'
    },
    {
      id:'3',
      title:'Pollo',
      imageUrl: 'https://canduran.com/wp/wp-content/uploads/2017/02/pimienta-alimentos-crudos-blanco-fresco_1203-5518.jpg'
    },
    {
      id:'4',
      title:'Papa',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0566/4391/1854/products/0000000000147_554d7657-8d42-4a0a-b149-f85b097cb95b.png?v=1634911471'
    },
    {
      id:'5',
      title:'Porotos',
      imageUrl: 'https://cdnx.jumpseller.com/alimentos-4m/image/34023689/resize/635/635?1681150720'
    },
    {
      id:'6',
      title:'Garbanzos',
      imageUrl: 'https://todobaratotc.cl/wp-content/uploads/2020/04/garbanzo.jpg'
    },
    {
      id:'7',
      title:'Ajos',
      imageUrl: 'https://okdiario.com/img/recetas/2017/07/17/ajos-2.jpg'
    },
    {
      id:'8',
      title:'Fideos',
      imageUrl: 'https://frioteka.com/assets/productos/wtmk/3418.jpg'
    },
    {
      id:'9',
      title:'Arverjas',
      imageUrl: 'https://www.ricardovaldes.cl/wp-content/uploads/2023/02/arverjas-partidas.jpg'
    },
    {
      id:'10',
      title:'Tomate',
      imageUrl: 'https://www.aprenderjuntos.cl/wp-content/uploads/2020/10/tomate.jpg'
    }
  ];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  navigateToHome(){
    this.navCtrl.navigateForward('home');
  }

  navigateToRecipes(){
    this.navCtrl.navigateForward('recipes');
  }

  viewIngredient(ingredientId: string){
    console.log('El ingrediente es: ', ingredientId)
  }
}
