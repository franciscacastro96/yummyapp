import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  recipeForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private navCtrl: NavController,
    private recipeService: RecipeService,
    private firestore: AngularFirestore // Inject Firestore
  ) {}

  ngOnInit() {
    // Inicializar el formulario con los campos necesarios
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required], // Ingresar como una cadena separada por comas
      preparationLocation: ['', Validators.required],
      imageUrl: [''],
      status: ['Normal', Validators.required],
      preparationTime: [''],
      difficulty: ['', Validators.required],
      serves: [''],
      preparationSteps: [''] // Ingresar como una cadena separada por comas
    });
  }

  // Método para enviar el formulario y guardar la receta en Firebase
  submitRecipe() {
    if (this.recipeForm.valid) {
      const formValues = this.recipeForm.value;

      // Crear el objeto de receta con los valores convertidos
      const newRecipe = {
        ...formValues,
        ingredients: formValues.ingredients.split(',').map((item: string) => item.trim()), // Convertir a array
        preparationSteps: formValues.preparationSteps.split(',').map((item: string) => item.trim()), // Convertir a array
        id: Date.now().toString() // Generar un ID único
      };

      this.recipeService.createRecipe(newRecipe).then(() => {
        console.log('Receta creada satisfactoriamente');
        this.navCtrl.navigateForward('/home'); // Redirigir al home después de crear la receta
      }).catch((error) => {
        console.error('Error al crear la receta:', error);
      });
    
    }
  }
}