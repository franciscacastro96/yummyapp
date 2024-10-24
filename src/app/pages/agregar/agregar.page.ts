import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
      status: ['Pendiente de probar', Validators.required],
      preparationTime: [null],
      difficulty: ['', Validators.required],
      serves: [null],
      preparationSteps: [''] // Ingresar como una cadena separada por comas
    });
  }

  // Método para enviar el formulario y guardar la receta en Firebase
  submitRecipe() {
    if (this.recipeForm.valid) {
      const newRecipe = this.recipeForm.value;

      // Convertir ingredientes y pasos de preparación a arrays
      newRecipe.ingredients = newRecipe.ingredients.split(',').map((item: string) => item.trim());
      newRecipe.preparationSteps = newRecipe.preparationSteps.split(',').map((item: string) => item.trim());

      // Asignar un ID único a la receta
      newRecipe.id = Date.now().toString();

      // Guardar la receta en Firebase (Firestore)
      this.firestore.collection('recipes').add(newRecipe).then(() => {
        // Navegar de vuelta a la página de recetas después de guardar
        this.navCtrl.navigateBack('/recipes');
      }).catch(error => {
        console.error('Error al guardar la receta: ', error);
      });
    }
  }
}
