import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.models';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private dbPath = 'recipes'; // Ruta de la base de datos para recetas

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  // Método para crear una receta
  createRecipe(recipe: Recipe): Promise<void> {
    const recipeData: Recipe = {
      ...recipe,
      status: 'Normal' // Establece el estado por defecto como "Normal"
    };

    const key = this.db.list(this.dbPath).push(recipeData).key;

    // Actualizamos la receta para incluir el ID generado
    return this.db.object(`${this.dbPath}/${key}`).update({ id: key });
  }

  // Método para obtener una receta por su ID
  getRecipeById(id: string): Observable<Recipe | undefined> {
    return this.db.object<Recipe>(`${this.dbPath}/${id}`).valueChanges();
  }

  // Obtener todas las recetas
  getRecipes(): Observable<Recipe[]> {
    return this.db.list(this.dbPath).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const recipeData = c.payload.val() as Recipe;
          return {
            ...recipeData,
            id: c.payload.key ?? '' // Incluye el ID de la receta
          };
        })
      )
    );
  }

  // Método para actualizar el estado de una receta (por ejemplo, marcar como favorita)
  updateFavorite(recipeId: string, newStatus: Recipe['status']): Promise<void> {
    return this.db.object(`${this.dbPath}/${recipeId}`).update({ status: newStatus });
  }

  // Método para actualizar una receta completa
  updateRecipe(recipeId: string, updateRecipe: Partial<Recipe>): Promise<void> {
    return this.db.object(`${this.dbPath}/${recipeId}`).update(updateRecipe);
  }

  // Método para eliminar una receta
  deleteRecipe(recipeId: string): Promise<void> {
    return this.db.object(`${this.dbPath}/${recipeId}`).remove();
  }
}
