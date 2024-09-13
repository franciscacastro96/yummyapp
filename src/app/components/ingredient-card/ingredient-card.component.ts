import { Component, OnInit, Input, input } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.models';
@Component({
  selector: 'app-ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.scss'],
})
export class IngredientCardComponent  implements OnInit {
  @Input() ingredient: Ingredient={
    title:'',
    imageUrl:''
  }
  constructor() { }

  ngOnInit() {}

}
