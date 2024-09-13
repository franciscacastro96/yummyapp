import { Ingredient } from './../../models/ingredient.models';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { IngredientCardComponent } from '../ingredient-card/ingredient-card.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [RecipeCardComponent,
    IngredientCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [RecipeCardComponent, IngredientCardComponent]
})
export class SharedModule { }
