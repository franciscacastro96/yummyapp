import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPage } from './details.page';
import { RecipeService } from 'src/app/services/recipe.service';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// Mocking services and dependencies
class RecipeServiceMock {
  getRecipeById(id: string) {
    return of({
      id: '123',
      title: 'Recipe 1',
      description: 'Delicious recipe',
      ingredients: ['ingredient1', 'ingredient2'],
      preparationTime: '30 minutes',
      difficulty: 'Facil',
      serves: '4',
      status: 'Normal',
      imageUrl: 'http://example.com/image.jpg',
      preparationSteps: ['Step 1', 'Step 2'],
    });
  }

  updateFavorite(recipeId: string, newStatus: string) {
    return Promise.resolve();
  }
}

class NavControllerMock {
  navigateForward(path: string) {}
  navigateBack(path: string) {}
}

describe('DetailsPage', () => {
  let component: DetailsPage;
  let fixture: ComponentFixture<DetailsPage>;
  let recipeServiceMock: RecipeServiceMock;
  let navCtrlMock: NavControllerMock;

  beforeEach(() => {
    recipeServiceMock = new RecipeServiceMock();
    navCtrlMock = new NavControllerMock();

    TestBed.configureTestingModule({
      declarations: [DetailsPage],
      providers: [
        { provide: RecipeService, useValue: recipeServiceMock },
        { provide: NavController, useValue: navCtrlMock },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '123' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // PRUEBA 1: Verificar que la página de detalles se haya creado correctamente
  it('should create the details page', () => {
    expect(component).toBeTruthy();
  });

  // PRUEBA 2: Verificar que la función toggleFavorite actualice correctamente el estado de la receta
  it('should toggle the favorite status of the recipe', async () => {
    // Set up the initial state
    component.recipe = {
      id: '123',
      title: 'Recipe 1',
      description: 'Delicious recipe',
      ingredients: ['ingredient1', 'ingredient2'],
      preparationTime: '30 minutes',
      difficulty: 'Facil',
      serves: '4',
      status: 'Normal', // Initial status
      imageUrl: 'http://example.com/image.jpg',
      preparationSteps: ['Step 1', 'Step 2'],
      preparationLocation: 'Cocina'
    };

    spyOn(recipeServiceMock, 'updateFavorite').and.callThrough();

    // Simulate the toggleFavorite function
    component.toggleFavorite();
    expect(component.recipe!.status).toBe('Favorito');
    expect(recipeServiceMock.updateFavorite).toHaveBeenCalledWith('123', 'Favorito');

    // Toggle back
    component.toggleFavorite();
    expect(component.recipe!.status).toBe('Normal');
    expect(recipeServiceMock.updateFavorite).toHaveBeenCalledWith('123', 'Normal');
  });
});