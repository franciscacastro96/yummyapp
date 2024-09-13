import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.models';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent  implements OnInit {
  @Input() recipe?: Recipe; //Recibe un objeto recipe como entrada
  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  navigateToDetail(){
    this.navCtrl.navigateForward('/details');
  }

}
