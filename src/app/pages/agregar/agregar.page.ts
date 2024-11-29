import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { RecipeService } from 'src/app/services/recipe.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  recipeForm!: FormGroup;
  capturedImage: string | null = null; // Para almacenar la imagen capturada
  imageFile: File | null = null; // Archivo que se enviará a Firebase

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private recipeService: RecipeService
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

  // Método para abrir la cámara o seleccionar una imagen de la galería
  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt, // Permite elegir entre cámara y galería
        quality: 90
      });

      if (image) {
        this.capturedImage = image.dataUrl; // Mostrar vista previa
        this.imageFile = this.dataURLToFile(image.dataUrl, `recipe_${Date.now()}.jpg`);
      }
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  }

  // Convertir Data URL a un objeto File
  dataURLToFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  // Método para enviar el formulario y guardar la receta en Firebase
  submitRecipe() {
    if (this.recipeForm.valid) {
      const formValues = this.recipeForm.value;

      // Crear el objeto de receta con los valores convertidos
      const newRecipe = {
        ...formValues,
        ingredients: formValues.ingredients.split(',').map((item: string) => item.trim()),
        preparationSteps: formValues.preparationSteps.split(',').map((item: string) => item.trim())
      };

      // Crear la receta en Firebase con la imagen
      this.recipeService.createRecipe(newRecipe, this.imageFile).then(() => {
        console.log('Receta creada con éxito');
        this.navCtrl.navigateRoot('/home');
      }).catch((error) => {
        console.error('Error al crear la receta:', error);
      });
    }
  }
}