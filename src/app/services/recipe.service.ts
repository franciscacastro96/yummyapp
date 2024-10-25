import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.models';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private dbPath = 'recipes';

  constructor(private db: AngularFireDatabase) { }

  createRecipe(recipe: Recipe): Promise<void> {
    const recipeData: Recipe = {
      ...recipe,
      status: 'Normal'
    }

    const key = this.db.list(this.dbPath).push(recipeData).key;

    // Actualizamos el producto para incluir el ID reservado
    return this.db.object(`${this.dbPath}/${key}`).update({ id: key });
  }

  getRecipeById(id: string): Observable<Recipe | undefined> {
    return this.db.object<Recipe>(`${this.dbPath}/${id}`).valueChanges();
  }
    // Obtener todos las recetas
  getRecipes(): Observable<Recipe[]> {
    return this.db.list(this.dbPath).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const recipeData = c.payload.val() as Recipe;
          return {
            ...recipeData,
            id: c.payload.key ?? ''
          };
        })
      )
    );
  }

  // Método para actualizar el estado de una receta
  updateFavorite(recipeId: string, newStatus: Recipe['status']): Promise<void> {
    return this.db.object(`${this.dbPath}/${recipeId}`).update({ status: newStatus });
  }

      // Actualizar toda la información de un producto
    updateRecipe(recipeId: string, updateRecipe: Partial<Recipe>): Promise<void> {
      return this.db.object(`${this.dbPath}/${recipeId}`).update(updateRecipe);
    }

    //Eliminar receta
    deleteRecipe(recipeId: string): Promise<void> {
      return this.db.object(`${this.dbPath}/${recipeId}`).remove();
    }
}