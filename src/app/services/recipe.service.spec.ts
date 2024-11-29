import { TestBed } from '@angular/core/testing';
import { RecipeService } from './recipe.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { of } from 'rxjs';
import { Recipe } from '../models/recipe.models';  // Importar el tipo Recipe desde el archivo correspondiente

describe('RecipeService', () => {
  let service: RecipeService;
  let dbMock: any;
  let storageMock: any;

  beforeEach(() => {
    dbMock = jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']);
    storageMock = jasmine.createSpyObj('AngularFireStorage', ['ref', 'upload']);

    TestBed.configureTestingModule({
      providers: [
        RecipeService,
        { provide: AngularFireDatabase, useValue: dbMock },
        { provide: AngularFireStorage, useValue: storageMock },
      ]
    });

    service = TestBed.inject(RecipeService);
  });

  // PRUEBA 1: Verificar que el servicio se haya creado correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // PRUEBA 2: Verificar que el método createRecipe cree una receta correctamente
  it('should create a recipe', (done) => {
    const mockRecipe: Recipe = {
      id: '123',
      title: 'Recipe 1',
      description: 'Delicious recipe',
      ingredients: ['ingredient1', 'ingredient2'],
      preparationLocation: 'Kitchen',
      imageUrl: 'http://example.com/image.jpg',
      preparationSteps: ['Step 1', 'Step 2'],
      status: 'Normal',
      preparationTime: '30 minutes',
      difficulty: 'Facil',
      serves: '4',
    };
    const mockFile = new File([''], 'image.jpg');
    const mockDownloadURL = 'https://someurl.com/image.jpg';

    // Simulando el comportamiento de Firebase Storage
    storageMock.upload.and.returnValue(of({}));
    storageMock.ref.and.returnValue({ getDownloadURL: () => of(mockDownloadURL) });

    dbMock.list.and.returnValue({
      push: () => ({ key: '123' }),
      update: jasmine.createSpy('update')
    });

    service.createRecipe(mockRecipe, mockFile).then(() => {
      expect(dbMock.list).toHaveBeenCalled();
      expect(dbMock.list().push).toHaveBeenCalled();
      expect(dbMock.list().update).toHaveBeenCalledWith({
        id: '123',
        title: 'Recipe 1',
        description: 'Delicious recipe',
        ingredients: ['ingredient1', 'ingredient2'],
        preparationLocation: 'Kitchen',
        imageUrl: mockDownloadURL,
        preparationSteps: ['Step 1', 'Step 2'],
        status: 'Normal',
        preparationTime: '30 minutes',
        difficulty: 'Facil',
        serves: '4',
      });
      done();
    });
  });

  // PRUEBA 3: Verificar que el método getRecipeById obtenga correctamente una receta
  it('should get a recipe by id', (done) => {
    const mockRecipe: Recipe = {
      id: '123',
      title: 'Recipe 1',
      description: 'Delicious recipe',
      ingredients: ['ingredient1', 'ingredient2'],
      preparationLocation: 'Kitchen',
      imageUrl: 'http://example.com/image.jpg',
      preparationSteps: ['Step 1', 'Step 2'],
      status: 'Normal',
      preparationTime: '30 minutes',
      difficulty: 'Facil',
      serves: '4',
    };

    // Simulando el comportamiento de la base de datos de Firebase
    dbMock.object.and.returnValue({ valueChanges: () => of(mockRecipe) });

    service.getRecipeById('123').subscribe((recipe) => {
      expect(recipe).toEqual(mockRecipe);
      done();
    });
  });

  // PRUEBA 4: Verificar que el método getRecipes devuelva todas las recetas correctamente
  /*it('should get all recipes', (done) => {
    const mockRecipes: Recipe[] = [
      { id: '123', title: 'Recipe 1', description: 'Delicious recipe 1' },
      { id: '124', title: 'Recipe 2', description: 'Delicious recipe 2' },
    ];

    // Simulando el comportamiento de la base de datos de Firebase
    dbMock.list.and.returnValue({ valueChanges: () => of(mockRecipes) });

    service.getRecipes().subscribe((recipes: Recipe[]) => {
      expect(recipes).toEqual(mockRecipes);
      done();
    });
  });*/
});