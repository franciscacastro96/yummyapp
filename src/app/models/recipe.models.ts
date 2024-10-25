export interface Recipe{
    id?: string,
    title: string,
    description: string,
    ingredients: string[], // Ingresar como una cadena separada por comas
    preparationLocation: string,
    imageUrl: string,
    status: 'Normal' | 'Favorito',
    preparationTime: string,
    difficulty: 'Facil' | 'Intermedia'  | 'Difícil',
    serves: string,
    preparationSteps: string[]
}