import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
  ) {}

  ngOnInit() {
    // Inicializar el formulario con los campos necesarios
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      preparationLocation: ['', Validators.required],
      status: ['Normal', Validators.required],
      preparationTime: [''],
      difficulty: ['', Validators.required],
      serves: [''],
      preparationSteps: ['']
    });
  }


  // Método para enviar el formulario y guardar la receta en Firebase
  submitRecipe() {
    if (this.recipeForm.valid) {
      const formValues = this.recipeForm.value;

      // Crear el objeto de receta con los valores convertidos
      const newRecipe = {
        ...formValues,
        ingredients: formValues.ingredients.split(',').map((item: string) => item.trim()),
        preparationSteps: formValues.preparationSteps.split(',').map((item: string) => item.trim()),
        id: Date.now().toString() 
      };

      // Crear la receta en Firebase y redirigir a la página de detalles
      this.recipeService.createRecipe(newRecipe).then(() => {
        console.log('Receta creada con ID:', newRecipe.id); // Verifica que el ID se está generando
        this.navCtrl.navigateRoot('/home');
      }).catch((error) => {
        console.error('Error al crear la receta:', error);
      });
    }
  }
}
