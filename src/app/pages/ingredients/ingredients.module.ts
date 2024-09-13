import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientsPageRoutingModule } from './ingredients-routing.module';

import { IngredientsPage } from './ingredients.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientsPageRoutingModule,
    SharedModule
  ],
  declarations: [IngredientsPage]
})
export class IngredientsPageModule {}
