import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { RecipeService } from 'src/app/services/recipe.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Importar CameraSource

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  recipeForm!: FormGroup;
  imageUrl: string | undefined; // Añadir una propiedad para almacenar la imagen capturada o seleccionada

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
      imageUrl: [''],
      status: ['Normal', Validators.required],
      preparationTime: [''],
      difficulty: ['', Validators.required],
      serves: [''],
      preparationSteps: ['']
    });
  }

  // Método para capturar una imagen con la cámara
  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera // Solo usar la cámara
      });

      // Guardar la URL de la imagen capturada
      this.imageUrl = image.webPath;
      // Actualiza el valor en el formulario
      this.recipeForm.patchValue({ imageUrl: this.imageUrl });
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }

  // Método para seleccionar una imagen desde la galería
  async openGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Solo seleccionar imagen desde la galería
      });

      // Guardar la URL de la imagen seleccionada
      this.imageUrl = image.webPath;
      // Actualiza el valor en el formulario
      this.recipeForm.patchValue({ imageUrl: this.imageUrl });
    } catch (error) {
      console.error('Error al abrir la galería:', error);
    }
  }

  // Método para permitir al usuario elegir entre cámara o galería
  async openCameraOrGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt // Muestra un prompt para elegir entre cámara o galería
      });

      // Guardar la URL de la imagen capturada o seleccionada
      this.imageUrl = image.webPath;
      // Actualiza el valor en el formulario
      this.recipeForm.patchValue({ imageUrl: this.imageUrl });
    } catch (error) {
      console.error('Error al abrir la cámara o galería:', error);
    }
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
        id: Date.now().toString(), // Generar un ID único
        imageUrl: this.imageUrl // Añadir la imagen capturada o seleccionada
      };

      // Crear la receta en Firebase y redirigir a la página de detalles
      this.recipeService.createRecipe(newRecipe).then(() => {
        console.log('Receta creada con ID:', newRecipe.id); // Verifica que el ID se está generando
        this.navCtrl.navigateForward(`/details/${newRecipe.id}`); // Redirige a la página de detalles
      }).catch((error) => {
        console.error('Error al crear la receta:', error);
      });
    }
  }
}
