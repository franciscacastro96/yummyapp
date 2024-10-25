import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importamos ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { EditRecipePageRoutingModule } from './edit-recipe-routing.module';
import { EditRecipePage } from './edit-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Lo agregamos aquí
    IonicModule,
    EditRecipePageRoutingModule
  ],
  declarations: [EditRecipePage]
})
export class EditRecipePageModule {}